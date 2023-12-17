// HassLocalWrapper.ts

import { HomeAssistant } from '@ha'
import HassEmpty from './HassEmpty'
import { HassEntities } from 'home-assistant-js-websocket'

const accessToken = process.env.HASS_TOKEN || ''

export interface HassLocalStateChange {
  hass: HomeAssistant
}

export interface HassLocalStateChangeCallback {
  (event: HassLocalStateChange): void
}

export class HassLocalWrapper {
  private static instance: HassLocalWrapper
  private accessToken: string
  private stateChangeCallbacks: HassLocalStateChangeCallback[] = []
  public hass: HomeAssistant = new HassEmpty()

  private constructor(accessToken: string) {
    this.accessToken = accessToken
  }

  public static getInstance(): HassLocalWrapper {
    if (!HassLocalWrapper.instance) {
      HassLocalWrapper.instance = new HassLocalWrapper(accessToken)
    }
    return HassLocalWrapper.instance
  }

  public addStateChangeListener(callback: HassLocalStateChangeCallback): void {
    this.stateChangeCallbacks.push(callback)
  }

  public removeStateChangeListener(
    callback: HassLocalStateChangeCallback
  ): void {
    this.stateChangeCallbacks = this.stateChangeCallbacks.filter(
      (cb) => cb !== callback
    )
  }

  public async updateStates(): Promise<void> {
    // Fetch states
    const states = await this.fetchStates()
    this.hass.states = states

    // Call state change callbacks
    this.stateChangeCallbacks.forEach((callback) => {
      callback({ hass: this.hass })
    })
  }

  private async fetchStates(): Promise<HassEntities> {
    return fetch(`/api/states`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch states')
        }

        return response.json()
      })
      .then((stateList) => {
        // Convert state list to an object "map"
        const entitiesObject: HassEntities = {}
        stateList.forEach((state: any) => {
          entitiesObject[state.entity_id] = state
        })
        return entitiesObject
      })
  }
}
