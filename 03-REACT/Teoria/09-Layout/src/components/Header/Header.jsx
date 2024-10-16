import { Nav } from '..'
import { Flex } from '../../layouts/Flex/Flex'
import './Header.css'

export const Header = () => {
    return (
        <header>
            <Flex>
                <h1>Character Page</h1>
                <Nav />
            </Flex>
        </header>
    )
}
