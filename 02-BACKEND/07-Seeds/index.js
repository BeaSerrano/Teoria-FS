//! --- importaciones y configuracion del dotenv
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

//! --- vamos a meter el sembrado de la semilla antes de la conexion a la db
/** lo recogemos antes el seed porque dentro del mismo ya me conecto y me desconecto de la db
 * una vez devuelvo el seed terminado, haya error o no, se desconecta con el finally, y me conecto de nuevo en el index
 * depsués de terminar la siembras
 * 
 * Una cosa es la conexion al seed y otra la conexion a la db con el servidor
 */
const createSeed = require("./src/utils/seeds/movie.seed");
createSeed();

//! --- conexion a db
/** me importo la función de conexion a la db que me he creado en utils (como utilidad)
 * y  me conecto a la db con la función --- llamo a la función connect() */ 
const connect = require("./src/utils/db");
setTimeout(() => connect(), 3000);

//! --- conexion a cloudinary
/** me importo la función de configuracion de cloudinary que tenemos en el middleware
 * y  me conecto a cloudinary llamando a esa función*/ 
const { configCloudinary } = require("./src/middleware/files.middleware");
configCloudinary();

//! --- creacion servidor web
const app = express();

//! --- limites json y urlencoded
app.use(express.json({limit: "5mb"}));
app.use(express.urlencoded({limit: "5mb", extended:false}));

//! --- creacion de errores para cliente (404) y servidor (500)

// error del cliente ---> ruta incorrecta
app.use("*", (req, res, next) => {
    const error = new Error("Route not found");
    error.status = 404;
    return next(error)
})

// error del servidor ---> error inesperado, error de conexión

app.use((req, res, next) => {
    const error = new Error("Error server");
    error.status = 500;
    return next(error)
})

//! --- escuchar al servidor
const PORT = process.env.PORT;
app.listen(PORT, ()=> {
    console.log(`Server listening on port ⛵ http://localhost:${PORT}`);
})