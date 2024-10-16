//! --- primeros pasos ---> requerir express, crear puerto, crear servidor
const express = require("express");
const PORT = 8080;
const app = express();

//! --- crear enrutado con express con el metodo Router()
const router = express.Router();

//! --- usando metodo get nos pide un path con el endpoint y una callback ()=>{}
//! --- hacemos 2 peticiones distintas

router.get("/saludo", (req, res, next) => {
    // en la callback usamos tres parámetros ---> req, res, next

    // que me devuelva Hola mundo!!
    res.send("<h1>Hola mundo!!</h1>");
})

router.get("/movies", (req, res, next) => {
    // colección de pelis
    const movie = ["Coco", "Batman", "Titanic"]

    // que me devuelva las peliculas
    res.send(movie);

})

//! --- configuracion del uso del router

app.use("/api/v1/", router);

//! --- escuchamos al servidor en el puerto dado

app.listen(PORT, () => {
    console.log(`Server listening on port 👌 http://localhost:${PORT}`);
})

// para ver la url completa no olvidar ---> http://localhost:8080/api/v1/endpoint