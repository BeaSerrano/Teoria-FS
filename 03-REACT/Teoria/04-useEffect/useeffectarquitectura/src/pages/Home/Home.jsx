import { useState } from "react"
import "./Home.css"
import { H1 } from "../../components/H1/H1"

export const Home = () => {

    const [ dismount, setDismount ] = useState(false);
    const [ changeValue, setChangeValue ] = useState(false);

    return (
        <div id="homeContainer">
            {!dismount && (
                <H1 title="mi primer H1 como componente en page Home" statePadre={changeValue}/>
            )}
            <button onClick={() => setDismount((value) => !value)}>
                MONTAR O DESMONTAR EL COMPONENTE
            </button>
            <button onClick={() => setChangeValue((value) => !value)}>
                {" "}
                CAMBIAR EL VALOR DEL ARRAY DE DEPENDENCIAS - de changeValue
            </button>
        </div>
    )
}