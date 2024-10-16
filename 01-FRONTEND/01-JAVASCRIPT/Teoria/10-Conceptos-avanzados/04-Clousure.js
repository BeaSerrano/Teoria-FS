//! Clousure

    // acceder a una función y a las variables dentro de la propia función

    // permite modificar el valor de numero en cualquier parte del código
    // en la llamada a la función usa el valor más reciente

        /* let numero = 1;
        function contar() {
            console.log(numero);
        }
        contar() // 1
        numero = 2;
        contar() // 2 */

    // con clousure

        function conClousure() {
            let numero = 1;
            function contar() {
                console.log(numero);
            }
            contar()
            numero = 2
            contar()
        }
        conClousure()

