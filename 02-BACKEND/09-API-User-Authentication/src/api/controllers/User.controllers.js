//! --- importaciones
const User = require("../models/User.model") // modelo de User
const randomCode = require("../../utils/randomCode"); // funcion generar codigo de confirmacion aleatorio
const { deleteImgCloudinary } = require("../../middleware/files.middleware"); // funcion delete del middleware cloudinary
const nodemailer = require("nodemailer"); // libreria nodemailer para envio el email
const sendEmail = require("../../utils/sendEmail"); // funcion para enviar el email con nodemailer
const { setTestEmailSend, getTestEmailSend } = require("../../state/state.data"); // funcion de test de set y get
const { configs } = require("eslint-plugin-prettier"); // libreria eslint y prettier
const bcrypt = require("bcrypt"); // libreria bcryt para encriptado
const { generateToken } = require("../../utils/token"); // funcinon para generar el token de autenticacion
const setError = require("../../helpers/handleError"); // funcinon para manejar errores en los catch
const randomPassword = require("../../utils/randomPassword"); // funcion para generar contraseña segura aleatoria
const enumOk = require("../../utils/enumOk");

//! --------------------------------------------------------
//? ---------------------- Registro largo ------------------
//! --------------------------------------------------------

const registerLargo = async(req, res, next) => {
    // capturamos la imagen que se sube a cloudinary
    // con optional chaining ? porque puede ser que el user haya subido imagen o no
    let catchImg = req.file?.path;

    try {
        // actualizamos los indices del esquema de modelo de User
        await User.syncIndexes()

        //?--- generamos el codigo de confirmacion con la funcion de utils randomCode
        const confirmationCode = randomCode();

        //?--- generamos el usuario con el email y el name
        const { email, name } = req.body;

        /** usamos el método findOne para traer el email y el name del user
         * y después comprobar si existe o no para manejar los errores
         * y darle respuesta al usuario --- puede pasar que el user no se guarde, que el user ya exista,
         * que haya un error en le envio del codigo de confirmacion por correo, ...
         */
        const userExist = await User.findOne(
            { email: req.body.email },
            { name: req.body.name }
        )

        /** comprobamos si el usuario existe o no
         * si no existe lo guardamos en una nueva istancia ---> new User
         * y lo guardamos con su body con la info que ha dado el usuario
         * y su codigo de confirmacion
         * 
         * además hacemos la subida de la imagen si la hubiera y si no ponemos una por defecto
         * 
         * después con un try catch guardamos el user y manejamos errores
         */
        if (!userExist) {
            const newUser = new User({ ...req.body, confirmationCode })

            req.file 
            ? (newUser.image = req.file.path) 
            : (newUser.image = 'https://res.cloudinary.com/deahoouj6/image/upload/v1709323076/sd4tavfxko5roomnebcs.webp')

            /** guardamos el user de la nueva instancia de user que se ha creado 
             * y enviamos el codigo de confirmacion al email que ha dado el user
             * usamos nodemailer
            */
            try {
                const userSave = await newUser.save();

                //! --------------------------------------------------------
                //todo ------- envio correo codigo de confirmacion ---------
                //! --------------------------------------------------------

                if (userSave) {
                    // traemos las variables de entorno del .env
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

                    // configurar opciones del mail
                    const mailOptions = {
                        from: EMAIL,
                        to: email,
                        subject: 'Código de confirmación',
                        text: `Hola ${name}: tu código de confirmación es ${confirmationCode}`
                    }

                    // enviamos el email
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            console.log(error);
                            return res.status(404).json({
                                user : userSave,
                                confirmationCode : 'error, reenviar el codigo'
                            })
                        } else {
                            console.log(info.response);
                            return res.status(200).json({
                                user : userSave,
                                confirmationCode
                            })
                        }
                    })
                    //! --------------------------------------------------------
                    //todo ------- fin de nodemailer ---------------------------
                    //! --------------------------------------------------------
                } else {
                    // si el user no se ha guardado
                    return res.status(404).json('el usuario no se ha guardado')
                }

            } catch (error) {
                // no se ha guardado el user
                return res.status(404).json({
                    error: 'error catch save',
                    message: error.message
                })
            }

        } else {
            // el usuario ya existe
            req.file && deleteImgCloudinary(catchImg)
            return res.status(404).json('el usuario ya existe')
        }

    } catch (error) {
        // error registro
        return res.status(404).json({
            error: 'error catch general',
            message: error.message
        })
    }
}


