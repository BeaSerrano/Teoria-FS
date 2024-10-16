import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/Button/Button'

function App() {
  /** RECORDATORIO ---> si el estado me pertenece como componente no tengo por qué usar una callback
   * pero si el estado no me pertenece como componente, si pertenece a otro componente y se ejecuta en otro distinto
   * si necesitamos setearlo con una callback ---> para acceder en el parámetro de la callback a su estado actual (en este caso es count)
   */

  /** count es el valor actual de estado
   * setCount es el seteo del estado
   */
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Button funcionSeteadoraEstado={setCount} valorActual={count}/>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
