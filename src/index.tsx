import { h, render } from 'preact'
import { MyCustomCard } from './MyCustomCard'
import './index.css'

const root = document.getElementById('root')
if (root) {
  render(
       <MyCustomCard config={{}} />,
    root
  );
}


