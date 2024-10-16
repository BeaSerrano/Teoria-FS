//! ------------- METODOS -------- /

//// map
// ejecuta una función dada en cada elemento de un array

let listaNumeros = [ 1, 2, 3, 4, 5, 6 ];

//* calcular el cuadrado de cada numero
let listaNumerosCuadrado = listaNumeros.map(
    function (elemento) {
        return elemento * elemento
    }
)
console.log(listaNumerosCuadrado); // [ 1, 4, 9, 16, 25, 36 ]

//* calcular el cuadrado de los números pares y si no sacamos el original

let listaCuadradosPares = listaNumeros.map(
    function (elemento) {
        if (elemento % 2 == 0) {
            return elemento * elemento
        } else {
            return elemento
        }
    }
)
console.log(listaCuadradosPares); // [ 1, 4, 3, 16, 5, 36 ]

//* igual que el anterior con condicional ternario

let ternarioCuadradosPares = listaNumeros.map(
    function (elemento) {
        return elemento % 2 == 0 // condicion
        ? elemento * elemento // true
        : elemento // false
    }
)
console.log(ternarioCuadradosPares); // [ 1, 4, 3, 16, 5, 36 ]

//* igual que el anterior con condicional ternario y funcion arrow

let ternarioArrow = listaNumeros.map(elemento => elemento % 2 == 0 ? elemento * elemento : elemento)
console.log(ternarioArrow); // [ 1, 4, 3, 16, 5, 36 ]


//// filter
// devuelve los elementos de un array que cumplen una condición

//* filtramos los pares de una lista
const numeros = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];

let pares = numeros.filter(e => e % 2 == 0)
console.log(pares); // [ 2, 4, 6, 8, 10 ]

//* filtramos las personas mayores de 30 años
const personas = [
    { nombre : 'Bea', edad : 18},
    { nombre : 'Richard', edad : 45},
    { nombre : 'Josiel', edad : 41},
    { nombre : 'Alexander', edad : 55},
]

let mayores = personas.filter(e => e.edad > 30)
console.log(mayores);
/* 
        [
            { nombre: 'Richard', edad: 45 },
            { nombre: 'Josiel', edad: 41 },
            { nombre: 'Alexander', edad: 55 }
        ] 
*/

//// filter + includes
//* filtra todas las palabras que incluyan la letra 's'

const palabras = [ 'casa', 'mesa', 'pozo', 'perro' ];

let conLetraS = palabras.filter(e => e.includes('s'))
console.log(conLetraS); // [ 'casa', 'mesa' ]


//// filter + map

const listaRopa = [
    {
        prenda : 'pantalón',
        precio : 60
    },
    {
        prenda : 'camiseta',
        precio : 15
    },
    {
        prenda : 'abrigo',
        precio : 100
    }
];

//* lista con los articulos que puedo comprar con 70€

let ropaPrecio = listaRopa.filter(e => e.precio <= 70);
console.log(ropaPrecio); 
/* 
    [
        { prenda: 'pantalón', precio: 60 }, 
        { prenda: 'camiseta', precio: 15 }
    ]
*/

//* los nombres de los articulos que me puedo comprar con 70€ --> pantalón y camiseta

let nombresRopaPrecio = listaRopa.filter(e => {
    return e.precio <= 70
}).map(e => {
    return e.prenda
})

console.log(nombresRopaPrecio); // [ 'pantalón', 'camiseta' ]

//* resultado anterior simplificado ( sin {} y sin return )

let nombresSimple = listaRopa.filter(e => e.precio <= 70).map(e => e.prenda);
console.log(nombresSimple); // [ 'pantalón', 'camiseta' ]


//// find
// devuelve el PRIMER elemento que cumple la condición que le pedimos

