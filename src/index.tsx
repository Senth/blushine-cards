import { h, render } from 'preact'
import { setup } from 'goober'

setup(h)

import { RoomCardComponent } from '@cards/RoomCard'
import './index.css'

const root = document.getElementById('root')
if (root) {
  render(<RoomCardComponent config={{ name: 'Room' }} />, root)
}
