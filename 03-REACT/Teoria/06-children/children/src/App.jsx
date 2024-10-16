import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ContainerButton } from './components/ContainerButton/ContainerButton'
import { Button } from './components/Button/Button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ContainerButton>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </ContainerButton>
      <Button>Soy el texto del boton</Button>
      <Button>Soy el segundo children boton</Button>
    </>
  )
}

export default App