//! --------------------------------------------------------
//? ----------------- Registro con estado ------------------
//! --------------------------------------------------------

const registerEstado = async (req, res, next) => {

    let catchImg = req.file?.path;

    try {
        await User.syncIndexes()

        const confirmationCode = randomCode();

        const { email, name } = req.body;

        const userExist = await User.findOne(
            { email: req.body.email },
            { name: req.body.name }
        )

        if (!userExist) {
            const newUser = new User({ ...req.body, confirmationCode })

            req.file 
            ? (newUser.image = req.file.path) 
            : (newUser.image = 'https://res.cloudinary.com/deahoouj6/image/upload/v1709323076/sd4tavfxko5roomnebcs.webp')

            // creamos una nueva utilidad ---sendEmail
            try {
                const userSave = await newUser.save(); 

                if (userSave) {
                    // enviamos el correo con la funcion de utils --- sendEmail
                    sendEmail(email, name, confirmationCode)

                    /** tenemos que aplicar al estado (al envio del codigo de confirmacion)
                     * un set time out para que le de tiempo a enviarlo y a guardarlo
                     * y a hacer el seteo el estado!
                     * 
                     * básicamente necesitamos tiempo para gestionar la asincronia y que
                     * le de tiempo a enviar el registro
                     */

                    setTimeout(() => {
                        /** lo que comprobamos es el resultado de getTestEmail, puede ser true o false */
                        if (getTestEmailSend()) {
                            setTestEmailSend(true)
                            return res.status(200).json({
                                user: userSave,
                                confirmationCode,
                            })
                        } else {
                            setTestEmailSend(false)
                            return res.status(404).json({
                                user: userSave,
                                confirmationCode: 'error, no se ha enviado el código',
                            })
                        }
                    }, 1600)
                } else {
                    // si el user no se ha guardado
                    return res.status(404).json('el usuario no se ha guardado')
                }
            } catch (error) {
                // no se ha guardado el user
                return res.status(404).json({
                    error: 'error catch save',
                    message: error.message
                })
            }
        } else {
            req.file && deleteImgCloudinary(catchImg)
            return res.status(404).json('el usuario ya existe')
        }
    } catch (error) {
        // error registro
        return res.status(404).json({
            error: 'error catch general',
            message: error.message
        })
    }
}

//! --------------------------------------------------------
//? ----------------- Registro con redirect ----------------
//! --------------------------------------------------------

/** la forma más correcta de fabricar un backend es con redirects (de controlador a controlador)
 * porque sigue la logica del SINGLE RESPONSABILITY ---> significa un controlador solo hace una cosa
 * solo tiene que cumplir una responsabilidad
 */

const registerRedirect = async (req, res, next) => {

    let catchImg = req.file?.path;

    try {
        await User.syncIndexes()

        const confirmationCode = randomCode();

        const { email, name } = req.body;

        const userExist = await User.findOne(
            { email: req.body.email },
            { name: req.body.name }
        )

        if (!userExist) {
            const newUser = new User({ ...req.body, confirmationCode })

            req.file 
            ? (newUser.image = req.file.path) 
            : (newUser.image = 'https://res.cloudinary.com/deahoouj6/image/upload/v1709323076/sd4tavfxko5roomnebcs.webp')

            // creamos una nueva utilidad ---sendEmail
            try {
                const userSave = await newUser.save(); 

                if (userSave) {
                    return res.redirect(
                        307,
                        `http://localhost:8080/api/v1/users/register/sendMail/${userSave._id}`
                    )
                } else {
                    // si el user no se ha guardado
                    return res.status(404).json('el usuario no se ha guardado')
                }
            } catch (error) {
                // no se ha guardado el user
                return res.status(404).json({
                    error: 'error catch save',
                    message: error.message
                })
            }
        } else {
            req.file && deleteImgCloudinary(catchImg)
            return res.status(404).json('el usuario ya existe')
        }
    } catch (error) {
        // error registro
        return res.status(404).json({
            error: 'error catch general',
            message: error.message
        })
    }
}

