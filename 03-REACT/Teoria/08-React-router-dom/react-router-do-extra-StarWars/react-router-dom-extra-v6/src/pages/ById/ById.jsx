import { CardById } from '../../components';
import { getById } from '../../services/character.services'
import './ById.css'
import { useNavigate, useParams } from 'react-router-dom'

export const ById = () => {
    const { id } = useParams();
    const character = getById(id);
    console.log("character: ", character);
    const { name, image, description } = character;
    return (
        <section id="pageById">
            <CardById name={name} src={image} description={description}/>
        </section>
    )
}
