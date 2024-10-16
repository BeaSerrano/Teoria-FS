import './Register.css';
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { registerUser } from '../../services/user.service';
import { useErrorRegister } from '../../hooks';
import { useEffect } from 'react';


export const Register = () => {

    //! 1) Creamos los estados

    // 1) el estado donde se setea la respuesta
    // 2) el estado que gestiona que la respuesta esta cargando
    // 3) el estado de navegación - ok o no ok - de la funcionalidad de la página

    const [ res, setRes ] = useState({})
    const [ send, setSend ] = useState(false)
    const [ ok, setOk ] = useState(false)


    //! 2) Llamamos a los hooks

    /** el handleSumbit sirve para decir qué función va a gestionar los datos que vienen del formulario 
     * Estos datos son registrados en un objeto {} gracias a la función register
     * AMBAS FUNCIONES SON DE LA LIBRERIA react-hook-form
    */

    const { handleSubmit, register } = useForm()

    //! 3) La función que gestiona los datos del formulario

    const formSubmit = async (formData) => {
        console.log(formData);

        const customFormData = {
            ...formData,
            gender: 'otros',
        };

        // llamamos al servicio

        setSend(true);
        setRes(await registerUser(customFormData));
        setSend(false);
    };

    //! 4) Los useEffect que gestionan la respuesta y llaman al custom hook para gestionar los errores

    useEffect(() => {
        // aqui voy a llamar al custom hook para gestionar los posibles errores de la respuesta
        useErrorRegister(res, setOk, setRes)
    }, [res])
    

    //! 5) Gestionar los estados de navegación y estados ok

    if (ok) {
        /** cuando ok es true vamos a llevar al usuario a la pagina del check code
         * para verificar el codigo de confirmacion que se le habrá enviado previamente por correo
         * 
         * con un componente Navigate navegará hasta la pagina de verificacion del codigo de confirmacion
         */
        console.log('Estás registrado 😄');
    }

    return (
        <>
            <div className="form-wrap">
                {console.log(res)}
                <h1>Sign Up</h1>
                <p>It´s free and only takes a minute.</p>
                <form onSubmit={handleSubmit(formSubmit)}>
                    <div className="user_container form-group">
                        <input 
                            className="input_user"
                            type="text"
                            id="name"
                            name="name"
                            autoComplete="false"
                            {...register("name", { require: true })}
                        />
                        <label htmlFor="custom-input" className="custom-placeholder">
                            username
                        </label>
                    </div>
                    <div className="password_container form-group">
                        <input 
                            className="input_user"
                            type="password"
                            id="password"
                            name="password"
                            autoComplete="false"
                            {...register("password", { require: true })}
                        />
                        <label htmlFor="custom-input" className="custom-placeholder">
                            password
                        </label>
                    </div>
                    <div className="email_container form-group">
                        <input 
                            className="input_user"
                            type="email"
                            id="email"
                            name="email"
                            autoComplete="false"
                            {...register("email", { require: true })}
                        />
                        <label htmlFor="custom-input" className="custom-placeholder">
                            email
                        </label>
                    </div>
                    <div className="btn_container">
                        {console.log(send)}
                        <button 
                            className="btn"
                            type="submit"
                            disabled={send}
                            style={{ background: send ? "#49c1a388" : "#49c1a2" }}
                        >
                            { send ? "Cargando..." : "Register" }
                        </button>
                    </div>
                    <p className="bottom-text">
                        <small>
                            By clicking the Sign Up button, you agree to our {" "}
                            <a href="#">Terms and Conditions</a> and {" "}
                            <a href="#">Privacy Policy</a>
                        </small>
                    </p>
                </form>
            </div>
            <footer>
                <p>
                    Already have an account? <a href="#">Login Here!</a>
                </p>
            </footer>
        </>
    )
}