/** redireccion a sendCode para enviar el codigo de confirmacion
 *  después de ejecutqr este controlador, volvemos a registerRedirect
 */
//! --------------------------------------------------------
//? --------- enviar correo confirmacion con redirect ------
//! --------------------------------------------------------

const sendCode = async (req, res, next) => {
    try {
        // BUSCAMOS AL USER POR ID EL CUAL RECIBIMOS POR UN PARAM
        // para buscar el email y su codigo de confirmacion
        //del user sacamos el email y el confirmationCode
        const { id } = req.params;
        const userDB = await User.findById(id)

        //! --------------------------------------------------------
        //todo ------- envio correo codigo de confirmacion ---------
        //! --------------------------------------------------------

        const EMAIL = process.env.EMAIL;
        const PASSWORD = process.env.PASSWORD;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: EMAIL,
                pass: PASSWORD,
            },
        });

        const mailOptions = {
            from: EMAIL,
            to: userDB.email,
            subject: "Confirmation code",
            text: `tu codigo es ${userDB.confirmationCode}, gracias por confiar en nosotros ${userDB.name}`,
            tls: {
                rejectUnauthorized: false
            }
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return res.status(404).json({
                    user: userDB,
                    confirmationCode: 'error, no se ha enviado el codigo'
                })
            } else {
                console.log('Email enviado - info del email: ' + info.response);
                return res.status(200).json({
                    user: userDB,
                    confirmationCode: userDB.confirmationCode
                })
            }
        })

    } catch (error) {
        return next(error);
    }
}

//! --------------------------------------------------------
//? ---------------------- LOGIN ---------------------------
//! --------------------------------------------------------

const login = async (req, res, next) => {
    try {
        // recibimos por el body el email y el password que nos da el usuario
        const { email, password } = req.body;
        // buscamos un usuario que tenga ese email
        const userDb = await User.findOne({ email })
        // hacemos un if else para ver si existe el usuario
        if (userDb) {
            /** comparamos gracias a bcrypt la contraseña sin encriptar con la contraseña encriptada que tenemos en el back
             * se usa bcrypt con el metodo compareSync
             * >>>>> importante!! ---> las contraseñas tiene que ir en este orden
             */
            if (bcrypt.compareSync(password, userDb.password)) {
                // si coinciden las contraseñas, me llamo a la fiiuncion de generar el token
                const token = generateToken(userDb._id, email);
                // una vez generado el token el envio al user su token
                return res.status(200).json({
                    user: userDb,
                    token,
                })
            } else {
                // las contraseñas no coiciden mandamos error
                return res.status(404).json('las contraseñas no coinciden')
            }
        } else {
            // si no encuentra el email que el usuario nos da, lanza un error
            return res.status(404).json('usuario no registrado')
        }
    } catch (error) {
        return next(error)
    }
}

//! --------------------------------------------------------
//? ------------ Ejemplo con Autenticación -----------------
//! --------------------------------------------------------

const exampleAuth = async (req, res, next) => {
    // este { user } ---> se crea gracias a las funciones que tenemos en el middleware de autenticacion
    // ese middleware crea el user comprobado con su token y aquí lo traemos para hacer un ejemplo
    // de que es un user autentiado
    const { user } = req;
    return res.status(200).json(user)
}

//! --------------------------------------------------------
//? ---------------------- auto login ----------------------
//! --------------------------------------------------------

/** aquí hacemos autologin de la siguiente manera ---> como no podemos guardar las contraseñas desencriptadas de una
 * pagina a otra lo que hacemos es usar la contraseña que nos devuelve el registro (la encriptada) para compararla
 * con la contraseña del usuario que está guardada en la db ---> así podemos hacer autologin, cogiendo la contraseña
 * encripatda y comparándola con la encriptada del registro del usuario
 * 
 * por eso en el if de la comparación de la password lo hacemos en compareSync con bcrypt, porque usamos dos encriptadas
*/

const autoLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userDB = await User.findOne({ email });
    
        if (userDB) {
            // comparo dos contraseñas encriptadas
            if (password == userDB.password) {
            const token = generateToken(userDB._id, email);
            return res.status(200).json({
                user: userDB,
                token,
            });
            } else {
            return res.status(404).json("password dont match");
            }
        } else {
            return res.status(404).json("User no register");
        }
        } catch (error) {
        return next(error);
        }
};