//* 1 . me devuelve el primer aticulo con nombre Bici
const articulos = [
    { nombre: 'Bici', precio: 300 },
    { nombre: 'Portátil', precio: 1500 },
    { nombre: 'Cámara', precio: 300 },
    { nombre: 'Cámara', precio: 30 },
    { nombre: 'Bici', precio: 150 },
    { nombre: 'Smartphone', precio: 100 },
]

let primerArticulo = articulos.find(
    function (articulo) {
        return articulo.nombre == 'Bici'
    }
)
console.log(primerArticulo); // { nombre: 'Bici', precio: 300 }

// mismo ejercicio con función arrow
let primerArticuloArrow = articulos.find(articulo => articulo.nombre == 'Cámara')


//* 2 . encontrar al perro de raza Chihuahua - con llamada a una función dentro de find

const perros = [
    {raza: 'Border Collie', color: 'blanco'},
    {raza: 'Chihuahua', color: 'marrón'},
    {raza: 'Beagle', color: 'tricolor'},
];

let razaChihuahua = perro => perro.raza === 'Chihuahua';
let razaBeagle = perro => perro.raza === 'Beagle';

let miPerroChihuahua = perros.find(perroFind => razaChihuahua(perroFind));
let miPerroBeagle = perros.find(perroFind => razaBeagle(perroFind))

console.log(miPerroChihuahua); // { raza: 'Chihuahua', color: 'marrón' }
console.log(miPerroBeagle); // { raza: 'Beagle', color: 'tricolor' }

//* 3 . De estos candidatos seleccionamos el primero que cumpla todos los criterios
// usad el objeto criteros para sacar las condiciones

const candidatos = [
    { nombre : 'Juan', experiencia : 17, edad : 65 },
    { nombre : 'María', experiencia : 3, edad : 24 },
    { nombre : 'Pedro', experiencia : 0, edad : 18 },
    { nombre : 'Ana', experiencia : 5, edad : 25 },
    { nombre : 'Vera', experiencia : 0, edad : 16 },
    { nombre : 'Vera', experiencia : 6, edad : 28 },
];

let criterios = {
    experienciaMinima : 3,
    edadMinima : 18,
    edadMaxima : 60
};

//! Opción 1 --> sin usar objeto criterios

let candidatoOk = candidatos.find(candidato => { 
    return candidato.experiencia >= 3 && candidato.edad >= 18 && candidato.edad <= 60
})
console.log(candidatoOk); // { nombre: 'María', experiencia: 3, edad: 24 }

//! Opción 2 --> usando objeto criterios --> THIS !!!
//? cuidado, no funciona con función arrow

/* Como primer argumento de find() hemos usado una función que tiene dentro las condiciones
concatenadas con el operador && (y). Como segundo argumento de find() hemos usado el objeto criterios
que nos da las condiciones que tiene que cumplir los candidatos. Dentro de la función de find()
accedo a ese objeto criterios mediante el operador this.propiedad */ 

let candidatosCriterios = candidatos.find(function (candidato) {
    return candidato.experiencia >= this.experienciaMinima && candidato.edad >= this.edadMinima && candidato.edad <= this.edadMaxima;
}, criterios)

console.log(candidatosCriterios); // { nombre: 'María', experiencia: 3, edad: 24 }


//// some + map + push + spread operator + condicional if else + condicional ternario
// comprueba si AL MENOS UN elemento del array cumple una condición

let carrito = [
    { id : 1, cantidad : 4 },
    { id : 2, cantidad : 2 },
    { id : 3, cantidad : 6 },
];

// el usuario quiere agregar un producto a su carrito
// antes de agregar el producto, quiere verificar si el producto ya está en el carrito
    // si SI está en el carrito ---> suma 1 a la cantidad que ya tenga ese producto
    // si NO está en el carrito ---> agrega el nuevo producto

// Este es el producto que quiero agregar, el producto con id 2
let productoId = 2;

// comprobar con some si está en el carrito
let verificarProducto = carrito.some(producto => producto.id === productoId); // true o false

