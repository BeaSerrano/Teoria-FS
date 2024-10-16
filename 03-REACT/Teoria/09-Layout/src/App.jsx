import { Outlet } from 'react-router-dom'
import './App.css'
import { Footer, Header, Main } from './components'

const App = () => {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </>
  )
}
export default App