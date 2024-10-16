//! --- requerimos mongoose

const mongoose = require("mongoose");

//! --- nos traemos de mongoose la parte de esquemas de datos

const Schema = mongoose.Schema;

//! --- creamos el esquema de datos

const CharacterSchema = new Schema(
    // modelo de tipos de dato
    {
        name: { type: String, required: false, unique: false, },
        gender:{
            type: String,
            enum: ["hombre", "mujer", "otros"],
            required: false,
        },
        image:{ type: String, required: false, },
        movies : [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Movie"
        }]
    },
    {
        timestamps: true, // guarda el momento - fecha hora ... - en el que se ha creado la db
    }
)

//! --- con la definicion de los tipos de datos hecha y su esquema ---> creamos el modelo de datos

const Character = mongoose.model("Character", CharacterSchema)

//! --- exportamos el modelo de datos para usarlo en el controlador

module.exports = Character;