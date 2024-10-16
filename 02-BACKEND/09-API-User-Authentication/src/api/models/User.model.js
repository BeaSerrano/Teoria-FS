//! --- importamos libreriras

const bcrypt = require("bcrypt"); // para encriptar la contraseña
const validator = require("validator"); // validar informacion del usuario ---> email, password
const mongoose = require("mongoose"); // para gestionar datos de la db de mongodb

//! --- crear nuevo esquema de datos para el user

const UserSchema = new mongoose.Schema(
    // definicion de datos y tipos de datos para el user
    {
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            validate: [validator.isEmail, "Email not valid"], 
            // en caso de no ser un email valido
            // lanza el error ----> 'Email not valid'
        },
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
            validate: [validator.isStrongPassword], 
            //minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1
        },
        gender: {
            type: String,
            enum: ["hombre", "mujer", "otros"],
            required: true,
        },
        rol: {
            type: String,
            enum: ["admin", "user", "superadmin"],
            default: "user",
        },
        confirmationCode: {
            type: Number,
            required: true,
        },
        check: {
            type: Boolean,
            default: false,
        },
        image: {
            type: String,
        }
    }, 
    {
        timestamps: true,
    }
);

//! --- funcion para encriptar contraseña y guardar el modelo

/** aqui la funcion no es arrow, es una funcion normal porque vamos a manejar con "this" 
 * los elementos del esquema del user ---> dentro de la documentacion de mongoose
 * 
 * hacemos una funcion de preSave para guardar el código antes de crear el esquema de datos
 */
UserSchema.pre("save", async function (next) {
    try {
        /** hasheo o encriptacion de la contraseña 
         * el 10 ---> le decimos que encripte la contraseña y el de 10 vueltas --- seguridad
         * next ---> continuamos con el guardado del esquema o lanza el error del catch
        */
        this.password = await bcrypt.hash(this.password, 10); 
        next();
    } catch (error) {
        next("Error hashing password", error);
    }
});

//! --- crear el modelo de datos User!

const User = mongoose.model("User", UserSchema);

//! --- exportar el modelo

module.exports = User;