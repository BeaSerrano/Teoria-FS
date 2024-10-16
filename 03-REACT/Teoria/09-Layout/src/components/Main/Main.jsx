
import { Flex } from '../../layouts/Flex/Flex'
import './Main.css'

export const Main = ({children}) => {
    return (
        <main>
            <Flex>
                {children}
            </Flex>
        </main>
    )
}