//! --------------------------------------------------------
//? --------------------- resend code ----------------------
//! --------------------------------------------------------

/** sirve para volver a enviar el codigo de confirmacion por email al usuario
 * necesitamos el email del usuario para poder enviarselo de nuevo
 * es parecido al registro pero con un usuario ya registrado, entonces solo
 * neceistamos comprobar si el email que nos está dando, que tiene que ser con el
 * que se ha registrado, está en la db asociada a ese usario y volver a enviarle el codigo
 */

const resendCode = async(req, res, next) => {
    try {
        //!-- config de nodemailer para poder enviar el codigo
        /** tener en cuenta que el email y password son los el .env
         * que estñan asociados al servicio de gmail con nodemailer
         */
        const email = process.env.EMAIL;
        const password = process.env.PASSWORD;
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: email,
                pass: password
            }
        })

        //! -- comprobamos que el usuario existe para mandarle el email
        
        /** nos traemos el email que nos ha dado el usuario como registrado */
        const userExists = await User.findOne({ email: req.body.email })

        /**  si el usuario existe, está registrado, le enviamos de nuevo el código de confirmacion
         * si el usuario no existe no hacemos ninguna verificación, 
         * simplemente enviamos error de que ese email no está registrado */
        if (userExists) {
            const mailOptions = {
                from: email,
                to: userExists.email, // o también ---> userExists.email
                subject: "Confirmation code",
                text: `tu codigo es ${userExists.confirmationCode}, gracias por confiar en nosotros ${userExists.name}`,
            };
    
            transporter.sendMail(mailOptions, function (error, info) {
                /** si hay un error en el envio le decimos que el resend es false ---> no se ha enviado el codigo
                 *  si se ha enviado le decimos que el resend es true
                 */
                if (error) {
                    console.log(error);
                    return res.status(404).json({
                        resend: false,
                    })
                } else {
                    console.log('Email enviado - info del email: ' + info.response);
                    return res.status(200).json({
                        resend: true,
                    })
                }
            })
        } else {
            return res.status(404).json("este correo no está registrado")
        }

    } catch (error) {
        /** manejamos este error con la función setError que estña fuera del controlador
         * la tenemos en ./helpers/handleError.js
         */
        return next(setError(500, error.message || "Error catch general"))
    }
}

//! --------------------------------------------------------
//? ------------------ check new user ----------------------
//! --------------------------------------------------------

/** con la funcion checkNewUser le pedimos al usuario nuevo el codigo de confirmacion que se 
 * le ha enviado por email para poder terminar su registro en la apliacion
 */
const checkNewUser = async(req, res, next) => {
    try {
        // nos traemos de la req.body el email y el codigo de confirmacion que nos ha dado el usuario en el formulario
        const { email, confirmationCode } = req.body;

        // buscamos al usuario con el email que nos ha dado
        const userExists = await User.findOne({ email });

        // comprobamos su el usuario existe, si está registrado o no
        if (!userExists) {
            // si no está registrado le decimos que ese email/usuario no existe/no registrado
            return rest.status(404).json("el usuario no existe")
        } else {
            /** si el usuario está registrado en la app compruebo si el codigo que confirmacion
             * que me ha dado en el input del formulario coindice con el codigo de confirmacion
             * que se ha creado en el user de la db al hacer el registro
             */
            if (confirmationCode === userExists.confirmationCode) {
                // si los codigos de cofirmacion coinciden entonces actualizo el checl del usuario
                try {
                    // hago un updateOne del check del usuario a tru, por defecto nos aparecia como false (ver modelo User)
                    await userExists.updateOne({ check: true });

                    // busco de nuevo, con el email del user, el usuario actualizado
                    const updateUser = await User.findOne({ email });

                    // hago el test para ver si se ha hecho bien el cambio del check en el user
                    return res.status(200).json({
                        // con el operador ternario compruebo si el cjeck ahora es true
                        textCheckOk: updateUser.check == true ? true : false,
                    })
                } catch (error) {
                    return res.statys(404).json(error.message)
                }
            } else {
                /** si los codigos de confirmacion no coinciden entonces vamos a borrar lo que se ha guardado del usuario
                 * incluida la imagen con el middleware de cloudinary y mandamos al usuario a registrarse de nuevo
                 * 
                 * borramos el usuario porque ya tenemos un registro de su email, name, ... dentro de nuestra db
                 * necesitabamos esta informacion para enviarle el correo con el codigo
                 * como el codigo no es correcto tenemos que borrar todos los datos del user
                 * porque no hemos conseguido verificar con el codigo que ese usuario "es propiertario" de ese email
                 */
                try {
                    // en caso de equivocarse con el codigo lo borramos de la db y lo mandamos a registrarse
                    await User.findByIdAndDelete(userExists._id);
                    // borramos tambien la imagen
                    deleteImgCloudinary(userExists.image)
                    // devolvemos un status 200 con el test para verificar que se ha hecho el delete correctamente
                    return res.status(200).json({
                        userExists,
                        check: false,
                        // test en el runtime sobre la eliminacion de este user
                        delete: (await User.findById(userExists._id)) ? "error delete user" : "ok delete user"
                    })
                } catch (error) {
                    return next(setError(404, error.message || "Error catch delete"))
                }
            }
        }
    } catch (error) {
        return next(setError(500, error.message || "Error catch general"))
    }
}

