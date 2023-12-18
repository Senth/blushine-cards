import { h, JSX } from 'preact'
import RoomConfig, { Temperature } from './RoomConfig'
import { styled } from 'goober'
import CardElement from '@cards/CardElement'
import { H2 } from '@components/Headers'
import { HomeAssistant } from '@ha'
import * as React from 'preact/compat'

export default function RoomCardComponent({
  config,
  hass,
}: {
  config: RoomConfig
  hass: HomeAssistant
}): JSX.Element {
  console.log('Rendering room card')
  if (!hass) return <div>Invalid hass</div>

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

  return (
    <div>
      <ha-icon icon="mdi:thermometer"></ha-icon> {temperature}℃
    </div>
  )
}

const Card = styled('div')`
  background-color: var(--blushine-card-background-color);
  border-radius: var(--blushine-card-border-radius);
  padding: var(--blushine-margin);
`

// --- Home Assistant Element ---
class RoomCardElement extends CardElement<RoomConfig> {
  getComponent(config: RoomConfig, hass: HomeAssistant): JSX.Element {
    return <RoomCardComponent hass={hass} config={config} />
  }

  getEntityList(config: RoomConfig): (string | undefined)[] {
    return [config.temperature?.entity]
  }
}

customElements.define('blushine-room-card', RoomCardElement)
