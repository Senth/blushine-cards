// HassLocalWrapper.ts

import { HomeAssistant } from '@ha'
import HassEmpty from './HassEmpty'
import { HassEntities } from 'home-assistant-js-websocket'

const baseUrl = process.env.HASS_URL || 'http://localhost:8123'
const accessToken = process.env.HASS_TOKEN || ''

export class HassLocalWrapper {
  private static instance: HassLocalWrapper
  private baseUrl: string
  private accessToken: string
  public hass: HomeAssistant = new HassEmpty()

  private constructor(baseUrl: string, accessToken: string) {
    this.baseUrl = baseUrl
    this.accessToken = accessToken
    this.initialize()
  }

  public static getInstance(): HassLocalWrapper {
    if (!HassLocalWrapper.instance) {
      HassLocalWrapper.instance = new HassLocalWrapper(baseUrl, accessToken)
    }
    return HassLocalWrapper.instance
  }

  public async initialize(): Promise<void> {
    // Fetch states
    const states = await this.fetchStates()
    this.hass.states = states

    // TODO - set the hass state somewhere
  }

  private async fetchStates(): Promise<HassEntities> {
    const response = await fetch(`${this.baseUrl}/api/states`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch states')
    }

    return await response.json()
  }
}
