/** hacemos función en utilidades para comprobar si el gender que ha metido el cliente entra dentro
 * de los gender que puedo usar en el modelo Character
 * 
 * si es uno de los 3 gender que puedo usar ---> devuelve true y el gender
 * si no es una de las opciones ---> devuelve false
 */
const enumOk = (gender) => {
    const enumGender = ["hombre", "mujer", "otros"];
    if (enumGender.includes(gender)) {
        return { 
            check: true, 
            gender
        }
    } else {
        return { 
            check: false
        }
    }
}

module.exports = enumOk;