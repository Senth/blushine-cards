import { h, render, JSX } from 'preact'
import { extractCss } from 'goober'
import { HomeAssistant } from '@ha'

export default class CardElement<TConf> extends HTMLElement {
  private _config: TConf
  private _hass: HomeAssistant | undefined
  private _entities: string[] = []
  private _entityStates: { [key: string]: any } = {}

  constructor() {
    super()
    this._config = {} as TConf
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass

    // Check if any of the entities have changed state
    let changed = false
    this._entities.forEach((entity) => {
      const state = hass.states[entity]
      if (state) {
        const oldState = this._entityStates[entity]
        if (oldState !== state) {
          this._entityStates[entity] = state
          changed = true
        }
      }
    })

    if (!changed) return

    this.renderCard()
  }

  getComponent(config: TConf, hass: HomeAssistant): JSX.Element {
    return <div>Empty</div>
  }

  setConfig(config: any) {
    this._config = config
    const entities = this.getEntityList(config)
    this._entities = entities.filter((entity): entity is string => !!entity)
    this.renderCard()
  }

  getEntityList(config: TConf): (string | undefined)[] {
    throw new Error('Child class must implement getEntityList')
  }

  updateStyle() {
    const shRoot = this.shadowRoot
    if (!shRoot) return

    const existingStyle = shRoot.querySelector('style')
    if (existingStyle) return

    const styleTag = document.createElement('style')
    styleTag.textContent = extractCss()
    shRoot.appendChild(styleTag)
  }

  renderCard() {
    if (this._config && this._hass && this.shadowRoot) {
      render(this.getComponent(this._config, this._hass), this.shadowRoot)
      this.updateStyle()
    }
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' })
    this.renderCard()
  }
}
