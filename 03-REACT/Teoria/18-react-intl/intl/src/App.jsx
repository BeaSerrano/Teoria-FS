import './App.css'
import { FormattedMessage } from "react-intl";
import { SelectLanguage } from './components/SelectLanguage';

function App() {
  return (
    <>
      <h1>Vite + React</h1>
      <SelectLanguage />
        <h2>
          <FormattedMessage
            id="app.subtitle"
            defaultMessage="Aprende a usar la librería de idiomas de React Intl"
          />
        </h2>
        <p>
          <FormattedMessage
            id="app.content"
            defaultMessage="Y no olvides estudiar React"
          />
        </p>
        <p className="read-the-docs">
          <FormattedMessage
            id="app.text.change"
            defaultMessage="Un saludo"
            values={{ username: "Uma Thurman" }}
          />
        </p>
    </>
  )
}
export default App