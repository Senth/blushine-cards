import { h, JSX } from 'preact'
import RoomConfig, { Temperature } from './RoomConfig'
import { styled } from 'goober'
import CardElement from '@cards/CardElement'
import { H2 } from '@components/Headers'

export default function RoomCardComponent({
  config,
}: {
  config: RoomConfig
}): JSX.Element {
  return (
    <Card>
      <H2>{config.name}</H2>
      <TemperatureComponent config={config.temperature} />
    </Card>
  )
}

function TemperatureComponent({
  config,
}: {
  config: Temperature | undefined
}): JSX.Element {
  if (!config || !config.entity) return <div></div>

  // Get the temperature from Home Assistant?
  const temperature = 0

  return <div></div>
}

const Card = styled('div')`
  background-color: var(--blushine-card-background-color);
  border-radius: var(--blushine-card-border-radius);
  padding: var(--blushine-margin);
`

// --- Home Assistant Element ---
class RoomCardElement extends CardElement<RoomConfig> {
  getComponent(): JSX.Element {
    return <RoomCardComponent config={this._config} />
  }
}

customElements.define('blushine-room-card', RoomCardElement)
