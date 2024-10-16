//! --- IMPORTACIONES Y CONFIG DOTENV

const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

//! --- TRAER LA CONEXION DE LA BASE DE DATOS y llamar a la función de la conexión

const { connect } = require("./src/utils/db");
connect();

//! --- CONFIGURACION DE CLOUDINARY

const { configCloudinary } = require("./src/middleware/files.middleware");
configCloudinary();

//! --- VARIABLES DE ENTORNO

const PORT = process.env.PORT;

//! --- CREAR EL SERVDIDOR WEB y de damos la CORS al servidor

const app = express();
const cors = require("cors");
app.use(cors());

//! --- LIMITACIONES DE CANTIDAD EN EL SERVIDOR EN EL BACKEND

app.use(express.json({limit: "5mb"}));
app.use(express.urlencoded({limit: "5mb", extended:false}));

//! --- RUTAS

const CharacterRoutes = require("./src/api/routes/Character.routes");
app.use("/api/v1/characters/", CharacterRoutes)

const MovieRoutes = require("./src/api/routes/Movie.routes");
app.use("/api/v1/movies/", MovieRoutes)

//! --- ERROR 404 ---> no se encuentra una ruta ---> error de USER o CLIENTE

app.use("*", (req, res, next) => {
    const error = new Error("Route not found");
    error.status = 404;
    return next(error)
})

//! --- ERROR 500 ---> no funciona el servidor (chrased server) ---> error de SERVIDOR

app.use((error, req, res) => {
    return res
    .status(error.status || 500)
    .json(error.message || "Unexpected error")
})

//! --- ESCUCHAR EN EL PUERTO EL SERVIDOR WEB

app.listen(PORT, () => {
    console.log(`Server listening on port ⛵ http://localhost:${PORT}`);
})