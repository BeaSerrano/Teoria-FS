//! -------- ARRAY ------- //
// colección de datos, lista ordenada de datos
// puede contener number, string, boolean, null, undefined, function, object
// los datos se separan con comas ,

//? Crear un array

// antigua
let formaAntigua = new Array(); // esto es un array vacío
console.log(formaAntigua); // []

// moderno
let formaModerna = []; // creamos un array directamente con dos corchetes
console.log(formaModerna); // []

//? Mezclar datos en un array
let coleccion = [
    "Manzana",
    2746,
    true,
    false,
    {
        clave : "valor",
        nombre : "María"
    },
    [
        "botella", 
        "vaso", 
        2
    ],
    function () {
        console.log("hola qué tal");
    }
];

console.log(coleccion[0]); // Manzana
console.log(coleccion[5]); // [ 'botella', 'vaso', 2 ]
console.log(coleccion[5][1]); // vaso
console.log(coleccion[4]); // { clave: 'valor', nombre: 'María' }
console.log(coleccion[4].nombre); // María
console.log(coleccion[6]); // [Function (anonymous)]
console.log(coleccion[6]()); // hola qué tal

console.log(coleccion.length); // 7 --> devuelve la longitud del array


//! --- Métodos de arrays --- /

//// push()
// añade elementos al final del array
// devuelve la nueva longitud del array
// modifica el array añadiendo elementos

let frutas = ['kiwi', 'granada'];
frutas.push('platano'); // 3 --> el método devuelve la nueva longitud del array
console.log(frutas); // [ 'kiwi', 'granada', 'platano' ] --> después del método añade el elemento al array

//// pop()
// elimina y devuelve el último elemento del array
// modifica el array

let coches = ['audi', 'volkswagen', 'seat'];
let ultimoCoche = coches.pop();
console.log(coches); // [ 'audi', 'volkswagen' ] --> elimina el último elemento del array
console.log(ultimoCoche); // seat --> devuelve ese elemento eliminado

//// unshift()
// añade elementos al inicio del array
// modifica el array
// devuelve la longitud del array modificado con el nuevo elemento

let comida = ['fruta', 'pastel', 'lentejas'];
console.log(comida.unshift('tortitas')); // 4
console.log(comida); // [ 'tortitas', 'fruta', 'pastel', 'lentejas' ]


//// shift()
// elimina y devuelve el primer elemento del array
// modifica el array

let automoviles = ['moto', 'bus', 'coche'];
console.log(automoviles.shift()); // moto
console.log(automoviles); // [ 'bus', 'coche' ]


//// slice()
// devuelve una copia de una parte del array
// no modifica el array original, hace una copia
// necesita dos parámetros --> inicio y fin
// el inicio se incluye en el nuevo array, el fin no se incluye

let ropa = ['camisa', 'calcetines', 'abrigo', 'zapatos', 'bolso'];
let menosRopa = ropa.slice(1,3);
console.log(ropa); // [ 'camisa', 'calcetines', 'abrigo', 'zapatos', 'bolso' ]
console.log(menosRopa); // [ 'calcetines', 'abrigo' ]


//// splice()
// elimina y/o añade elementos en el indice (index) que le indiquemos
// devuelve el/los elemento/s que elimina
// modifica el array original

/* necesita mínimo tres argumentos --> 
- índice del inicio --> 1, empieza a eliminar en el indice 1 del array
- número de elementos --> 1, elimina un elemento
- nuevo/s elemento/s --> añade esgrima y skate
*/

let deportes = ['baloncesto', 'futbol', 'tenis'];
let nuevosDeportes = deportes.splice(1, 1, 'esgrima', 'skate')
console.log(deportes); //  ['baloncesto', 'esgrima', 'skate', 'tenis' ]
console.log(nuevosDeportes); // [ 'futbol' ]

let paises = ['España', 'Portugal', 'Francia', 'Alemania', 'Polonia'];
let nuevosPaises = paises.splice(1, 0, 'EEUU');
console.log(paises); // [ 'España', 'EEUU', 'Portugal', 'Francia', 'Alemania', 'Polonia' ]
console.log(nuevosPaises); // [] --> devuelve un array vacio porque no le he dicho que elimina nada


//// concat()
// combina/une/concatena dos o más arrays en un nuevo array
// no modifica los arrays originales
// crea un nuevo array 

let a = [1, 2, 3];
let b = [4, 5, 6];
let c = [7, 8, 9];

let unirDos = a.concat(b); // [ 1, 2, 3, 4, 5, 6 ]
console.log(unirDos);

let unirTres = a.concat(b,c); // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
console.log(unirTres);


//// forEach()
// ejecuta una función que le damos, en cada elemento del array
// recorre todo el array y va aplicando en cada elemento la tarea que le digamos, uno a uno
// tiene como parámetro una función y ejecuta esa función en cada elemento del array

let colores = ['azul', 'morado', 'verde'];
let mayusTodos = colores.forEach(
    // necesita una callback --> función dentro de una función, en este caso dentro de un método forEach
    function (color) {
        console.log("Esto es color", color.toUpperCase());
    }
)
// Esto es color AZUL
// Esto es color MORADO
// Esto es color VERDE

let masUno = [10, 20, 30, 40, 50];
let sumaUno = masUno.forEach(
    function (masUno) {
        console.log("Resultado", masUno + 1);
    }
)

