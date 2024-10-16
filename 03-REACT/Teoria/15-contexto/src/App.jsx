import './App.css';
import { Outlet } from 'react-router-dom';
import { useAuth } from './contexts/userAuthContext';
import { useState } from 'react';

export const App = () => {
  /** Nos traemos del contexto que hemos usado en el custom hook useAuth() el login y el user
   * Además creamos otro estado name, inicialmente con valor null, para recoger lo que nos da el usuario en el input
   */
  const { login, user } = useAuth();
  const [ name, setName ] = useState(null);
  console.log('name:', name);
  console.log('user:', user);

  /** Hacemos un renderizado condicional donde:
   * ---> si user es null, si no hay usuario logueado, se renderiza el formulario
   * ---> si user tiene algo, hay un usuario logueado, entonces renderiza el outlet (que en caso es la Home)
   * 
   * El input con el evento onChange setea lo que ha escrito el usuario dentro el estado name
   * El button con el evento onClick llama a la función de login y como data le mete el name del estado
   */
  return (
    <>
      {user == null ? (
        <>
          <label>Introduzca su nombre</label>
          <br />
          <input type="text" onChange={(e) => {setName(e.target.value)}}/>
          <br />
          <button onClick={() => {login({name})}}>REGISTRAR</button>
        </>
      ) : (
        <Outlet />
      )}
    </>
  )
}