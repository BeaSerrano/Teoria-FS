//! ---------- requerimos protocolo http
const http = require("http");

//! ---------- crear servidor web

const app = http.createServer((req, res) => {

    // solicitamos la url en la respuesta + crear method
    const url = req.url;
    console.log(url);
    const method = req.method;

    // creamos funcion con objeto y response

    const getAlumnos = (res) => {

        // tenemos la coleccion de alumnos

        const alumnos = [
            {
                nombre: "David",
                edad: 34,
            },
            {
                nombre: "Elena",
                edad: 30,
            },
            {
                nombre: "Laura",
                edad: 34,
            }
        ];

        // convertir a string
        const dataString = JSON.stringify(alumnos)

        // seteamos headers
        res.setHeader("Content-type", "application/json");

        // finalizar la respuesta
        res.end(dataString)
    }

    // configuramos endpoints (/dia y /noche) para la respuesta con switch/case

    switch (url) {
        case "/dia":
            res.end("<h1>Buenos dias</h1>")
            break;

        case "/noche":
            res.end("<h1>Buenas noches</h1>")
            break;
    
        default:
            break;
    }

    // endpoint con metodo GET con endpoint /alumnos

    if(method === "GET" && url === "/alumnos"){
        // response
        getAlumnos(res)
    }
});

//! --------- crear puerto + escuchar servidor

app.listen(8080, () => {
    console.log("server listening on port 🚤 http://localhost:8080");
})