import { h, JSX } from 'preact'
import RoomConfig from './RoomConfig'
import { styled } from 'goober'
import CardElement from '@cards/CardElement'

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
  background-color: var(--card-background-color-off);
`

class RoomCardElement extends CardElement<RoomConfig> {
  getComponent(): JSX.Element {
    return <RoomCardComponent config={this._config} />
  }
}

customElements.define('blushine-room-card', RoomCardElement)
