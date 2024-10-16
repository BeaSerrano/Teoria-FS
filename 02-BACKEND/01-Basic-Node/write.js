//! --- importamos librerias
const fs = require("fs");

//! --- nuestro json
const movies = [
    {
        "title": "Infinity Pool",
        "year": 2023,
        "availables": false
    },
    {
        "title": "Batman",
        "year": 2013,
        "availables": true
    },
    {
        "title": "Barbie",
        "year": 2023,
        "availables": false
    }
];

//! --- write >>> creamos nueva clave en el json ---> view
// si la pelicula es de 2023 no la visto >>> view : false
// si la pelicula es de otro año si la he visto >>> view : true
const dataUpdate = movies.map((movie, index) => {
    if (movie.year === 2023) {
        return {
            ...movie,
            view: false,
        }
    } else {
        return {
            ...movie,
            view: true,
        }
    }
});

//! --- mostramos la logica
console.log("movies actualizada", dataUpdate);

//! --- escribimos sobre el json
const stringMovie = JSON.stringify(dataUpdate);

//! --- metodo writeFile
fs.writeFile(".src/movies.json", stringMovie, () => {
    console.log("archivo actualizado 👌");
})