//* --------------------------------------------------------
//! -------------- CONTRASEÑAS Y SUS CAMBIOS ---------------
//* --------------------------------------------------------

//! --------------------------------------------------------
//? ----- cambio de contraseña cuando no estás logueado ----
//! --------------------------------------------------------

/** ----> el usuario no está logueado ---> no se pasa por el middleware de autenticación
 * -----> el usuairo no elige la contraseña nueva ---> se la mandamos nosotros por email
 * y la cambiamos en la db
 * 
 * si quiere una contraseña nueva tiene que loguearse e ir a modifyPassword
 */

const changePassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        console.log(req.body);
        const userDb = await User.findOne({ email });
        if (userDb) {
            const PORT = process.env.PORT;
            return res.redirect(
            307,
            `http://localhost:${PORT}/api/v1/users/sendPassword/${userDb._id}`
            );
        } else {
            return res.status(404).json("User no register");
        }
        } catch (error) {
        return next(error);
        }
};

const sendPassword = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userDb = await User.findById(id);
        const email = process.env.EMAIL;
        const password = process.env.PASSWORD;
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
            user: email,
            pass: password,
            },
        });
        let passwordSecure = randomPassword();
        console.log(passwordSecure);
        const mailOptions = {
            from: email,
            to: userDb.email,
            subject: "-----",
            text: `Hola ${userDb.name}. Tu nueva contraseña es: ${passwordSecure}`,
        };
        transporter.sendMail(mailOptions, async function (error, info) {
            if (error) {
            console.log(error);
            return res.status(404).json("dont send email and dont update user");
            } else {
            console.log("Email sent: " + info.response);
            
            const newPasswordBcrypt = bcrypt.hashSync(passwordSecure, 10);
    
            try {
                await User.findByIdAndUpdate(id, { password: newPasswordBcrypt });
    
                //!------------------ test ------------------------
                const userUpdatePassword = await User.findById(id);
    
                if (bcrypt.compareSync(passwordSecure, userUpdatePassword.password)) {
                    return res.status(200).json({
                        updateUser: true,
                        sendPassword: true,
                    });
                } else {

                    return res.status(404).json({
                        updateUser: false,
                        sendPassword: true,
                    });
                }
            } catch (error) {
                return res.status(404).json(error.message);
            }
            }
        });
        } catch (error) {
            return next(error);
        }
};

//! --------------------------------------------------------
//? ----- cambio de contraseña cuando si estás logueado ----
//! --------------------------------------------------------

/** ---> el usuario tiene que estar logueado ---> tenemos que pasar por la funcion isAtuh del middleware
 * ----> el ususario elige su nueva contraseña pero tiene que ser valdida con validator
 * depsués actualizamos el user con la nueva pass
 */
