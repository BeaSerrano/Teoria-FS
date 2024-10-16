//! --- requerimos protocolo http

const http = require("http");

//! --- creamos el servidor con el protocolo http + peticion (request = req) y respuesta (response = res)

const app = http.createServer((req, res) => {

    // configuramos la respuesta del servidor ---> status, header, body

    res.statusCode = 200; // todo ok 👌
    res.setHeader("Content-Type", "text/html")
    res.end("<h1>Buenos dias</h1>")
})

//! --- asignamos puerto + escuchamos al servidor

app.listen(8080, () => {})

//! mostrar en consola el servidor con el puerto que hemos creado

console.log("Server listening on port http://localhost:8080");