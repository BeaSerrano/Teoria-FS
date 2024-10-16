import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Gallery, Home, NotFound } from "./pages/index.js"

/** Para el enrutado necesitamos instalar la libreria react-router-dom
 * 
 * Tiene 3 elementos para el enrutado --> HAY QUE IMPORTARLOS !!
 * 
 * 1) BrowserRouter --> es el inicio del enrutado. Necesita una base de la ruta. Normalmente un /
 * 2) Routes --> el conjunto de las rutas
 * 3) Route --> las rutas singulares. Necesitan un path (la url) y un element (elemento que renderizan)
 */

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename='/'>
      <Routes>
        <Route path='/' element={<App/>}>
          <Route index element={<Home />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
