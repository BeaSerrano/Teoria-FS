//! Programar tareas que se ejecutan en un futuro + controlando tiempos

    //! en tiempo real
    console.log('hola inmediato!!');


    //! setTimeout(funcion, tiempo)
        // tarea que se ejecuta una vez pasado el tiempo que le decimos
        // primer parámetro ---> la tarea que se ejecuta es una función
        // segundo parámetro ---> tiempo en milisegundos ( 3s = 3000ms)
        // ej ---> di hola una vez pasados 2 segundos

        setTimeout(() => {console.log('Hola pasados 2 segundos!');}, 2000)


    //! setInterval(funcion, tiempo)
        // tarea que se ejecuta cada cierto tiempo y se repite
        // primer parámetro ---> la tarea que se ejecuta es una función
        // segundo parámetro ---> tiempo en milisegundos ( 3s = 3000ms)
        // ej ---> di hola cada 3 segundos

        //setInterval(() => {console.log('hola cada 3 segundos');}, 3000)


        //! clearInterval ---> parar intervalo

        let contador = 0;
        
        function hazloTresVeces() {
            // cada cuanto se incrementa
            contador++;
            // ejecuta tarea
            console.log('Digo adios cada 3 segundos');

            if (contador === 3){
                clearInterval(miIntervalo)
            }
        }

        let miIntervalo = setInterval(hazloTresVeces, 3000)