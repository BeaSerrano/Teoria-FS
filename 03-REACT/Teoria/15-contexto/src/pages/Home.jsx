import { useAuth } from "../contexts/userAuthContext"

export const Home = () => {
    const { user } = useAuth();
    return (
        <div>
            <h1>Hola {user.name}, qué tal?</h1>
        </div>
    )
}
