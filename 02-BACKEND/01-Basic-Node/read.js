//! ----- requerimos libreria fs
const fs = require("fs");

// creamos array vacio para meter movies
const movies = [];

//! ---- crear metodo para leer archivo
fs.readFile("./src/movies.json", (error, data) => {
    // logica error y fata ---> operador ternario ---> condicion ? true : false
    error ? console.log(error) : movies.push(JSON.parse(data));

    // funcion leer
    printData()
})

// mostrar en consola las peliculas
const printData = () => {
    console.log(movies);
}