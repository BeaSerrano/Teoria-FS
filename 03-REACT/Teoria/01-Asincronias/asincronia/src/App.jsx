//!--- impotaciones
/** funcionalidad useState de la librería react
 * logo de react que sacamos de la carpeta assets
 * logo de vite que sacamos de la carpeta donde estamos (/asincronia)
 * del App.css que contiene los estilos relacionados con App
 */
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

/** función para crear el componente App, que es el que va renderizado en main.jsx y por lo tanto en el index.html
 * que es la single page, la única, que renderiza React en nuestra aplicación
 */
function App() {
  /** usamos useState para controlar el estado de la variable count
   * count ---> es valor del estado, el valor actual que tiene ese estado o en inicio o cuando cambia
   * setCount ---> es la función set que hacíamos en nuestro código imperativo para setear el estado que cambia
   * y volver a meter el resultado actual dentro de count
   * 
   * count devuelve el valor actual y setCount lo setea y lo guarda en el estado
   * 
   * useState(0) ---> es un hook, una funcionalidad, de react la cual nos hemos importado y hemos usado
   * para manejar el cambio de valor de count y su seteo con setCount 
   * ---> useState hace referencia o coge el estado y el valor inicial
   * Aquí el valor inicial es (0) 
   */
  const [count, setCount] = useState(0)

  /** teneis que en cuenta que esto iría fuera de la función App componetizado
   * en este caso sería un Hook e iría dentro de la carpeta de hooks
   * porque estamos usando un elemento de la librería de react
   * 
   * dentro de carpeta hook ---> todas las utilidades que usen algo de react
   * dentro de utils ---> todas las utilidades que no usen elementos de react
   */
  const cambiarEstado = () => {
    setCount((valorActual) => {
      return valorActual + 1
    })
  }

  /** App es una función que devuelve con un return un fragment con el html a renderizar
   * este componente contiene esta estructura html
   * 
   * dentro tiene un botón con un evento onClick y una callback donde usamos el count
   * y la función para manejar el cambio de valor de count y poder hacer la suma de +1
   * cada vez que hacemos click en el botón, cada vez que el usuario interactúa y cambia
   * el estado del count se verá reflejado en el html {count}
   * 
   * por ultimo, se exporta la función App para usarla donde queramos
   * en este caso es en main.jsx
   */
  return (
    <>
      <div>
        {console.log("esto es el count 💀", count)}
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Primer proyecto con React JS</h1>
      <div className="card">
        <button onClick={() => cambiarEstado()}>count is {count}</button>
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
