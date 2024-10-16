//! --- comandos iniciales para empezar proyecto
// npm init -y ----> iniciar node
// npm install nodemon -D ---> usamos nodemon para scripts en el package.json
// npm install express ---> instalamos dependencia express
// crear index.js
// crear scripts en package.json ---> start(node) y dev(nodemon)
// para lanzar servidor ---> npm run dev

//! --- requerimos express
const express = require("express");

//! --- creamos un puerto
const PORT = 8080;

//! --- creamos el servidor
const app = express();

//! --- escuchamos al servidor en el puerto indicado
app.listen(PORT, () => {
    console.log(`Server listening on port 👌 http://localhost:${PORT}`);
})