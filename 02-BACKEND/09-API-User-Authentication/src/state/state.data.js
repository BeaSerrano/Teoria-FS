//!--- funcion state para saber el estado del user - logueado o no

//?--- los estados son funcionales >>> se utilizan y se reinician (vuelve a su estado inicial)

/** siempre tienen dos funciones:
 *  1 ---> set >>> devuelve el mismo dato seteado (el dato que tiene el estado en el momento)
 *  2 ---> get >>> devuelve el mismo dato reiniciado (el dato en su estado inicial)
*/

// esto lo usamos haciendo un test sobre el registro (envio de email)

/** en su estaod inicial, el estado del envio es FALSE porque todavía no se ha enviado nada*/

let testEmailSend = false;

//?------------------------------------------------------------
//!------------------ funcion get y funcion set ---------------
//?------------------------------------------------------------

const setTestEmailSend = (dataBoolean) => {
    // seteado, estado actual
    // dataBoolean es true o false
    testEmailSend = dataBoolean;
}

const getTestEmailSend = () => {
    // reiniciado, estado inicial
    // dataBoolean es false
    return testEmailSend;
}


//!--- exportamos funciones

module.exports = {
    setTestEmailSend,
    getTestEmailSend
}