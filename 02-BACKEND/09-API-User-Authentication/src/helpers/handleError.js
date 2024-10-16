//! --- helper para manejar errores en los catch d enuestras funciones del controlador

/** tenemos una función setError con dos parámetros ---> code y message
 * 
 * creamos una nueva instancia de error { new Error }
 * lo manejamos mediante code y mediante message
 * 
 * code ---> el codigo del error
 * message ---> mensaje que trae la consola con el error
 * 
 * la función setError devuelve el error ---> la nueva instancia de error que nos hemos creado para manejar el error
 * 
 * error = {
 *      code: error.code,
 *      message : error.message
 *    }
 * 
 * exportamos la funcion para usarla donde queramos, en este caso en las funciones del controlador
 * 
 * IMPORTANTE!!!! ---> en la llamada a esta función dentro del catch ---> hay que poner los parámetros que pide la función
 */

const setError = (code, message) => {
    const error = new Error();
    error.code = code;
    error.message = message;
    return error;
};

module.exports = setError;