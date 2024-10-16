//! Hoisting

    // código ordenado

        let nombre = 'Bea';
        console.log(nombre);

        function saludo() {
            console.log('Hola, el código está ordenado');
        }
        saludo()
        

    // código desordenado

        // puedo llamar a la función antes y después de crearla - en cualquier lugar del código

        saludo()

        function saludo() {
            console.log('Hola, el código está ordenado');
        }

        saludo()

    
    //! fase de creación ---> escanea el codigo con variables y funciones
    //! fase de ejecución ---> ejecuta línea por línea la información del código

    // funciones ---> podemos desordenarlo
    // var ---> podemos declararla más tarde pero undefined
    // let y const ---> todo en fase de ejecución ---> declaración de variable e inicialización ---> no podemos desordenarlo
    