//! --- importacion y configuracion del dotenv
const dotenv = require("dotenv");
dotenv.config();

//! --- traer mongoose y mongo_uri
const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

//! --- funcion con la que nos conectamos con la db de mongodb
const connect = async() => {
    // intenta conectarse a la db y si no lo consigue atrapa un error de conexion a la db
    try {
        const db = await mongoose.connect(MONGO_URI, {
            // parsear la url de mongo, la mongo_uri
            useNewUrlParser: true,
            // unificar los caracteres especiales
            useUnifiedTopology: true
        });
        const { name, host } = db.connection;
        console.log(`Conectada la DB 👌 con el HOST: ${host} y el name: ${name}`);
    } catch (error) {
        console.log("Hay un error en la conexión con la DB 🤯", error);
    }
}

//! --- exportamos la función connect que nos conecta a la db
module.exports = connect;
