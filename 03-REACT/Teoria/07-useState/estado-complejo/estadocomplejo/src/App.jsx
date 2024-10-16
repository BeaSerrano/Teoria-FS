import { useState } from 'react'
import './App.css'

function App() {
  /** tenemos un estado alumno y un seteo de estao setAlumno
   * el estado tiene dentro de dato completo que es un objeto
   * que tiene dentro una propiedad name y otra propiedad age
   * 
   * Dentro del useState() mostramos el valor inicial de este estado que es el objeto
   * name tiene como valor inicial un string "pon tu nombre"
   * y age tiene como valor inicial un nbumber 0
   */
  const [alumno, setAlumno] = useState(() => {
    return {
      name: "pon tu nombre",
      age: 0,
    }
  })

  /** App devuelve, dentro de un fragment que usamos como elemento padre,
   * un parrafo con el name y el age que vamos a sacar del estado actual (una evez que cambia)
   * y dos input, uno para name y otro para el age
   */

  /** LOS INPUT ---> type, name y id que son los atributos de este input
   * y cada input tiene dentro un evento onChange que va a ser el que maneje la función seteadora del estado
   * 
   * Dentro del onChange usamos la función seteadora setAlumno para modificar el valor del estado
   * lo que devuelve esta función es una copia del valor inicial del objeto del usteState
   * y la propiedad que quiero modificar del objeto alumno
   * 
   * Modificamos la propiedad con la propiedad target del evento que accede al valor actual (value)
   * que es el parámetro que le pasamos a la función seteadora
   * 
   * IMPORTANTE ---> se hace SIEMPRE una copia del objeto con spread operator (...value)
   * porque los estados en React son INMUTABLES !!! no cambian !!!
   * siempre traemos copia y modificamos lo que necesitemos
   *  
   * ---> console.log dentro del setAlumno ---> podeis ver en la consola como cuando se modifica
   * el input se van lanzando los consolelog de cada cambio que hacemos, de cada caracter que metemos en el input
   */

  return (
    <>
      <p>Name: {alumno.name}, Edad: {alumno["age"]}</p>
      <input 
        type="text" 
        name="name" 
        id="name"
        onChange={(event) => {
          setAlumno((value) => {
            console.log("🕶️", event.target.value);
            return {
              ...value, 
              name: event.target.value
            }
          })
        }}
      />
      <input 
        type="number" 
        name="age" 
        id="age"
        onChange={(event) => {
          setAlumno((value) => {
            console.log("🕶️", event.target.value);
            return {
              ...value, 
              age: event.target.value
            }
          })
        }}
      />
    </>
  )
}

export default App
