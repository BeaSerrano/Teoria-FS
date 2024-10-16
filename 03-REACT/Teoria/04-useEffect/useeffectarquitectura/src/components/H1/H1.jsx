import { useEffect } from 'react'
import './H1.css'

export const H1 = (props) => {

    //!-- HAY 3 TIPOS DE USE EFFECT

    /** ES OBLIGATORIO SEPARAR LOS EFECTOS POR UTILIDAD
     * 
     *  React nos deja usar todos los useEffect que queramos
     * 
     * SIEMPRE SE USA USE EFFECT CON ARRAY DE DEPENDENCIAS - vacio o no
     */

    const { statePadre } = props;

    // 1) ---> controla cuando se monta y se desmonta el componente
    /** se monta el componente y se lanza este useEffect */
    useEffect(() => {
        console.log("me monto 👌");
        return () => {
            console.log("me desmonto 💀");
        }
    }, [])

    // 2) ---> se lanza cuando se monta y cuando hay una actualizacion
    // No lo usamos !!!
    /** no lo usamos porque se lanza siempre y nunca se puede usar useEffect sin array de dependencias
     *  se lanza siempre que hay un cambio esté montado o no el componente
     */
    useEffect(() => {
        console.log("me lanzo siempre 👿");
        return () => {
        }
    })

    // 3) ---> controla cuando se monta y/o se actualiza el componente
    /** Cuando se atualiza es cuando cambia el valor de las variables del array de dependencias
     * IMPORTANTE ---> aqui no usamos return porque da error, porque no se desmonta, por eso lo hacemos en el useEffect 1 
     * 
     * Evalua statePadre, que lo escucha porque está dentro de su array de dependencias
     * lo evalua cuando el statePadre cambia su valor que es changeValue
     * 
     * el statePadre lo recibe mediante destructuirnf de las props del H1, arriba, cuando llamo al componente H1
     * en la Home y le doy el atributo statePadre={changeValue}
     * 
     * El changeValue cambia cuando hago click en el segundo botón. En el botón le decimos que setee el valor
     * de changeValue a su contrario ---> así es como escuchamos si se actualiza o se monta y es cuando se lanza el useEffect
     * */
    useEffect(() => {
        console.log("me monto o me actualizo 💃");
    }, [statePadre])

    return (
        <h1>{props.title}</h1>
    )
}