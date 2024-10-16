import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { ProviderLanguage } from './context/context-language'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProviderLanguage>
      <App />
    </ProviderLanguage>
  </React.StrictMode>
)
