import { NavLink } from "react-router-dom"
import "./Nav.css"

/** Usamos el elemento NavLink de la libreria de react-router-dom
 * para generar los enlaces de navegación hacia las rutas que hemos creado
 * 
 * IMPORTANTE --> creamos dentro del NavLink una etiqueta clicable button
 * para crear ese enlace de navegación. No usamos una etiqueta anchor (<a>)
 * porque el NavLink ya nos crea una etiqueta anchor que nos lleva a la ruta
 * que le indicamos con el atributo to="..."
 */

export const Nav = () => {
    return (
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/gallery">
                <button>Gallery</button>
            </NavLink>
        </nav>
    )
}