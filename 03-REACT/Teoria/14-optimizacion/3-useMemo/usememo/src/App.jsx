import { useMemo, useState } from 'react'
import './App.css'

export const App = () => {

  const [ reload, setReload ] = useState(false);
  const [ rememo, setRememo ] = useState(false);

  const mapScore = (scores, caller) => {
    console.log('llamamos a mapScore', caller);

    return scores.map((num, index) => {
      const calc = (num * 3) / 2;
      const color = calc < 3 ? "🔴" : "🟢";
      return (
        <p key={index}>
          {calc} {color}
        </p>
      )
    })
  }

  // useMemo --> memoriza el return de la función
  const memo = useMemo(() => mapScore([1, 23,2, 4, 11], 'memorizado 🟩'), [rememo])
  const noMemo = mapScore([1, 23,2, 4, 11], 'no memorizado 🟥');

  /** 1) click en botón RELOAD --> como useMemo está memorizando lo que devuelve la función
   * mapScore, al hacer click en este botón y cambiar el estado de reload, solo va a renderizar
   * la constante {noMemo} que no tiene ninguna optimización (ningún memo)
   * 
   *  2) click en botón REMEMO --> como la constante memo está escuchando en su array de
   * dependencias el estado rememo, cuando este cambia haciendo click en el botón entonces
   * hay un cambio y se vuelve a renderizar el {memo}. 
   * 
   *  --- IMPORTANTE !! useMemo va a guardar de nuevo el return de la función mapScore
   *                    hasta que el estado rememo cambie de nuevo. Mientras no haya cambio
   *                    no se va a renderizar
   */

  return (
      <div>
        <div>
          <h3>Memorizado</h3>
          {memo}
        </div>
        <div>
          <h3>NO Memorizado</h3>
          {noMemo}
        </div>
        {console.log('RELOAD state', reload)}
        <button onClick={() => setReload((value) => !value)}>RELOAD 💙</button>
        {console.log('REMEMO state', rememo)}
        <button onClick={() => setRememo((value) => !value)}>REMEMO 🧡</button>
      </div>
  )
}

//! -- RESUMEN OPTIMIZACION

// memo --> HOC --> memoriza un componente, compara props nuevas y antiguas -----> NO MEMORIZA FUNCIONES

/* useCallback --> HOOK --> memoriza una función y solo se vuelve a renderizar cuando lo que escucha 
en el array de dependencias cambia */

/* useMemo --> HOOK --> memoriza el return de una función y cuando cambia lo que escucha 
el array de dependencias, se vuelve a renderizar -----> Y GUARDA EL NUEVO RETURN DE LA FUNCIÓN */
