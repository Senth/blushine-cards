import { h, Component, render } from 'preact'
import RoomConfig from './RoomConfig'

export default class RoomCardComponent extends Component<{
  config: RoomConfig
}> {
  render() {
    return (
      <div>
        <h1>{this.props.config.name}</h1>
        <p>This is a simple custom card for Home Assistant.</p>
        <div style="width: 50px; height: 50px; background-color: red;"></div>
      </div>
    )
  }
}

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

  renderCard() {
    if (this._config) {
      render(<RoomCardComponent config={this._config} />, this)
    }
  }

  connectedCallback() {
    this.renderCard()
  }
}

customElements.define('blushine-room-card', RoomCardElement)
