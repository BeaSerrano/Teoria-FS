import { Card } from '../../components'
import { getAll } from '../../services/character.services'
import './Gallery.css'

export const Gallery = () => {
    const data = getAll()
    return (
        <section id='gallery'>
            {data.map((item) => (
                <Card src={item.image} name={item.name} id={item._id} key={item._id}/>
            ))}
        </section>
    )
}
