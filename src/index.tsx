import { h, render } from 'preact'
import { MyCustomCard } from './MyCustomCard'

const root = document.getElementById('root')
if (root) {
  render(<MyCustomCard />, root);
}
