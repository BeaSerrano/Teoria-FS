import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { About, ById, Gallery, Home, NotFound } from './pages/index.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename='/'>
      <Routes>
        <Route path='/' element={<App/>}>
          <Route index element={<Home/>} />
          <Route path='/gallery' element={<Gallery/>} />
          <Route path='/gallery/character/:id' element={<ById/>} />
          <Route path='/about' element={<About/>} />
          <Route path='*' element={<NotFound/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
