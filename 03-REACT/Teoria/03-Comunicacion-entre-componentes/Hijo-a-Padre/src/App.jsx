import { useState } from 'react'
import './App.css'
import { ButtonCustom, EnlacesCustom } from './components'
import { dataRender } from "../src/data/infoApp.data";

function App() {
  const [count, setCount] = useState(0)

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
      <h2>Count is {count}</h2>
      <div className="card">
        <ButtonCustom 
          state={count} 
          setState={setCount}
          textButton={"count is"} 
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
