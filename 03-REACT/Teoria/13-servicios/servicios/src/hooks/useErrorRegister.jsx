import Swal from 'sweetalert2/dist/sweetalert2.all.js'

export const useErrorRegister = (res, setOk, setRes) => {

    //? si la respuesta es ok --> directamente aparece el status dentro de la --> res.status
    //? si la respuesta no está ok --> tenemos que entrar en response --> res.response.status

    //! --------------- 200 : todo ok
    if (res?.status == 200) {
        setOk(() => true);
        Swal.fire({
            icon: 'success',
            title: 'Welcome to my Page 💗',
            showConfirmButton: false,
            timer: 1500,
        });
        setRes({})
    }

    //! --------------- 409 : usuario ya registrado

    if (res?.response?.status == 409) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please, your email is incorrect! 🫠',
            showConfirmButton: false,
            timer: 1500,
        });
        setRes({})
    }

    //! --------------- La contraseña no está en el formato correcto

    if (res?.response?.data?.includes("validation failed: password")) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Min 8 characters, 1 upper case, 1 lower case and a special character 🫠',
            showConfirmButton: false,
            timer: 3000,
        });
        setRes({})
    }

    //! --------------- 500 : internal server error

    if (res?.response?.status == 500) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Interval Server Error! 💀 Please try again!',
            showConfirmButton: false,
            timer: 1500,
        });
        setRes({})
    }
}