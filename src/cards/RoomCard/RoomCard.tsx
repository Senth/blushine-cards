import { h, render, JSX } from 'preact'
import RoomConfig from './RoomConfig'
import { extractCss, setup, styled } from 'goober'

export default function RoomCardComponent({
  config,
}: {
  config: RoomConfig
}): JSX.Element {
  return (
    <Card>
      <h1>{config.name}</h1>
      <p>This is a simple custom card for Home Assistant.</p>
      <div style="width: 50px; height: 50px; background-color: red;"></div>
    </Card>
  )
}

const Card = styled('div')`
  background-color: rgba(255, 255, 255, 0.2);
`

class RoomCardElement extends HTMLElement {
  private _config: RoomConfig

  constructor() {
    super()
    this._config = {
      name: 'Room',
    }
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
      render(<RoomCardComponent config={this._config} />, this.shadowRoot)
      this.updateStyle()
    }
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' })
    this.renderCard()
  }
}

customElements.define('blushine-room-card', RoomCardElement)
