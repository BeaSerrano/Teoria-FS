import './Button.css'
import StyleButtonOne from './ButtonOne.module.css'

export const ButtonOne = () => {
    console.log(StyleButtonOne);
    return (
        <>
            <button id={StyleButtonOne.btn}>ButtonOne</button>
            <button id={StyleButtonOne.btn2}>ButtonOne</button>
        </>
    )
}