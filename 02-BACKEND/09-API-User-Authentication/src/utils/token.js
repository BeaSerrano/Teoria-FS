
//! --- importamos libreria JWT y dotenv
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

//! --- funcion de generar el token del user
//** la usamos dentro del controlador del User --- en la funcion del login */

const generateToken = (id, email) => {

    /** si no hay id o email creamos un error con un mensaje de que no hay id del usuario o email */
    if (!id || !email) {
        throw new Error("no se ha encontrado el id de usuario o el email de usuario");
    }

    /** si hemos recibido bien el id o el email registramos la peticion del token con el metodo sign 
     *  qué necesita sign? ---> la info para generar el token, la palabra secreta, expiracion del token (caducidad)+
     * La palabra secreta la generamos nosotros (explicacion en authMiddleware y la ponemos en el .env)
    */
    return jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

/** después de generar el token ---> hacemos la decodificacion del token 
 * para ver si el token sigue siendo valido y sacamos la informacion que nos ha permitido generarlo
 */

//! --- funcion para verifica el token del user
//** la usamos dentro del middleware de autenticacion */

const verifyToken = (token) => {
    // si no hay token mandamos un error de que no hay token
    if (!token) {
        throw new Error("no se ha encontrado el token");
    }
    /** la funcion verify de jswt devuelve directamente el token decodificado con su email y su id */
    return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
    generateToken,
    verifyToken,
};
