import { useRef } from 'react'
import './App.css'
import { useState } from 'react'
import { useEffect } from 'react'

/** es un hook de react (hay que importarlo de react)
 * es una forma de apuntar a un objeto dandole una referencia
 * con esa referencia puedo acceder a su valor o cambiar sus propiedades
 * 
 * IMPORTANTE --> se accede al valor de la referencia con ref.current !!
 */
const App = () => {
  const [ value, setValue ] = useState("");
  
  /** inputRef --> hace referencia al valor del input --> inputRef.current.value */
  const inputRef = useRef(null);

  /** errorRef --> hace referencia al elemento html con la etiqueta <p> de parrafo
   *            --> errorRef.current y le aplicamos cualquier cambio de propiedad del DOM
   */
  const errorRef = useRef(null)

  useEffect(() => {
    console.log('🪴', value);
    console.log('valor input ref', inputRef.current.value);
    value != "Bea" && (errorRef.current.innerText = "hola")
  }, [value])
  
  return (
    <>
      <input 
        type="text"
        name="example"
        id="example"
        ref={inputRef}
        onChange={(e) => {setValue(e.target.value)}}
      />

      {value != "Bea" && (
        <p ref={errorRef}>Has introducido un valor incorrecto</p>
      )}
    </>
  )
}

export default App
