import { memo } from 'react';
import './Movie.css'

// memo ---> es un HOC
// useMemo ---> es un HOOK

/** al componente Movie le aplicamos el hoc memo
 * que va a memorizar las props
 * --> memoriza name y cover que no son funciones
 * --> no memoriza setState porque en App lo que le hemos pasado
 * a esta prop es una función ---> no memoriza la función porque se lo toma
 * como que la función cambia, porque cambia su referencia de memoria (lo que devuelve)
 */

export const Movie = memo(({ name, cover, setState }) => {
    console.log('me renderizo soy movie 🥰');
    return (
        <figure>
            <h1>{name}</h1>
            <img src={cover} alt={name} />
        </figure>
    )
})
