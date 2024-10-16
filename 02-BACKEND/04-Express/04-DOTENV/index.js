// ARCHIVO .env SIEMPRE VA EN GITIGNORE, ARCHIVO PRIVADO

//! --- requerimos express y dotenv
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

//! --- puerto creado con dotenv pasando por el archivo .env donde tenemos las variables de entorno
const PORT = process.env.PORT;

//! --- crear servidor con express
const app = express()

// AQUI PONEMOS LA LOGICA CON LAS RUTAS, PETICIONES, RESPUESTAS, ...

//! --- escuchamos el servidor
app.listen(PORT, () => {
    console.log(`Server listening on port 👌 http://localhost:${PORT}`);
})