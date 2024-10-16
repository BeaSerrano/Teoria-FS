//! promesas - Promise

    // son objetos
    // son una respuesta a una tarea que ejecutaremos
    // la tarea se puede resolver o no, inmediatamente o en el futuro
    // tareas asíncronas ---> interceptamos la tarea cuando queramos en el código

    //! sintaxis
        // new Promise (ejecutor function(resolve, reject){tarea})

        // new Promise ---> crea una promesa
        // ejecutor function ---> función que se ejecuta inmediatamente
        // resolver o rechazar ---> funciones que controlar si se resuelve la tarea o falla

    //! estados de una promesa

        // pendiente (pending) ---> estado inicial, ni resuelta ni rechazada
        // resuelta (fulfilled) ---> la tarea se resuelve correctamente ---> con un valor
        // rechazada (rejected) ---> la tarea falla ---> con un motivo (error)

    //! metodos para resolver o rechazar
    
        // then(funcion => return ...) ---> devuelven la promesa ---> resuelta, rechazada
        // catch(funcion => return ...) ---> devuelven la promesa ---> rechazada

        //! Promise.resolve(valor)
            // devuelve una promesa que se resuelve con un valor dado
            // si el valor tiene un método then() ---> la promesa tendría estado resuelto

        //! Promise.reject(razon)
            // devuelve una promesa que se rechaza con una razón (error)

        //! Promise.finally()
            // promesa finalizada
            // devuelve mensaje de promesa finalizada
            // se acaba el recorrido


// ejemplo promesa con resolve
    
    let desarrollo = new Promise (function (resolve) {
        let hola = 'hola mundo!';
        resolve(hola);
    })

// ejemplo con resolve y reject

    let numeros = new Promise (function (resolve, reject) {
        setTimeout(() => {
            const funciona = 'promesa cumplida!!';
            const error = 'ha habido un error!!';

            let aleatorio = Math.random()

            if (aleatorio < 0.5) {
                resolve(funciona)
            } else {
                reject(error)
            }
        }, 2000)
    })

    numeros
    .then((funciona) => console.log(funciona))
    .catch((error) => console.log(error))
    .finally(() => console.log('promesa finalizada!!'))


// ejemplo 

let myList = ['Rojo', 'Azul', 'Verde']

let addItem = (item, list) => {
    let add = new Promise(function (resolve, reject) {
        // promesa rechazada
        if (!list){
            reject('No existe el elemento')
        }
        // promesa cumplida
        setTimeout(() => {
            // tarea
            list.push(item);
            resolve(list)
        }, 2000)
    });
    return add;
};

// llamar a la funcion addItem
addItem('Amarillo', myList)
.then((myList) => {console.log(`mi nueva lista es: ${myList.join(', ')}`);}) // resolve // mi nueva lista es: Rojo, Azul, Verde, Amarillo
.catch((fallo) => {throw new Error(fallo)}) // reject




//! promise.all()
    // coge promesas y espera a que todas se cumplan y las ejecuta

    let promesa1 = Promise.resolve(1); // la promesa se resuelve y devuelve 1
    let promesa2 = Promise.resolve(2); // la promesa se resuelve y devuelve 2
    let promesa3 = Promise.resolve(3); // la promesa se resuelve y devuelve 3

    Promise.all([promesa1, promesa2, promesa3]) // [1, 2, 3] ---> devuelve el array
    .then((todoOk) => console.log(todoOk))