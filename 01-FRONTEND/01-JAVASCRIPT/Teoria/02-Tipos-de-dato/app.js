//! -------- TIPOS DE DATOS ------ //

//? --- Primitivos / primitive ---> number, string, boolean, undefined, null
/*
no llevan una estructura propia dentro
inmutables
solo que llevan un valor
*/

let number = 5; // number

let string = "hola qué tal"; // cadena de texto o string
let string2 = 'hola otra vez'; // esto también es un string

let verdadero = true; // dato booleano true --> 1
let falso = false; // dato booleano false --> 0

let noDefinido = undefined; // la variable no tiene un valor definido, entonces es undefined

let vacio = null; // no hay nada dentro de esa variable


//? --- Estructurales / reference ---> array, object, function

/*
llevan una estructura propia dentro
nos permiten gestionar datos primitivos
pueden llevan más de un tipo de dato y valor
*/

// ARRAY ---> colección de datos separados por comas
let array = [
    "hola", 
    2334, 
    true, 
    false, 
    null, 
    {
        nombre: 'Bea',
        empresa: 'Neoland'
    },
    'otro texto'
]; 

// OBJECT ---> coleccion de datos en forma de clave:valor (key:value) tambien separados por comas
let objeto = {
    //clave : valor,
    nombre : "Bea",
    edad : 33,
    mascota : "Uma",
}; 

// FUNCIONES ---> es una accion que podemos reutilizar

let funcion = function nombre(parametro1, parametro2) {
    // instruccion ---> codigo que queramos
}


//! --------- STRING --------- //
// cadenas de texto
// comillas dobles "" o simples ''
// podemos encadenar o combinar dos o más string usando el operador +
// son "array like", se leen como una colección de letras, empieza a contar por el 0

let nombre = 'Uma';
let apellido = "Thurman";
let edad = 7;

let nombreCompleto = nombre + apellido; // UmaThurman

/* string interpolation ---> con comilla `` podemos encapsular variables con diferentes tipos de dato 
y formar frases con espacios y diferentes variables*/

let nombreCompletoEspacios = `Me llamo ${nombre} ${apellido} y tengo ${edad} años`;
// Me llamo Uma Thurman y tengo 7 años --> string

let texto = "Me llamo Uma Thurman y tengo 7 años";
console.log(texto.length); // 35 ---> es el numero de letras y espacios, de elementos, que tiene ese string
console.log(texto[0]); // M
console.log(texto[34]); // s


//! --------- TYPE OF() --------- //
// método que nos dice qué tipo de dato es lo que queramos saber

let forma = "redonda";
console.log(typeof forma); // string

let cantidad = 243;
console.log(typeof cantidad); // number

let mentira = false;
console.log(typeof mentira); // boolean

let frutas = ["manzana", "plátano", "granada"]; // object ---> Array []
console.log(typeof frutas);

let coche = {
    marca : "audi",
    modelo : "a4",
    puertas : 5,
    electrico : false,
}
console.log(typeof coche); // object ---> Object {clave : valor}

let hola = function () {
    console.log("hola");
}
console.log(typeof hola); // function

//! --------- USANDO OPERADOR + CON DATOS PRIMITIVOS --------- //
/* cuando usamos el operador + con number y string se hace una conversión del tipo de dato
se llama "type coertion" y da como resultado un string, funciona como una encadenacion de
cadenas de texto 

si sumamos dos o varios datos booleanos nos da como resultado la suma final, de 1 y 0,
y un tipo de dato number

si hay más de una operación y tenemos que calcular el resultado
el ordenador hace las operaciones una a una, va por pasos,
primero hace una y luego la siguiente y en la ultima nos da el resultado
*/

console.log(5 + 5); // 10 ---> number
console.log("hola" + "mundo"); // holamundo ---> string
console.log(2 + "hola"); // 2hola ---> string
console.log(2 + "2"); // 22 ---> string
console.log(true + false); // 1 ---> 1 + 0 = 1 ---> number

console.log(1 < 2 < 3); // true ---> boolean
// 1 < 2 = true ---> 1 < 3 = true

console.log(3 > 2 > 1); // false ---> boolean
// 3 > 2 = true ---> 1 > 1 = false

console.log(2 + 2 + "2"); // 2 + 2 = 4 --> "4 + "2" = "42" ---> string
// 2 + 2 = 4 y la sumando "2" ---> se convierte es string = "42"

