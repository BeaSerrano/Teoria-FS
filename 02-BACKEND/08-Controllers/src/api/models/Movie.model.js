//! --- requerimos mongoose

const mongoose = require("mongoose");

//! --- esquema de modelo de datos con mongoose

/** nos creamos el esquema de modelo de datos y nos traemos de mongoose la 
 * parte de esquemas de datos para poder crear el esquema */

const MovieSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true},
        year: { type: Number, required: true },
        characters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Character"}],
    },
    {
        timestamps : true,
    },
)

//! --- creamos el modelo de datos

const Movie = mongoose.model("Movie", MovieSchema)

//! --- exportamos el modelo de datos

module.exports = Movie;