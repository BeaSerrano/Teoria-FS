import { Outlet } from 'react-router-dom'
import './App.css'
import { Header } from './components'

/** En App usamos el enrutado
 * Dentro de react-router-dom tenemos la etiqueta OUTLET
 * que sirve para ver qué páginas hijas tenemos que renderizar
 * segñun la url que nos da el cliente
 * 
 * --> Inicialmente el Outlet --> renderiza Home
 * --> si se encuentra con /gallery --> rendriza Gallery
 * --> si se encuentra una ruta no definica --> renderiza NotFound
 */

function App() {

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default App
