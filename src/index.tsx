import { h, render } from 'preact'
import { styled, setup } from 'goober'

setup(h)

import { RoomCardComponent } from '@cards/RoomCard'
import './index.css'
import './globals.css'

const Stack = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: left;

  & * {
    margin: 4px 0;
  }
`

const root = document.getElementById('root')
if (root) {
  const elements = (
    <Stack>
      <RoomCardComponent
        config={{
          name: 'Room',
          temperature: { entity: 'sensor.balcony_temperature' },
        }}
      />
      <RoomCardComponent config={{ name: 'Room' }} />
      <RoomCardComponent config={{ name: 'Room' }} />
    </Stack>
  )

  render(elements, root)
}
