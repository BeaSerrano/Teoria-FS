import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import { Gallery, Home, NotFound } from '../pages'

/** creamos un router y con el createBrowserRouter creamos un array
 * de objeto que son las rutas:
 *  1) tenemos una ruta padre que renderiza el elemento App
 *  2) tenemos las rutas hijas que renderiza el elemento que le digamos
 *     en cada path
 * 
 * Tanto la ruta padre como las rutas hijas son objetos que van dentro de 
 * un array de objetos
 */

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children:[
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/gallery",
                element: <Gallery />,
            },
            {
                path: "*",
                element: <NotFound />,
            }
        ]
    }
])