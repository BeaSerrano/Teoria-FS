import "./ButtonCustom.css"

//!-- COMUNICACIÓN DE PADRE A HIJO ---> unidireccional

export const ButtonCustom = ({state, setState, textButton}) => {
  return (
        <button onClick={() => setState()}>
          {textButton} {state}
        </button>
  )
}

/** las props que usamos en este componente son: 
 * 
 * state ---> estado del contador
 * setState ---> es la función que maneja el contador
 * textButton ---> texto que va dentro del botón
 * 
 * por último, usamos "value" como parámetro de la función setState
 * y se refiere al valor actual del contador (del estado)
 * 
 * 
 * POR QUÉ COMPONETIZAR ESTE BOTÓN
 * este botón me sirve para cualquier estado cambiado, no solo para el contador
 */

//!-- aqui vemos una comunicación padre a hijo
/** porque state y setState pertenecen al padre 
 * ---> están declarados en App.jsx, que es el padre de ButtonCustom 
 * 
 * hay que enviar la info de este componente al padre, a App, para que la ejecute*/