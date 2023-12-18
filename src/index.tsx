import { JSX, h, render } from 'preact'
import { styled, setup } from 'goober'

setup(h)

import { RoomCardComponent } from '@cards/RoomCard'
import './index.css'
import './globals.css'
import useHass from '@hooks/useHass'

const Stack = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: left;

  & * {
    margin: 4px 0;
  }
`

function Root(): JSX.Element {
  const hass = useHass()

  return (
    <Stack>
      <RoomCardComponent
        hass={hass}
        config={{
          name: 'Room',
          temperature: { entity: 'sensor.balcony_temperature' },
        }}
      />
      <RoomCardComponent hass={hass} config={{ name: 'Room' }} />
      <RoomCardComponent hass={hass} config={{ name: 'Room' }} />
    </Stack>
  )
}

const root = document.getElementById('root')
if (root) {
  render(<Root />, root)
}

// --- Setup Mocked Home Assistant HTML Elements ---
if (process.env.NODE_ENV === 'development') {
  import('./hass/components')
}
