//! -------------- BUCLES / LOOPS -------------- //
// es algo que se repite
// en javascript podemos usar bucles para controlar cómo y cuánto repetimos una acción

//// for
// i es la variable que funciona dentro del bucle, como los parámetros en las funciones
// inicialización del bucle ---> let i = 0 ---> donde inicia el registro
// condición ---> i <= 10 ---> ejecuta el código hasta el punto que queramos, en este caso ejecuta el código 10 veces
// iterador ---> i++ ---> indica cómo continúa el bucle después de cada registro ---> en este caso de uno en uno, se incrementa en 1

// Contamos de 0 a 10

for (let i = 0; i <= 10; i++) {
    console.log(i);
}
// 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10

// Con este bucle multiplicamos *2 los 10 primeros números empezando por el 0

for (let i = 0; i <= 10; i++) {
    console.log(i * 2);
}
// 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20

// Contar desde 10 hacía atrás, decremento en 1 (i--) y termina en 0

for (let i = 10; i >= 0; i--) {
    console.log(i);
}
// 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0


//* Ejercicio bucle for
// De una lista de números del 1 al 15
// si sacamos el 13 le decimos que da mala suerte
// si sacamos otro número le decimos que todo ok

let listaNumeros = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ];

for (let i = 0; i < listaNumeros.length; i++) {
    if (listaNumeros[i] === 13) {
        console.log(i, 'MALA SUERTE 💀');
    } else {
        console.log(i, 'OK 😀');
    }
}


//// while
// comprueba una condición y hace la acción hasta que no la cumple
// si es true --> sigue ejecutando el código hasta que sea false

/* let numero = 10;
while (numero <= 10) {
    console.log('Ejecuto el código porque cumplo la función'); //? bucle infinito
} */

//// do while
// hace algo mientras se cumpla una condición
// ejecuta la acción al menos una vez

/* do {
    console.log('Ejecuto el código porque cumplo la función'); //? bucle infinito
} while (numero <= 10); */

//* 'break' --> para el bucle
// break lo que hace es interrumpir la iteracción, la repetición, y sale del bucle

while (true) {
    let password = '12345'; // en la práctica esta password se le pediría al usuario
    if(password == '12345') break;
    console.log('contraseña incorrecta 🚫');
}

//* 'continue' --> salta la iteración y continúa el bucle
// ejemplo de contar hasta 10 saltando el 3 y el 7
// con la palabra clave 'continue' lo que hacemos es saltarnos la iteracción que cumpla la condición

for (let i = 0; i <= 10; i++) {
    if (i == 3 || i == 7) continue; // i es igual a 3 o igual a 7
    console.log(i); // 0, 1, 2, 4, 5, 6, 8, 9, 10
}


//// forEach
// ejecuta una función que le damos, en cada elemento del array
// recorre todo el array y va aplicando en cada elemento la tarea que le digamos, uno a uno
// tiene como parámetro una función (callback) y ejecuta esa función en cada elemento del array
// ES UN BUCLE USADO EN UN ARRAY

//* Ejercicio 1 --> imprimir en consola todos los alumnos

const listaAlumnos = ['Richard', 'Alexander', 'Joaquín'];

let nombresAlumnos = listaAlumnos.forEach(
    function (cadaElementoDelArray) {
        console.log(cadaElementoDelArray); // Richard, Alexander, Joaquín
    }
)

/* Cuando aplicamos un método/bucle forEach() a un array necesitamos ejecutar una función
dentro del forEach. Esa función es lo que se va a ejecutar en cada elemento del array por el que
pasa el bucle forEach. Entonces el parámetro de la función de dentro del forEach se refiere a cada
elemento del array que ese bucle forEach recorre.

El parámetro 'cadaElementoDelArray' puede llamarse como sea ya que solo se refiere a cada elemento del array
en el que se va a ejecutar la función del forEach. Digamos que ese parámetro es universal a todos los
elementos del array y se rellena con cada nombre de cada alumno */

//* Mismo ejercicio con función arrow

let nombresArrow = listaAlumnos.forEach(
    cadaElementoDelArray => console.log(cadaElementoDelArray) // Richard, Alexander, Joaquín
);


//// for of
// pasa o iteracciona por cada elemento de un objeto (array) y ejecuta la función que le digamos dentro del bucle
// necesita una variable let o const para referirse a cada elemento del array
// necesita que le indiquemos después del 'of' en qué objeto/array va a hacer esa acción

const numeros = [100, 200, 300];

for (let cadaElemento of numeros) {
    cadaElemento *= 2; // multiplica cada elemento del array x 2 y asigna el resultado
    console.log(cadaElemento); // imprime cada elemento del array con la operación anterior hecha
}

//// for in
// recorre todas las propiedades del objeto o indices del array y realiza una acción que le digamos
// necesita dos parámetros --> variable, objeto
// La variable da el nombre a cada propiedad del objeto
// El objeto se refiere al objeto que queramos usar para hacer el bucle

//* for in en array

const cosas = [
    'taza', // 0
    'nevera', // 1
    'mesa', // 2
    'armario', // 3
    'horno' // 4
];

for (const cosa in cosas) {
    console.log(`Algo de la cocina es ${cosa}`);
}

/* Algo de la cocina es 0
Algo de la cocina es 1
Algo de la cocina es 2
Algo de la cocina es 3
Algo de la cocina es 4 */

for (const cosa in cosas) {
    console.log(`Algo de la cocina es ${cosas[cosa]}`);
}

/* Algo de la cocina es taza
Algo de la cocina es nevera
Algo de la cocina es mesa
Algo de la cocina es armario
Algo de la cocina es horno */

/* for in en un array[] nos devuelve los índices de cada elemento del array [0, 1, 2, ...] 
Para acceder al contenido de cada elemento tenemos que usar o un método o sacarlo con array[contenido] 
Entonces la variable que usa for in en los arrays (aquí 'const cosa') se refiere a cada posición
del array hasta su fin, en orden */


//* for in en objeto

let personaje = {
    nombre : 'Lisa',
    apellido : 'Simpson',
    ciudad : 'Springfield',
    instrumento : 'Saxo'
}

for (const claves in personaje) {
    console.log(`Estas son las claves de personaje: ${claves}`);
}

/* Estas son las claves de personaje: nombre
Estas son las claves de personaje: apellido
Estas son las claves de personaje: ciudad
Estas son las claves de personaje: instrumento */

for (const claves in personaje) {
    console.log(`Estas son los valores de las claves de personaje: ${personaje[claves]}`);
}

/* Estas son los valores de las claves de personaje: Lisa
Estas son los valores de las claves de personaje: Simpson
Estas son los valores de las claves de personaje: Springfield
Estas son los valores de las claves de personaje: Saxo */

/* for in en objetos {} saca las claves/llaves/keys de ese objeto sobre el que hacemos el bucle
si queremos sacar los valores de esas claves tenemos que acceder a la clave y luego a los valores */