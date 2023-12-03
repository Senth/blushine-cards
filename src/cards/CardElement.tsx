import { h, render, JSX } from 'preact'
import { extractCss } from 'goober'
import { globalStore } from '@/store'

export default class CardElement<TConf> extends HTMLElement {
  protected _config: TConf

  set hass(hass: any) {
    globalStore.setState({ hass })
    this.renderCard()
  }

  constructor() {
    super()
    this._config = {} as TConf
  }

  getComponent(): JSX.Element {
    return <div>Empty</div>
  }

  setConfig(config: any) {
    this._config = config
    this.renderCard()
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
    if (this._config && this.shadowRoot) {
      render(this.getComponent(), this.shadowRoot)
      this.updateStyle()
    }
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' })
    this.renderCard()
  }
}
