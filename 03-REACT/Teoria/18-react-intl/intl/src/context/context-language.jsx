import React, { useState, createContext } from 'react'

//! importamos la libreria y los idiomas
import { IntlProvider } from "react-intl";
import Spanish from '../lang/es.json'
import English from '../lang/en.json'

//! creamos el contexto del lenguaje
export const ContextLanguage = createContext();

//! funcion condicional del navigator
const changeLang = () => {
    return navigator.language === "es-ES"
        ? Spanish
        : English
}

//! proveedor del lenguaje
export const ProviderLanguage = (props) => {
    /** creamos los estados locale y messages
     * locale --> va a cambiar el lenguaje en el navegador
     * messages --> va a llamar a la funcion changeLang que va a activar la condicion del navigator.language
     */
    const [locale, setLocale] = useState(navigator.language);
    const [messages, setMessages] = useState(changeLang());

    /** funcion que setea los cambios de idioma
     * setLocale --> setea en locale el valor del tarhet del evento del evento
     * setMessages --> setea en messages el idiona según el valor del target del evento 
     */
    const handleLanguage = (e) => {
        setLocale(e.target.value);
        setMessages(e.target.value === "es-ES" ? Spanish : English);
    }

    /** la funcion del contexto devuelve el provider del contexto que como valor tiene 
     * el estado locale y la funcion que setea los cambios de idioma
     * 
     * Dentro de este contexto introducimos el IntlProvider para pasarle las children 
     * de las props que son las diferentes pages/componentes a renderizar */
    return (
        <ContextLanguage.Provider value={{ locale, handleLanguage }}>
            <IntlProvider messages={messages} locale={locale}>
                {props.children}
            </IntlProvider>
        </ContextLanguage.Provider>
    );
};