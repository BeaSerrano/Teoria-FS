import { useCallback, useState } from 'react'
import './App.css'
import { Movie, Review } from './components'

export const App = () => {
  const [ value, setValue ] = useState(0);
  const [ rememo, setRememo ] = useState(false)

  const setStateSinMemorizar = (data) => {
    setValue((value) => value + data)
  }

  /** para que el memo que tenemos en Movie memorice la función que se le pasa
   * a la prop setState necesitamos usar el hook useCallback, que necesita:
   * --> una función que memorizar (en este caso es setStateSinMemorizar)
   * --> y un array de dependencias, algo que escuchar (en este caso rememo que es false incialmente)
   * 
   * El estado rememo pertece a App, a este componente, cuando el componente cambia a true
   * con el botón onclick entonces el useCallback memoriza esa función y ve que ha cambiado
   * entonces vuelve a renderizar todo el componente padre que es App
   * 
   * Si no hacemos click en el botón y solo cambiamos la puntuación del input
   * entonces rememo no cambia, useCallback mwmoriza el estado que tenñia y
   * no renderiza Movie, solo renderiza lo que cambia que en este caso es el componente Review
   */
  
  const arrowUseCallback = useCallback(setStateSinMemorizar, [rememo])

  console.log('rememo:', rememo);
  return (
    <>
      <Movie 
        setState={arrowUseCallback}
        name={'Titanic'}
        cover={'https://m.media-amazon.com/images/I/811lT7khIrL._AC_UF894,1000_QL80_.jpg'}
      />

      <Review score={value}/>

      <label>Por favor introduce una puntuación</label>
      <input type="number" onChange={(e) => setValue(e.target.value)}/>
      <button onClick={() => setRememo((value) => !value)}>CAMBIAR RE MEMO</button>
    </>
  )
}