console.log("2" + "2" - "2"); // 20
// "2" + "2" = "22"
// "22" - "2" = 20 --> number --> convierte 22 a number y el resta el siguiente 2
/* el operador - solo funciona con números, entonces la primera operación es 22 y le resta 2 como number
a pesar de ser los tres datos tipo string. Hace una conversión de datos de string a number cuando
se encuentra con un operador diferente al operador + */


//! --- Métodos para string --- /

//? toLowerCase() --> convertir a minúscula una cadena de texto
let mayuscula = "HOLA";
console.log(mayuscula.toLowerCase()); // "hola"

//? toUpperCase() --> convertir a mayúscula una cadena de texto
let minuscula = "adios";
console.log(minuscula.toUpperCase()); // "ADIOS"

//? includes() --> comprueba si un caracter o una palabra está incluido en un string
// devuelve un boolean --> true o false
const unaFrase = "Decidme una frase por favor";
console.log(unaFrase.includes("gracias")); // false
console.log(unaFrase.includes("favor")); // true

//? repeat() --> devuelve un nuevo string con el numero de copias que le indiquemos
const mascota = "perro";
console.log(mascota.repeat(3)); // perroperroperro

//? replace() --> reemplaza unos caracteres por otros
// solo cambia el primero que se encuentre igual
const nuevoCoche = "Audi A4";
console.log(nuevoCoche.replace("A4", "A3")); // Audi A3

//? replaceAll() --> reemplaza todos los iguales por lo que le indiquemos
// cambia todos los que se encuentre iguales
const cita = "Tres tristes tigres están tristes";
console.log(cita.replaceAll("tristes", "felices")); //Tres felices tigres están felices

//! --- Métodos para number --- /

//? toFixed() --> redondea en enteros o decimales según le indiquemos
let numero = 10.6739475465;
console.log(numero.toFixed()); // 11 --> devuelve el numero sin decimales redondeado, como es 10.6, devuelve 11
console.log(numero.toFixed(3)); // 10.674 ---> devuelve el numero con 3 decimales y lo redondea

//? parseInt() --> convierte un valor de tipo string a number
const precioString = "200";
console.log(typeof(parseInt(precioString))); // 200 --> number

//? toString() --> convierte un valor de tipo number a string
const precioNumber = 200;
console.log(typeof (precioNumber.toString())); // 200 --> string

//// NaN ---> Not a Number
// determina si el valor es de tipo numérico ya sea un tipo de dato number o no
// puede ser un valor número dentro de un string o de un boolean
// si detecta un número nos devuelve false, si no detecta un número nos devuelve true

console.log(isNaN("bootcamp")); // true --> es un string que no lleva un numero dentro
console.log(isNaN("32434")); // false --> es un string y lleva un numero dentro
console.log(isNaN(3434)); // false --> es un numero number
console.log(isNaN(false)); // false --> es un booleano pero tiene valor 0 que es un numero


// EJERCICIO ---> formar una frase con esas tres variables

let a = "Me llamo Pepito";
let b = "estudio veterinaria";
let c = "y tengo 20 años";

let frase = `${a} ${b} ${c}`; // Me llamo Pepito estudio veterinaria y tengo 20 años

console.log(frase);

// usamos `` para poder encapsular con ${variable} variables y unirlas


//// TEMPLATE STRING ----> crea strings
// usamos BACKTICKS ```

// una línea
const namePeople = 'Juan';
const age = 30;
const saludo = `Hola, me llamo ${namePeople} y tengo ${age} años`;

console.log(saludo); // Imprime "Hola, me llamo Juan y tengo 30 años"

// multilínea

const poema = `
A ti, mi amado,
que con tu sonrisa
llenas mi vida
de luz y alegría.
`;

console.log(typeof poema); // string
console.log(poema);

/* A ti, mi amado,
que con tu sonrisa
llenas mi vida
de luz y alegría. */

//// qué pasa si el poema lo creo con '' o "" en vez de con backticks ``
// no se puede saltar del línea creando un string con comillas "dobles" o 'simples'

// descomentar para ver que da error

/* 
    const poemaMal = '
    A ti, mi amado,
    que con tu sonrisa
    llenas mi vida
    de luz y alegría.
    '; 
*/

//// crear bloque de código HTML con template string ``

let html = `<ul>
	<li>name: ${namePeople}</li>
	<li>age: ${age}</li>
</ul>`;

console.log(html);
