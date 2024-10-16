//! --------------- CREAR SERVIDOR WEB

const express = require("express");
const PORT = 8080;
const app = express();

//! --------------- ROUTING

const router = express.Router();

//! --------------- CREAMOS LOS ENDPOINTS ---> vamos a hacer envíos de params
/* 1. crear el método y la ruta ---> en la ruta configuramos el param (:name)
   2. crear la función que controla el endpoint (peticion, respuesta, next)
   3. sacar el resultado en la consola 
*/ 
//! --- ruta con param :name

router.get("/buscar/:name", (req, res, next) => {
    // construimos el param :name mediante destructuring {name} ---> no es un elemento fijo
    const { name } = req.params;
    console.log("Este es el param name:", name);

    // creamos coleccion de names
    const alumnos = ["David", "Laura", "Elena", "Liviu"]

    // contador del array a 0
    let acc = 0;

    // recorremos el array y comprobamos si hay ese name
    alumnos.forEach((item) => {
        item.toLowerCase() === name.toLowerCase() && acc++;
    })

    // devuelve la condicion y el nombre o el error
    return acc > 0
        ? res.status(200).json("el alumno está en la lista 👌")
        : res.status(404).json("no se ha encontrado al alumno 💔")
}) 

//! --- ruta con query (con el mismo ejemplo de arriba)
// http://localhost:8080/api/v1/queryBuscar?name=david

router.get("/queryBuscar", (req, res, next) => {
    const { name } = req.query;

    // comprobamos si está o no el valor ---> si hay un valor, ejecutas el if, si no hay un valor, el error

    if (name) {
        console.log("Este es el query name:", name);
        const alumnos = ["David", "Laura", "Elena", "Liviu"]
        let acc = 0;
        alumnos.forEach((item) => {
            item.toLowerCase() === name.toLowerCase() && acc++;
        })
        return acc > 0
            ? res.status(200).json("el alumno está en la lista 👌")
            : res.status(404).json("no se ha encontrado al alumno 💔")
    } else {
        return res.status(404).json("aunque sea dime qué quieres que busque 🙃")
    }

}) 


//! --------------- USAMOS EL ROUTER CON APP

app.use("/api/v1", router)

//! --------------- EXCUCHAR AL SERVIDOR

app.listen(PORT, () => {
    console.log(`Server listening on port 👌 http://localhost:${PORT}`);
})