// Resultado 11
// Resultado 21
// Resultado 31
// Resultado 41
// Resultado 51


//// find()
// devuelve el PRIMER elemento que cumple la condición que le pedimos
// necesita una instrucción y una condición para encontrar qué elemento la cumple
// no modifica el array original, me da un resultado

let nums = [1, 5, 3, 4, 5, 6];
// encuentra el primer número par con el método find
// un número es par cuando se divide entre 2 y resto de la división = 0
let primerPar = nums.find(
    function (cadaNum) {
        // instrucción para ver si un número es par --> el resto de la división % tiene que ser === 0
        return cadaNum % 2 === 0;
    }
);
console.log(primerPar); // 4 --> es el primer par que se ha encontrado que cumple nuestra condición


//// every()
// comprueba si TODOS los elementos del array cumple una condición
// devuelve un dato boolean --> true o false
// no modifica el array original ya que solo lo comprueba y devuelve T o F
// si al menos un elemento no cumple la función, devuelve false

let pares = [2, 4, 5, 8, 10];
let todosPares = pares.every(
    function (pares) {
        return pares % 2 === 0;
    }
)
console.log(todosPares); // true --> todos los números del array son pares, todos cumplen nuestra condición

//// some()
// comprueba si AL MENOS UN elemento del array cumple una condición
// devuelve un dato boolean --> true o false
// no modifica el array original ya que solo lo comprueba y devuelve T o F

let numbers = [1, 2, 3, 4, 5];
let algunPar = numbers.some(
    function (cadaNumber) {
        return cadaNumber % 2 === 0;
    }
)
console.log(algunPar); // true ---> hay al menos un número par en este array


//// filter()
// crea un nuevo array, no modifica el array original
// devuelve el nuevo array con los elementos que cumplen una condición

let todos = [1, 2, 3, 4, 5, 6];
let todosImpares = todos.filter(
    function (todos) {
        return todos % 2 !== 0; // numeros que el resto de la división sea distinto de 0
    }
);
console.log(todosImpares); // [ 1, 3, 5 ] --> devuelve un nuevo array con los impares, cumplen
console.log(todos); // [ 1, 2, 3, 4, 5, 6 ] --> no modifica el array original


//// reduce()
// ejecuta una función acumuladora a un array, recorre todo el array
// reduce el array a un único valor
// necesita una función y un valor inicial ---> reduce(funcion(acumulador, valorActual), valorInicial)
// no modifica el array original, devuelve un resultado
// Generalmente ---> acumulador = acc, valorActual = value

// ejemplo, sumar todos los precios de un carrito
let precios = [10, 100, 200];
let totalPrecios = precios.reduce(
    // funcion
    function (acumulador, valorActual) {
        return acumulador + valorActual;
    }, 0 // valor inicial
)
console.log(precios); // [ 10, 100, 200 ]
console.log(totalPrecios); // 310 --> 10 + 100 + 200

/*
Recorre el array "precios" y como el valor incial es 0 empieza a contar desde ese número
Después realiza la función con cada elemento del array
0 + 10 --> lo guarda en el acumulador --> el valorActual ahora es 10
10 + 100 --> lo guarda en el acumulador --> el valorActual ahora es 110
110 + 200 --> lo guarda en el acumulador --> el valorActual ahora es 310
Termina de recorrer todo el array nos da el resultado del valorActual final que es 310
*/

//// Array.from()
// crea un array a partir de un dato
// puedo o no usar una función dentro de este método, puede tener más de un parámetro
// usamos la sintaxis Array.from(DATO) --> usamos el dato que queremos convertir en array como parámetro del método
// si usamos una función dentro --> Array.from(DATO, FUNCION())

//* ejemplo string
let saludo = "hola";

let saludoArray = Array.from(saludo);
console.log(saludoArray); // [ 'h', 'o', 'l', 'a' ]

let saludoMayus = Array.from(saludo, function (letras) {
    return letras.toUpperCase()
})
console.log(saludoMayus); // [ 'H', 'O', 'L', 'A' ]

//* ejemplo array
let original = [1, 2, 3, 4];
let copia = Array.from(original);
console.log(original); // [ 1, 2, 3, 4 ]
console.log(copia); // [ 1, 2, 3, 4 ]

// vamos a comparar si el array original es igual que la copia
// false --> porque aunque el contenido sea igual, no es lo mismo porque es una copia
console.log(original == copia); // false



//// map()
// crea un nuevo array y aplica una función a todos los elementos de otro array
// no modifica el array original

let numeros = [1, 2, 3, 4, 5];

// map con función normal
let dobles = numeros.map(function (numero) {
    return numero * 2;
});

// map con función arrow =>
let triples = numeros.map((numero) => numero * 3);

console.log(numeros); // [ 1, 2, 3, 4, 5 ] --> mantiene el original igual
console.log(dobles); // [ 2, 4, 6, 8, 10 ] --> todos multiplicados por 2
console.log(triples); // [ 3, 6, 9, 12, 15 ] --> todos por 3


// hacemos lo mismo con la función flecha (arrow =>)

    // función clásica
    let funNormal = function (numero) {
        return numero * 2;
    }

    // funcion arrow
    let funArrow = (numero) => numero * 2