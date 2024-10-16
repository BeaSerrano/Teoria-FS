import { useNavigate } from 'react-router-dom'
import './CardById.css'

export const CardById = ({ name, src, description }) => {
    const navigate = useNavigate()
    return (
        <figure id='figureId'>
            <img src={src} alt={name} />
            <h4>{name}</h4>
            <p>{description}</p>
            <button  className='btnReturnGallery' onClick={() => navigate('/gallery')}>VOLVER A LA GALLERY</button>
        </figure>
    )
}
