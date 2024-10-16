//! --- traemos mongoose para gestionar la db
const mongoose = require("mongoose");

//! --- crear el esquema con la definicion de datos
const MovieSchema = new mongoose.Schema(
    {
        title: { type: String },
        poster: { type: String },
        year: { type: Number },
        released: { type : Boolean },
    },
    {
        timestamps : true,
    }
);

//! --- convertimos este esquena de datos en un modelo
const Movie = mongoose.model("Movie", MovieSchema);

//! --- exportamos el modelo para usarlo en mi back
module.exports = Movie;