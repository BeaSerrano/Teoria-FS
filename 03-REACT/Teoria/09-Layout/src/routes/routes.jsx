import { createBrowserRouter } from 'react-router-dom';
import App from "../App"
import { About, ById, Gallery, Home, NotFound } from '../pages';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home/>,
            },
            {
                path: '/gallery',
                element: <Gallery/>,
            },
            {
                path: '/gallery/character/:id',
                element: <ById/>,
            },
            {
                path: '/about',
                element: <About/>,
            },
            {
                path: '*',
                element: <NotFound/>,
            }
        ]
    }
])