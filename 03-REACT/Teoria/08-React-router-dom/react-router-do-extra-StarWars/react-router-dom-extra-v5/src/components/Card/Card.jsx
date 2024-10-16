import { Link } from 'react-router-dom'
import './Card.css'

export const Card = ({ src, name, id }) => {
    const path = `/gallery/character/${id}`;
    return (
        <figure>
            <Link to={path}>
                <img src={src} alt={name} />
            </Link>
        </figure>
    )
}
