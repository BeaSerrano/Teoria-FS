import "./CardCharacter.css"

//! --- traer las props por destructuring
export const CardCharacter = ({image, name}) => {
    return (
        <figure>
            <img src={image} alt={name} />
            <h3>{name}</h3>
        </figure>
    )
}

//! --- traer las props y acceder a sus claves
/* export const CardCharacter = (props) => {
    return (
        <figure>
            <img src={props.image} alt={props.name} />
            <h3>{props.name}</h3>
        </figure>
    )
} */

//! --- traer las props y abajo hacer destructuring
/* export const CardCharacter = (props) => {
    const { image, name } = props;
    return (
        <figure>
            <img src={props.image} alt={props.name} />
            <h3>{props.name}</h3>
        </figure>
    )
} */