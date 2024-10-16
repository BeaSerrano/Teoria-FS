import { useState } from 'react'
import './App.css'
import { ButtonCustom, EnlacesCustom } from './components'
import { dataRender } from "../src/data/infoApp.data";

function App() {
  const [count, setCount] = useState(0)

  // aqui hago la función del estado que se activa con el onClick del button
  // llamo a esta función dentro del botón

  /** estan función le mpertenece al padre ---> a App
   * pero se ejecuta, mediante el evento onClick del botón, en el componente ButtonCustom
   *
   * Funciona con una comunicacón del padre al hijo ---> el hijo usa las funciones que le da el padre
   */
  const modificarMiEstado = () => {
    setCount((value) => value + 1)
  }

  return (
    <>
      <div>
        {
          dataRender.map((item) => (
            <EnlacesCustom 
              key={item.alt}
              url={item.url} 
              src={item.src} 
              clase={item.clase} 
              alt={item.alt}
            />
          ))
        }
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <ButtonCustom 
          state={count} 
          setState={modificarMiEstado}
          textButton={"el valor actual del contador es "} 
        />
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
