import { h, render } from 'preact'
import { RoomCardComponent } from '@cards/RoomCard'
import './index.css'

const root = document.getElementById('root')
if (root) {
  render(
       <RoomCardComponent config={{}} />,
    root
  );
}
