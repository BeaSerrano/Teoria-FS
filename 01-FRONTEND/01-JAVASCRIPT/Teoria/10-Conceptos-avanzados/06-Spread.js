//! spread operator ---> ...

    // permite expandir una expresión (array, objeto, numeros, ...) y lo devuelve en forma de lista o de dato individual

    //! usos

        // crear una copia de array coches

            let coches = ['mercedes', 'seat', 'toyota']
            let copiaCoches = [...coches];
            console.log(copiaCoches); // [ 'mercedes', 'seat', 'toyota' ]

        // concatenar coches y coches2

            let coches2 = ['fiat', 'audi', 'bmw']
            let todosCoches = [...coches, ...coches2]
            console.log(todosCoches); // [ 'mercedes', 'seat', 'toyota', 'fiat', 'audi', 'bmw' ]

        // crear una copia de objeto personaje

            let personaje = {
                nombre : 'Lisa',
                apellido : 'Simpson',
                ciudad : 'Sprinfield',
            }

            let copiaPersonaje = {...personaje};
            console.log(copiaPersonaje); // { nombre: 'Lisa', apellido: 'Simpson', ciudad: 'Sprinfield' }

        //  desestructuro una propiedas del objeto y dejo el resto de propiedades dentro del objeto

            let { nombre, ...restOfTheDetails } = personaje;
            console.log(nombre, restOfTheDetails); // Lisa { apellido: 'Simpson', ciudad: 'Sprinfield' }

        // pasar argumentos a una función desde un array

            let cochesFuncion1 = ['mercedes', 'seat', 'toyota']
            let cochesFuncion2 = ['fiat', 'audi', 'bmw']

            function conducir(coche1, coche2, coche3) {
                return `Tengo tres coches: ${coche1}, ${coche2} y ${coche3}`
            }

            console.log(conducir(...cochesFuncion1)); // Tengo tres coches: mercedes, seat y toyota
            console.log(conducir(...cochesFuncion2)); // Tengo tres coches: fiat, audio y bmw