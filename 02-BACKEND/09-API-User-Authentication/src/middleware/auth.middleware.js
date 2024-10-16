//! --- importaciones
/** modelo User, funcion verifyToken del token.js, dotenv */

const User = require("../api/models/User.model");
const { verifyToken } = require("../utils/token");
const dotenv = require("dotenv");
dotenv.config();

/** el middleware está entre el usuario y el backend
 * porque va a autenticar que el login está bien hecho y se pueda entrar en la app
 * 
 * se usa para comprobar si la persona que intenta entrar en una ruta determinada está 
 * autitizada para hacerlo ---> el metodo que se usa para comprobar esa autenticacion
 * es un token generado por la libreria jswon web token (JWT)
 * 
 * necesitamos el modelo de User (para coger los datos del usuario) 
 * y una función isAuth para saber si está autenticado o no
 */

//! --- funcion de autenticacion

const isAuth = async (req, res, next) => {
    /** se hace una peticion y el token se envia por las headers (info que no se ve) de esa peticion
     * en envia como un Bearer token ---> por eso lo primero que tenemos que hacer es 
     * aplicarle un metodo replace de "Bearer " a un string vacio
     * para que luego json web token me lo reconozca sin la palabra Bearer
     */
    const token = req.headers.authorization?.replace("Bearer ", "");

    /** con este if le digo que si no hay token cree un error de NO autorizado! */
    if (!token) {
        return next(new Error("Unauthorized"));
    }

    /** con este codigo hago la verificacion con el token:
     * hay una funcion que está en utils/token.js ---> verifyToken()
     * verifica nuestra clave de JWT la cual generamos nosotros
     * *** y ahora la metemos en el .env para traerla a la funcion y
     * además, como hace la funcion veriyToken ya tenemos decodificado el token para poder comprobarla!
     */
    try {
        /** vertifyToken dvuelve la informacion que le dimos para crear el token (email, id) 
         * y lo metemos en decoded ---> que lo que tiene dentro es un objeto con el email y el id { email, id } */
        const decoded = verifyToken(token, process.env.JWT_SECRET);

        //! --- decodificamos para hacer una peticion al user (req.user) para saber que usuario está autenticado en ese momento
        /** vamos a buscar el usuario por id gracias a quehemos decodificado el token y hemos sacado el email y el id
         * una vez encontrado el usuario por id ---> lo guardamos en el req.user
         * req.user nos va a servir que ese es un usuario autenticado
         */
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        return next(error);
    }
};

//! --- ver el el user es administrador 

/** esta función coge el token creado en la funcion isAuth, recibe el token y lo verifica decodificándolo
 * después encuentra el user por id y comprueba sit iene rol de admin
 * si tiene le rol de admin continúa la funcion ---> next()
 * si no tiene ---> error y sale del back
 */

const isAuthAdmin = async (req, res, next) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
        return next(new Error("Unauthorized"));
    }

    try {
        const decoded = verifyToken(token, process.env.JWT_SECRET);
        // cuando decodifico el token saco el id y el email
        console.log(decoded);
        req.user = await User.findById(decoded.id);

        // pongo un requisito mas y es que sea admin
        if (req.user.rol !== "admin") {
        return next(new Error("Unauthorized, not admin"));
        }
        next();
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    isAuth,
    isAuthAdmin,
};
