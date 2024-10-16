import { useState } from 'react'
import './App.css'
import { Movie, Review } from './components'

export const App = () => {
  const [ value, setValue ] = useState(0);
  return (
    <>
      <Movie 
        name={'Titanic'}
        cover={'https://m.media-amazon.com/images/I/811lT7khIrL._AC_UF894,1000_QL80_.jpg'}
      />
      <Review score={value}/>
      <label>Por favor introduce una puntuación</label>
      <input type="number" onChange={(e) => setValue(e.target.value)}/>
    </>
  )
}