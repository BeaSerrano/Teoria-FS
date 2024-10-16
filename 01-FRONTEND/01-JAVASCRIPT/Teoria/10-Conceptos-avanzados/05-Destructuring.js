//! Destructuring

    // permite crear una nueva variable con un dato extraído en particular

    let estructurado = {
        nombre : 'Lisa',
        apellido : 'Simpson',
        ciudad : 'Sprinfield',
        hobbies : {
            instrumento : 'Saxofón',
            estudio : 'Libros',
            amigos : {
                uno : 'Nelson',
                dos : 'Milhouse'
            }
        }
    }

    //! sin destructuring

    let dato1 = estructurado.nombre
    console.log(dato1); // Lisa

    //! con destructuring

    // izquierda ---> indicamos las propiedades
    // derecha ---> donde se destructura el valor

    // let {propiedad, propiedad} = objeto

    // crea dos variables ---> nombre, apellido ---> del objeto coge el valor de esas propiedades

    let {nombre, apellido} = estructurado

    console.log(nombre);
    console.log(apellido);

    // 1 forma ---> devolver Libros

        let { estudio } = estructurado.hobbies
        console.log(estudio);

    // 2 forma ---> devolver Saxofón

        let { hobbies: {instrumento}} = estructurado
        console.log(instrumento);

        // otro ejemplo ---> sacamos Nelson

        let { hobbies : {amigos : {uno}} } = estructurado // let uno = 'Nelson'
        console.log(uno);
