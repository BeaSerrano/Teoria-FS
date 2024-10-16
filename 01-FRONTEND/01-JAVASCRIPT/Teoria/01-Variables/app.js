//comentario de una sola linea

/* comentarios
en varias lineas
las que me de la gana
*/

//! comentario rojo
//? comentario azul
//* comentario verde fuerte
//TODO --- comentario naranja
//// comentario rosa

// console.log(algo) ---> se usa para imprimir algo en la consola
    // comprobar que estamos haciendo
    // comprobar errores
    // ver resultados

//? --------- VARIABLES ---------- //

/* SINTAXIS: keyword nombre = valor;
* keyword ---> let o const (o var pero esta en desuso)
* nombre ---> para declararla
* operador = ---> para inicializarla
* identificador ---> damos un valor a la variable
*/

// Declarar una variable ---> nombrarla, usar let o const
// Inicializar una variable ---> darle un valor

//! let

let variable1; // podemos reasignar diferentes valores a este tipo de variable
// let hay que declararla y no es necesario inicializarla
// solo declarada

variable1 = "hola mundo"; // inicializada
variable1 = "hola mundo esto es un curso de fullstack"; // reasignado un valor
variable1 = 753;

console.log(variable1);

let caja = "manzanas"; // declarar la variable e inicializarla en la misma linea
console.log(caja);

//! const

const variable2 = "hola soy Bea"; // es una variable constante y no se puede reasignar un valor
// const hay que inicializarla, hay que darle un valor cuando se declara la variable

console.log(variable2);


//! VARIABLES BIEN DECLARADAS

let camelCase; // MAS USADA
let PascalCase; // MAS USADA
let $nombre;
let _nombre;
let snake_case;
let SCREAMING_SNAKE_CASE;
let nombre1; 

// el nombre de la variable tiene que tener relacion con el valor que tiene
let frutas = ["manzana", "pera", "plátano"];

//! VARIABLES MAL DECLARADAS
// no numeros, no signos incompatibles, no espacios
// no declarar variables con palabras clave ---> variable, number, string, funcion, ...

/**
 * let nombre variable;
 * let #nombre;
 * let name%;
 * let 1name;
 */

//// ejemplo hoisting

let caja1; // variable declarada
console.log(caja1); // undefined ---> no se ha inicializado, no le hemos dado ningun valor
caja1 = 7346; // inicializada, le damos un valor de tipo number
console.log(caja1); // 7346 ---> el valor que le hemos dado a la variable en la linea 73