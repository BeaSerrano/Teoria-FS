//! --- IMPORTAMOS DOTENV Y MONGOOSE

const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");

//! --- TRAEMOS LA MONGO URI

const MONGO_URI = process.env.MONGO_URI;

//! --- Funcion asíncrona para conectar la DB de MongoDB

const connect = async() => {

    // manejamos la conexión y los errores con try catch

    try {
        const db = await mongoose.connect(MONGO_URI, {
            // parsear la url de mongo, la mongo_uri
            useNewUrlParser: true,
            // unificar los caracteres especiales
            useUnifiedTopology: true
        });

        const { name, host } = db.connection;

        console.log(`Conectada la DB con el HOST: ${host} y el name: ${name}`);

    } catch (error) {
        console.log("Hay un error en la conexión con la DB", error);
    }
}

//! --- EXPORTACIONES

module.exports = { connect }