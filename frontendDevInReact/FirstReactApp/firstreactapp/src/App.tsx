import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)
  const currDate = new Date();
  return (
    <>
    <h1>Hello world</h1>
    <p> the current date is {currDate.toLocaleTimeString()} </p>
    </>
  )
}

export default App
