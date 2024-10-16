export const Button = (props) => {
    /** en este caso, como solo tengo un texto en App dentro del componente Button
     * solo me devuelve el texto, no hace un array de objetos al no encontrar ninguno
     */
    console.log(props.children);
    return (
        <button>{props.children}</button>
    )
}