// condicion sobre si está o no en el carrito
if (verificarProducto == true) {
    // si SI está en el carrito, buscamos el id del producto que queramos con un mapeo y sumamos 1
    carrito = carrito.map(cadaProducto => 
        cadaProducto.id === productoId 
        ? {...cadaProducto, cantidad : cadaProducto.cantidad + 1 } // copiamos con Spread Operator el carrito entero y modificabamos la propiedad cantidad
        : cadaProducto
    )
} else {
    // verificarProducto == false
    // si NO está en el carrito, añadimos el producto nuevo
    carrito.push({ id : productoId, cantidad : 1 })
}

console.log(carrito);

// si el productoId = 2, suma 1 la cantidad del producto con id 2
/*
    [
        { id: 1, cantidad: 4 },
        { id: 2, cantidad: 3 }, // como si estaba el id:2, se ha sumado 1 a la cantidad del mismo
        { id: 3, cantidad: 6 }
    ]
*/

// si el productoId = 5, daría este resultado
/*
    [
        { id: 1, cantidad: 4 },
        { id: 2, cantidad: 2 },
        { id: 3, cantidad: 6 },
        { id: 5, cantidad: 1 }
    ]
*/

//? Replicamos el if else sin operador ternario, con otro if else dentro

if (verificarProducto == false) {
    // agrego el producto nuevo al carrito
    carrito.push({ id: productoId, cantidad : 1})
} else {
    // verificarProducto == true
        // tengo que entrar en el carrito --> map
        // busco el id dentro del carrito que corresponda con el nuevo --> productoId
            // cuando encuentre el id de productoId --> modifica la cantidad + 1
            // cuando el id sea distinto a productoId --> lo deja como está
    carrito = carrito.map(producto => {
        if (producto.id === productoId) {
            // modifica la cantidad + 1
            return {...producto, cantidad : producto.cantidad + 1}
        } else {
            // lo deja como está
            return producto
        }
    })
}


//// bind() + this
// crea una función a partir de otra función que ya existe
// es un método que se aplica a una función
// la nueva función que se crea se puede usar en cualquier momento

// el this de dentro de la función saluda, hace referencia al objeto que usamos en el método bind

let persona = { 
    nombre : 'Laura',
    apellido : 'Gutierrez',
    hobby : 'leer'
};

let saludo = function () {
    console.log(`Hola, ni nombre es ${this.nombre} ${this.apellido} y me gusta ${this.hobby}`);
}.bind(persona)

saludo() // Hola, ni nombre es Laura Gutierrez y me gusta leer


//// call()
// se usa para llamar a una función y se le pasan argumentos que personalizan esa función: objeto y parámetro de la función
// este método se le aplica a la llamada de la función ---> nombreFuncion.call()

let persona2 = { nombre : 'Bea' };
let persona3 = { nombre : 'Jane' };

let saludo2 = function (miSaludo, miDespedida) {
    console.log(`${miSaludo}, me llamo ${this.nombre}, ${miDespedida}`);
}

// persona2 y persona3 son los objetos a los que hace referencia a this en la función
// 'Hola' y 'Hello' es el parámetro miSaludo de la función
// 'adiós' y 'bye' es el parámetro miDespedida de la función

//* primero se nombra el objeto al que hace referencia this!!! y luego los parámetros de la función
// en la llamada a la función aplico el método .call(objeto, parametro, parametro)

saludo2.call(persona2, 'Hola', 'adiós') // Hola, me llamo Bea, adiós
saludo2.call(persona3, 'Hello', 'bye') // Hello, me llamo Jane, bye


//// apply()
// funciona igual que call 
// en la llamada a función, los parámetros de la función van entre corchetes de array []

// usamos los objetos persona2 y persona3 y la función saludo2
// llamamos a función aplicando el método .apply()

saludo2.apply(persona2, ['Hola', 'adiós']) // Hola, me llamo Bea, adiós
saludo2.apply(persona3, ['Hello', 'bye']) // Hello, me llamo Jane, bye