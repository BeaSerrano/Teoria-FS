//! -------------- CONDICIONALES -------------- //
// solo pasa una acción si cumple una condición
// comprueba si algo (condición) es true (hace la acción) o false (no la hace)

//? if
// si se cumple una condición pasa una acción y si no no hace nada

if (10 > 1) {
    console.log('Todo ok 👌');
} //* Todo ok 👌 , la condición es true

if (10 < 1) {
    console.log('Todo ok 👌');
} //* no imprime nada, no cumple la condición, la condición es false

// single line - una sola línea de código
if (10 > 1) console.log('Todo ok 👌');

        // ejercicio resuelto

        const number1 = 10;
        const number2 = 20;
        const number3 = 2;

        if ( number2 / number1 == 2) {
            console.log("number2 dividido entre number1 es igual a 2");
        }

        if (number1 !== number2) {
            console.log("number1 es estrictamente distinto a number2");
        }


//? if else
// si cumple una condición ejecuta una acción, si no la cumple ejecuta otra
// para todo lo que no sea true y no cumpla la condición (if) hay otra acción (else)

let numero = 20; // comprobar si un número es par o impar

if ( numero % 2 == 0 ){
    // si es true
    console.log('Par'); // como 200 es par, esta es la acción que se ejecuta
} else {
    // si es false
    console.log('Impar');
}


//? if else if ...
// ejecutamos una acción u otra dependiendo de cada condición
// usamos un else final para todas las opciones que no contemplemos antes
// podemos añadir todos los else if() que quedamos pero siempre terminando con un else
// si es true ejecuta la acción, si es false pasa al siguiente if
// si ningín if() es true, ejecuta el último else

let num = 201;

if (num < 100) {
    // si num es menor de 100
    console.log(num * 5);
} else if (num == 100 || num == 200) {
    // si num es igual a 100 o igual a 200
    console.log(num / 2);
} else {
    // cualquiera otra opción
    console.log(num * 2);
    // num no cumple ninguna de las dos primeras condicione y ejecuta el else, la ultima opción
}

//? switch
// comprobamos una variable que es la "key", switch no usa una condición si no que comprueba una variable
// case son las opciones que tenemos con acciones determinadas
// si se encuentra con un case true, ejecuta esa acción y con el break sale del switch
// si ningún case coincide con la variable, si ninguno es true, ejecuta la acción del default

//* Sintaxis de switch
        /* switch (key o variable a comprobar) {
            case value o valor de la variable:
                // accion
                break;

            default:
                // accion por defecto si no cumple ningun case
                break;
        } */

let color = 'azul';

switch (color) {
    case 'rojo':
        console.log('Este color es rojo 🔴'); // si es rojo
        break;
    
    case 'azul':
        console.log('Este color es azul 🔵'); // si es azul
        break;

    case 'verde':
        console.log('Este color es verde 🟢'); // si es verde
        break;

    default:
        console.log('No ha habido suerte con el color 💀'); // accion por defecto
        break;
}


//? try catch
/* lo que hace este condicional es que intenta ejecutar una acción 
y si no puede, por el motivo que sea, ejecuta el catch.
El catch normalmente se usa para capturar errores, cuando no se puede
llevar a cabo una acción entonces lanzamos un mensaje de error con el catch */

// probamos try catch sin declarar la variable "intento" para ver cómo captura el error con el catch y no ejecuta el try
try {
    // intenta una acción
    console.log(intento);
} catch {
    // si no puede hacer la acción del try,ejecuta la acción del catch
    console.log('ha habido un error');
}


//? ternario
//* Sintaxis ---> condicion ? true : false
// se da una condición seguido de un signo "?"
// si se cumple esa condición se ejecuta el primer bloque de código
// si no se cumple la condición se ejcuta el segundo bloque de código
// ambos bloques se separan con un signo ":", en el que el primer bloque es TRUE y el segundo FALSE

let nota = 1;

let calificacion = nota >= 5 ? console.log('Aprobado') : console.log('Suspenso');

/* Otra forma de escribirlo en bloque y no en línea

        nota >= 5 
        ? console.log('Aprobado') 
        : console.log('Suspenso')
*/

// Se pueden concatenar, unir varios ternarios con varias condiciones
let edad = 20;

let clasificarEdad =  edad < 13 
                    ? "Niño" : edad >= 13 && edad < 18 
                    ? "Adolescente" : "Adulto";

console.log(clasificarEdad);