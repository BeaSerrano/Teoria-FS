//! this 

    // keyword de JS que se refiere al objeto en el que se encuentra

    let objeto = {
        nombre : 'Lisa',
        apellido : 'Simpson',
        tocar : function () {
            console.log(`Mi nombre es ${this.nombre}`);
        }
    }
    objeto.tocar() // Mi nombre es Lisa

    
    //! bind()

        // crea una función a partir de otra función dada
        // crear una función y usarla dentro de un objeto

        // parámetro de bind(objeto) es el objeto

        let lisa = {
            apellido : 'Simpson',
            instrumento : 'Saxofón'
        }

        let tocar = function () {
            console.log(`Toco el ${this.instrumento} y mi apellido es ${this.apellido}`);
        }.bind(lisa)

        // añadir el método tocar() al objeto lisa

        tocar() // Toco el Saxofón y mi apellido es Simpson

    //! call()

        // parecido a bind pero añadiendo parámetros actuales en la función/llamada a la función
        // indico en la llamada a función ---> objeto, parámetro de la función separados por coma

        let bart = {
            apellido : 'Simpson',
            instrumento : 'tirachinas'
        }

        let homer = {
            apellido : 'Simpson',
            instrumento : 'donuts'
        }

        let marge = {
            apellido : 'Simpson',
            instrumento : 'cañonero'
        }

        let tirar = function (saludo, despedida) {
            console.log(`${saludo}, mi apellido es ${this.apellido} y uso un ${this.instrumento}, ${despedida}`);
        }

        tirar.call(bart, 'Hey', 'multiplicate por cero') // Hey, mi apellido es Simpson y uso un tirachinas
        tirar.call(homer, 'Ouch', 'adios') // Ouch, mi apellido es Simpson y uso un donuts

    //! apply()

        // diferencia con call() ---> los parámetros actuales dentro de array separados por coma

        tirar.apply(marge, ['Buenas', 'chao']) // Buenas, mi apellido es Simpson y uso un cañonero