const modifyPassword = async(req, res, next) => {
    try {
        /** nos traemos la contraseña nueva y la antigua, nos da la el user en el formulario
         * 
         * el body es un json con la password nueva y la antigua, que el user pone en el formulario de recuperacion de contraseña */
        const { password, newPassword } = req.body;

        /** validamos que se cumplan los requisitos de una contraseña segura según validator */
        const validado = validator.isStrongPassword(newPassword); // true o false

        /** si estás logueado y la contraseña está validada nos traemos el id del user, nos traemos el user
         * para pdoer comparar las contraseñas y actualizar la password a la nueva password que nos ha dado
         */

        // validado es true
        if (validado) {

            /** este req.user sale de la función isAtuh del middlewate de autenticación
             * el middleware comprueba que estamos autenticados y nos manda por la req.user el id
             * lo recogemos en esta funcion de modifypassword para actualizarlo con la nueva pass
             */
            const { _id } = req.user;
            
            // comparamos contraseñas del usuario y de la db
            if (bcrypt.compareSync(password, req.user.password)) {

                // encriptamos la nueva contraseña
                const newPasswordHashed = bcrypt.hashSync(newPassword, 10)

                // por ultimo actualizamos el user con la contraseña nueva
                try {
                    await User.findByIdAndUpdate(_id, { password: newPasswordHashed })

                    //* ------------ test update password en user ------------
                    
                    // traer el user por id
                    const userUpdate = await User.findById(_id)
                    // comparar las contraseñas 
                    if (bcrypt.compareSync(newPassword, userUpdate.password)) {
                        // respuesta de update user true (test OK)
                        return res.status(200).json({
                            userUpdate : true,
                        })
                    } else {
                        // respuesta de update user false (test KO)
                        return res.status(404).json({
                            userUpdate : false,
                        })
                    }

                    //* ---------------------- fin test ----------------------
                } catch (error) {
                    return res.status(404).json({
                        error: "error catch update",
                        message: error.message,
                    })
                }
            } else {
                // si no conseguimos validacion al comparar las contraseñas los lanza error del usuario
                return res.status(404).json("las contraseñas no coinciden")
            }
        } else {
            // validado es false
            return res.status(404).json("las contraseña no es suficientemente segura")
        }
    } catch (error) {
        return res.status(500).json({
            error: "error catch general --- no autenticado",
            message: error.message,
        })
    }
}

//! --------------------------------------------------------
//? ----------------------- update -------------------------
//! --------------------------------------------------------

