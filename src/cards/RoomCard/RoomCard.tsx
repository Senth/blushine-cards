import { h, Component, render } from 'preact';

export default class RoomCardComponent extends Component<{config: any}> {
  render() {
    return (
      <div>
        <h1>Custom Home Assistant Card</h1>
        <p>This is a simple custom card for Home Assistant.</p>
        <div style="width: 50px; height: 50px; background-color: red;"></div>
      </div>
    );
  }
}

class RoomCardElement extends HTMLElement {
  private _config: any

  setConfig(config: any) {
    this._config = config;
    this.renderCard();
  }

  renderCard() {
    if (this._config) {
      render(<RoomCardComponent config={this._config} />, this);
    }
  }

  connectedCallback() {
    this.renderCard()
  }
}

customElements.define('blushine-room-card', RoomCardElement);
