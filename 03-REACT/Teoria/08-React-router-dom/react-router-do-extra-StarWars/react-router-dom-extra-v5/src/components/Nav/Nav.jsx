import { NavLink } from 'react-router-dom'
import './Nav.css'

export const Nav = () => {
    return (
        <nav>
            <NavLink to='/'>
                <button>Home</button>
            </NavLink>
            <NavLink to='/gallery'>
                <button>Gallery</button>
            </NavLink>
            <NavLink to='/about'>
                <button>About</button>
            </NavLink>
        </nav>
    )
}
