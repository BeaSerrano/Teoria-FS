const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");
const { setTestEmailSend } = require("../state/state.data");

/** hacemos una funcion para exportar como utilidad
 * con los parametros que vamos a usar: email, name y codigo de confirtmacion del user que se crea
 */
const sendEmail = async (email, name, confirmationCode) => {

  /** ponemos el estado de la funcion SET en false, inicialmente */
  setTestEmailSend(false);

  /** traemos email y password del .env */
  const EMAIL = process.env.EMAIL;
  const PASSWORD = process.env.PASSWORD;

  /** trabajar con nodemailer ---> funcion transport, opciones del email, enviar el email... */
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  });

  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: "Confirmation code",
    text: `tu codigo es ${confirmationCode}, gracias por confiar en nosotros ${name}`,
  };

  //! --- ESTO ES LO QUE CAMBIA CON EL ESTADO
  /**  */
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      // set test en flase --- el correo no se ha enviado
      setTestEmailSend(false);
      return;
    }
    console.log("Email sent: " + info.response);
    // set test en true --- el correo si se ha enviado
    setTestEmailSend(true);
  });
};

module.exports = sendEmail;
