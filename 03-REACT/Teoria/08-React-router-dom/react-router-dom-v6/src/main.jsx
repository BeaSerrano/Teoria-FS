import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { router } from './routes/routes.jsx'
import { RouterProvider } from 'react-router-dom'

/** Aquí usamos el RouterProvider de la libreria react-router-dom
 * para proveer las rutas que hemos creado en el router de route.jsx
 */

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
