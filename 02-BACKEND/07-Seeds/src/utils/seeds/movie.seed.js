//! --- importamos mongoose y dotenv
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Movie = require("../../api/models/Movie.models");
dotenv.config();

//! --- ejemplo de seed que hemos cogido para hacer pruebas
const movieDataSet = [
    {
        title: "The Batman",
        poster: "https://posters.movieposterdb.com/22_02/2022/1877830/l_1877830_764432ad.jpg",
        year: 2022,
        released: true,
    },
    {
        title: "Dune",
        poster: "https://posters.movieposterdb.com/21_08/2021/1160419/l_1160419_565d3d10.jpg",
        year: 2022,
        released: true,
    },
    {
        title: "Jaws",
        poster: "https://posters.movieposterdb.com/08_06/1975/73195/l_73195_a4183f3d.jpg",
        year: 1975,
        released: false,
    },
]

//! --- función que siembra la semilla para poder utilizarla en el index y meterla en nuestra db

//?--- importo la mongo uri para decirle donde quiero que se conecte
const MONGO_URI = process.env.MONGO_URI;

//? --- creo la función
const createSeed = () => {
    mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(async () => {
        /** vamos a buscar con el metodo find si hay algún elemento subido en la db.
         * si hay algun elemento enla coleciion lo borramos con el metodo drop()
         * El metodo find() busca algo dentro de ese modelo de la db
        */
        const allMovies = await Movie.find();
        if (allMovies.lenght > 0) {
            /** eliminamos los datos que ya estén dentro y dejamos la db vacía
             * porque se siembra sobre vacío */
            await Movie.collection.drop();
            console.log("borrada la db 😈");
        }
    })
    .catch((error) => {
        console.log("error en la siembra 🙃", error.message);
    })
    .then(async () => {
        /** hay que transformar la información del objeto que nos dan
         * y hay que instanciarlo (crear un objeto nuevo con esto) a partir de los datos del objeto dado
         * metemos cada elemento del array original dentro de nuestra collecion de la db con
         * el esquema de datos del modelo Movie --- que tiene que coincidir
         */
        const allMoviesModelOk = movieDataSet.map((movie) => new Movie(movie))
        /** usamos insertMany() porque son varios, si solo adjunto un elemento con mongodb usaría save() */
        await Movie.insertMany(allMoviesModelOk)
        console.log("db sembrada correctamente 🪴");
    })
    .catch((error) => {
        console.log("error en el sembrado 🥀", error.message);
    })
    .finally(() => {
        /** una vez sembrado nuestro seed, nos desconectamos de la db */
        mongoose.disconnect();
    })
}

//! --- exportar la funcion
module.exports = createSeed;