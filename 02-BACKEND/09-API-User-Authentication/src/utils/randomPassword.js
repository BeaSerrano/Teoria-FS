//! --- funcion para crear una contraseña random 
//a partir de unso carcateres que le indico



const randomPassword = () => {
    // con un string elegimos caracteres especiales para meter en la contraseña de forma aleatoria
    const randomString = "*@!=&$";

    /** ¡¡¡¡ la contrasela tiene que ser un string !!!!
     * 
     * por lo tanto tenemos que meter todo el codigo del resutlado de las funciones aleatorias
     * en un string interpolation con las comillas giradas `` ---> si os dais cuenta tenemos
     * varias encapsulaciones de bloques de codigo con los metodo Math.random, toString y slice, y toUpperCase
     * 
     * 1. hago un math random con 4 digitos usando un slice para crear un array con esos 4 digitos
     * 2. del string de carateres especiales le digo que coja minimo 1 caracter
     * 3. misma operacion que en el punto 2
     * 4. misma operacion que en l punto 1 pero me devuelve el string en mayuscula con el metodo toUpperCase
     * 5. misma operacion que en el punto 2 y 3
     * 
     * me devuelve la contraseña creada
     */
    const passwordSecure = `${Math.random().toString(36).slice(-4)}${
      randomString[Math.floor(Math.random() * 5)]
    }${randomString[Math.floor(Math.random() * 5)]}${Math.random()
        .toString(36)
        .slice(-4)
        .toUpperCase()}${randomString[Math.floor(Math.random() * 5)]}${
        randomString[Math.floor(Math.random() * 5)]
    }`;
    return passwordSecure;
};

module.exports = randomPassword;