const update = async (req, res, next) => {
    // capturamos la imagen porque el user contiene una imagen que se coge el middleware de cloudinary
    let catchImg = req.file?.path;

    try {
        // actualizamos los indices del modelo User
        await User.syncIndexes();
        // hacemos una nueva instancia (objeto) con new de los elementos que nos da el usuario en la req.body del formulario
        const patchUser = new User(req.body);

        // salvaguardo la info que no quiero que me guarde en la nueva instancia de User
        req.file && (patchUser.image = catchImg);
        patchUser._id = req.user._id;
        patchUser.password = req.user.password;
        patchUser.rol = req.user.rol;
        patchUser.confirmationCode = req.user.confirmationCode;
        patchUser.email = req.user.email;
        patchUser.check = req.user.check;

        // usamos la funcion de utils enumOk para comprobar que al cambiar gender nos da un valor valido
        if (req.body?.gender) {
            const resultEnum = enumOk(req.body?.gender)
            patchUser.gender = resultEnum.check
            ? req.body?.gender
            : req.user.gender
        }

        // hacemos otro try catch para la peticion del usuario con la peticion de update
        // buscando el user por id
        try {
            // peticion del usuario por id y actualizacion con update
            await User.findByIdAndUpdate(req.user._id, patchUser)
            // borrado de imagen antigua, almancenada en el req.user en la propiedad image
            if (req.file) { deleteImgCloudinary(req.user.image) }

            //* --------- test runtime update del user -------
            // traemos el user actualizado mediante el _id (recordad que en mongodb el id lleva _id antes)
            const updateUser = await User.findById(req.user._id);
            /** queremos saber que nos envia el usuario para hacer el testeo entonces tenemos que coger
             * las propiedades de lo que quiere cambiar del objeto del body (req.body)
             * 
             * Object.keys() es un metodo que devuelve un array con las propiedades del objeto: name, image, email, gender...
             */
            const updateKeys = Object.keys(req.body);
            /** creamos un array vacio para meter dentro esas propiedades mediante un forEach
             * así solo cogemos las propiedades que nos da el usuario y no las que no necesitamos testear
             * solo testeamos las propiedades que van a tener una actualizacion
             */
            const testUpdate = [];
            /** hacemos un forEach de esas propiedades y cada propiedad va a ser un "item" */
            updateKeys.forEach((item) => {
                /** hacemos un "doble testeo" de esos item (propiedades)
                 * en el primer if ---> comprobamos que la propiedad del usuario actualizado es igual a la propidad que nos ha dado el usuario en el formulario
                 * >>>>>>>> si es igual ---> comprobamos dentro con otro if ---> comprobamos que las propiedades que no son distintas dentro del usuario
                 * 
                 * si no son distintas >>> puseamos dentro del array vacio la propiedad actualizada con un true ---> update ok
                 * si son distintas >>> puseamos dentro del array vacio la propiedad actualizada con un false ---> update ko
                 */
                if (updateUser[item] === req.body[item]) {
                    if (updateUser[item] != req.user[item]) {
                        testUpdate.push({
                            [item] : true,
                        })
                    } else {
                        testUpdate.push({
                            [item] : false,
                        })
                    }
                } else {
                    testUpdate.push({
                        [item] : false,
                    })
                }
            });
            // hacemos el mismo testeo con la imagen
            /** comprobamos que ha subido una imagen, que quiere cambiar la image
             * y comprobamos que es igual a la imagen que hemos capturado al inicio de la funcion
             * en el catchImg ---> la imagen nueva
             * 
             * puseamos dentro del array del test un obejto con los resultados del test ---> true o false
             */
            if (req.file) {
                updateUser.image === catchImg 
                ? testUpdate.push({
                    image : true,
                }) 
                : testUpdate.push({
                    image : false,
                }) 
            } else {
                return res.status(200).json({
                    updateUser,
                    testUpdate,
                })
            }

            //* -------------- fin test ----------------------

        /** para manejar los errores de los try cacth primero tenemos que borrar la imagen que se ha quedado
         * en el middleware de cloudinary y después damos respuesta con el error
         * 
         * el primer error será el del update ---> cliente
         * el segundo error será en el servidor ---> back
         */

        } catch (error) {
            req.file && deleteImgCloudinary(catchImg)
            return res.status(404).json({
                error: "error catch update",
                message: error.message,
            })
        }

    } catch (error) {
        req.file && deleteImgCloudinary(catchImg)
        return res.status(500).json({
            error: "error catch general",
            message: error.message,
        })
    }
}   


//! --------------------------------------------------------
//? ----------------------- delete -------------------------
//! --------------------------------------------------------

const deleteUser = async (req, res, next) => {
    try {
        // hacemos un find by id and delete para borrar el usuario
        await User.findByIdAndDelete(req.user._id);

        //* --------- test runtime delete del user -------
        // encapsulamos la busqueda de ese usuario que supuestamente se ha tenido que eliminar mediante su id
        const userExist = await User.findById(req.user._id);
        // lanzamos respuesta del test 
        /** con el operador ternario lanzamos a la vez los errores de que el test ha salido bien y de que el test ha salido mal
         * preguntamos su el usuaruo existe ---> si existe hay un error porque no se ha eliminado y el test es false
         * si el usuario no existe ---> la respuesta es un 200 porque se ha eliminado el usuario y el test seria true
         */
        return res 
        .status(userExist ? 404 : 200)
        .json({
            deleteTest : userExist ? false : true
        })

        //* -------------- fin test ----------------------
    
    // si hay un error en el delete primero borramos la imagen capturada y luego manejamos el error
    } catch (error) {
        req.file && deleteImgCloudinary(req.user?.image)
        return res.status(500).json({
            error: "error catch delete",
            message: error.message,
        })
    }
}


//! --- exportamos las funciones

module.exports = { 
    registerLargo, 
    registerEstado, 
    registerRedirect, 
    sendCode,
    login,
    exampleAuth,
    autoLogin,
    resendCode,
    checkNewUser,
    changePassword,
    sendPassword,
    modifyPassword,
    update,
    deleteUser
}