import { useEffect } from "react";
import { useState } from "react";

//!--------------------------------------------------------
//?--------------------- CUSTOM HOOKS ---------------------
//!--------------------------------------------------------

/** Custom Hook que hace el fetching de los datos */

/** aqui tenemos el ESTADO que va a recibir una petición
* y recoge la data, el isLoading y el hasError
* como valores iniciales, como están vacíos, todos son null
*/

export const useFetch = (url) => {
    const [state, setState] = useState({
        data: null,
        isLoading: null,
        hasError: null,
    })

    /** la funciones que gestionan la ASINCRONIA */

    const getFetch = async () => {
        setState({
            ...state, 
            isLoading: true
        });

        try {
            const res = await fetch(url) 

            if (!res.ok) {
                throw new Error(`Ha habido un error ${res.status} ${res}`);
            } else {
                const dataJson = await res.json();

                setState({
                    ...state, 
                    data: dataJson,
                    isLoading: false,
                })
            }
        } catch (error) {
            setState({
                ...state,
                isLoading: false,
                hasError: error
            })
        }
    }

    /* useEffect que escucha lo que manda el usuario que es la url
    cada vez que cambie la url se lanza el useEffect --> por lo tanto
    hay que llamar a la función getFetch()

    Tiene el efecto de cambiar la url y hacer la llamada asincrona con 
    urls diferentes las cuales está escuchando en su array de dependencias
    */

    useEffect(() => {
        getFetch()
    }, [url])
    
    /** devuelve un estado con claves */
    /** no es necesario devolver el state porque 
     * en realidad no lo vamos a usar desde aqui */

    return {
            data: state.data,
            isLoading: state.isLoading,
            hasError: state.hasError,
            state,
    }
};