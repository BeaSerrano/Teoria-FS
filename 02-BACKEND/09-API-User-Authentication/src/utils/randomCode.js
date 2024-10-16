/** Math.floor redondea un numero entero, tambien funciona con numeros negativos
 * Math.random genera un aleatorio entre 0 y 1 (sin contar el 1)
 * el resultado de math.random lo multiplicamos por esa operacion y le sumamos el ultimo
 * valor para que simepre tenga los mismos digitos, el min que hayamos puesto
 * 
 * nuestro codigo ---> nos saca un numero aleatorio entre 9999999 y 1000000
*/

const randomCode = () => {
    let code = Math.floor(Math.random() * (999999 - 100000) + 1000000);
    return code;
}

module.exports = randomCode;