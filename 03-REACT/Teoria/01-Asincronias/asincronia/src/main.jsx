import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

/** Tenemos la creación del router dom con la libreria react
 * cogemos el root por id del index.html para renderizar los componentes que queramos
 * en este caso renderizamos App que sale de App.jsx
 * 
 * necesitamos importar la función App del componente App.jsx, React, ReactDOM y el index.css
 * 
 * usamos Y NO BORRAMOS NUNCA el StrictMode porque hace una doble renderización y nos ha pruebas 
 * de problemas que puedan aparecer mientras se actualiza el código
 * 
 * Dentro de esta renderización metemos el componente a renderizar ---> en este caso App
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
