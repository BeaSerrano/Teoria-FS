import "./ButtonCustom.css"

//!-- COMUNICACIÓN DE HIJO A PADRE ---> bidireccional
/** en esta comunicación de hijo a padre, el hijo es el que contiene la función de cambio de estado
 * a quien pertenece el estado ---> al padre
 * 
 * antes teniamos la función del cambiada el estado del padre dentro del padre
 * ahora le pasamos directamente setCount y el hijo decide que logica hace ---> value + 1
 * y en funicón de esa lógica, el hijo modifica al padre
 */

//! --- 4 puntos clave de React son:
/** 1) useState 
 *  2) comunicacion bidireccional 
 *  3) asincronia
 *  4) useEffect 
 */

export const ButtonCustom = ({state, setState, textButton}) => {
  return (
    // como el estado no pertenece a este componente tengo que hacer una callback OBLIGATORIAMENTE !!!!
        <button onClick={() => setState((value) => value + 1)}>
          {textButton} {state}
        </button>
  )
}