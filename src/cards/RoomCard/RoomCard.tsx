import { h, JSX } from 'preact'
import RoomConfig, { Temperature } from './RoomConfig'
import { styled } from 'goober'
import CardElement from '@cards/CardElement'
import { H2 } from '@components/Headers'
import useHass from '@hooks/useHass'
import { HomeAssistant } from '@ha'

export default function RoomCardComponent({
  config,
}: {
  config: RoomConfig
}): JSX.Element {
  const hass = useHass()

  return (
    <Card>
      <H2>{config.name}</H2>
      <TemperatureComponent hass={hass} config={config.temperature} />
    </Card>
  )
}

function TemperatureComponent({
  config,
  hass,
}: {
  config: Temperature | undefined
  hass: HomeAssistant
}): JSX.Element {
  if (!config || !config.entity) return <div></div>

  const entity = hass.states[config.entity]
  console.log(hass.states)
  if (!entity) return <div>Invalid entity</div>

  const temperature = entity.state

  return <div>Temperature: {temperature}</div>
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
