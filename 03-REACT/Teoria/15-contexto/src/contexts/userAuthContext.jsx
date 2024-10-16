import { useMemo } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

//? --------- Para crear el contexto nos importamos createContext() de react y lo instanciamos en una constante
export const UserContext = createContext();

//? --------- Creamos una función que provee el contexto y que posteriormente usaremos en main.jsx ...
//? ... y en el contexto envolvemos todo el enrutado que contiene las pages a renderizar
/** como lo que devuelve esta función es un componente, dentro necesitamos como props un children */
export const UserContextProvider = ({ children }) => {

    //! 1) -------- Creamos el estado del usuario

    // INICIALIZACIÓN EN LAZING ---> el estado se carga con algo que está guardado en el localStorage
    /** como al recargar la página el estado se actualiza, necesito coger los datos del usuario de donde
     * se guarda, que es el localStorage del usuario que está dentro de la aplicación
     * 
     * Devuelve un condicional donde si hay algo en el localStorage lo parsea y lo guarda en el estado user
     * y si no hay nada en el localStorage le da el valor null al estado user
     */

    const [ user, setUser ] = useState(() => {
        return localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : null
    });

    //! 2) -------- Creamos en el contexto la funcion de login
    /** en la función login seteamos la data en el estado user y hacemos lo contrario
     * que va a ser convertirlo a string y guardarlo en el localStorage
     * 
     * este user que se guarda nos lo da el usuario desde el formulario de registro
     */
    
    const login = (data) => {
        setUser(data);
        const stringUser = JSON.stringify(data);
        localStorage.setItem('user', stringUser)
    };

    //! 3) -------- Creamos en el contexto la funcion de logout
    /** la funcion de logout elimina el user el localStorage y
     * setea de nuevo el estado user a null, porque ya no hay usuario logueado
     */

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null)
    };

    //! 4) -------- Creamos un hook de memorización para que no se renderice todo de nuevo al recargar la página o modificar un hijo
    /** usamos useMemo que memoriza el return de una función. En este caso va a memorizar:
     * el estado user, el seteo del estado user, el return de la funcion de login y de logout
     * y escucha en su array de dependencias el user para ver cuándo cambia y renderizar de nuevo
     */

    const value = useMemo(
        () => ({
            user,
            setUser,
            login,
            logout
        }),
        [user]
    )

    /** Lo que devuelve la función de UserContextProvider es un componente con un método .Provider 
     * Este provider recibe un value que van a ser lo elementos comunes del contexto --> los que hemos guardado en const value
     * Y en este componente es donde metemos las children
     */

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};

//? Creamos un custom hook para poder usar el contexto que nos hemos creado
/** este custom hook usa el contexto que nos hemos creado al principio
 * con el hook useContext de react (importarlo !!)
 */

export const useAuth = () => useContext(UserContext)