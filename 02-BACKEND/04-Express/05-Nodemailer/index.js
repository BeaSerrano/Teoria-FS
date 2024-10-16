//! ------------- IMPORTACIONES
const express = require("express");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config();

//! ------------- TRAER VARIABLE DE ENTORNO
const PORT = process.env.PORT;

//! ------------- CONFIGURAR SERVIDOR WEB
const app = express()

//! ------------- CONFIGURAMOS EL ROUTER
const router = express.Router()

// crear funcion con el metodo para gestionar el endpoint
router.get("/sendNewEmail", (req, res, next) => {

    // traemos las variables de entorno
    const EMAIL = process.env.EMAIL;
    const PASSWORD = process.env.PASSWORD;

    // creamos funcion que contiene el servicio y la autenticacion
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: EMAIL,
            pass: PASSWORD,
        }
    })

    //crear opciones del email que quiero mandar
    const mailOptions = {
        from: EMAIL,
        to: "beaserranolucio@gmail.com",
        subject: "Mensaje de prueba",
        text: "Todo ok 🤗"
    }

    // enviamos el email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return next(error) // la ejecución continúa con next pero nos notifica el error
        } else {
            res.status(200).json(`Email enviado, ${info.response}`)
        }
    })
})

//! ------------- USAMOS EL ROUTER
app.use("/api/v1", router)

//! ------------- ESCUCHAMOS EL SERVIDOR
app.listen(PORT, () => {
    console.log(`Server listening on port 👌 http://localhost:${PORT}`);
})