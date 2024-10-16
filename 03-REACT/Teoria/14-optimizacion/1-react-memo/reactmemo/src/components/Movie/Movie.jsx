import { memo } from "react";
import './Movie.css'

// memo ---> es un HOC
// useMemo ---> es un HOOK

export const Movie = memo(({ name, cover }) => {
    console.log('me renderizo soy movie 🥰');
    return (
        <figure>
            <h1>{name}</h1>
            <img src={cover} alt={name} />
        </figure>
    )
})
