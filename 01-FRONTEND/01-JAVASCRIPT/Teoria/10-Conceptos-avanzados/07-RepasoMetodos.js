//! map()
// crea un array con el resultado de una instrucción a cada elemento

// ejemlo 1

let animals = [{
        name: 'gato',
        size: 'small',
    },
    {
        name: 'perro',
        size: 'small',
    },
    {
        name: 'leon',
        size: 'medium',
    },
    {
        name: 'elefante',
        size: 'big',
    },
]

// declaro variable animalsName
// aplico map() a array animals
// creo una función callback en map(funcion) ---> se ejecuta en cada elemento del array

/* let animalsName = animals.map(
    function names(animal) {
        return animal.name
    }
)
console.log(animalsName); // [ 'gato', 'perro', 'leon', 'elefante' ] */

// arrow

let animalsArrow = animals.map(animal => animal.name)
console.log(animalsArrow); // [ 'gato', 'perro', 'leon', 'elefante' ]


// ejemlo 2 ---> las tres primeras letras de los dias

let dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

let diasMayus = dias.map(dia => dia.toUpperCase()) // dias en mayúscula
let diasCortos = dias.map(dia => dia.substring(0, 3).toUpperCase()) // lun, mar, mier, jue, vie, sab, dom
console.log(diasCortos);

// ejemplo 3 ---> calcular cuadrado de los números pares y si no son pares que se queden como estan

let numeros = [2, 15, 4, 5, 6, 8, 10];

let cuadradoPares = numeros.map(num => {
    if (num % 2 == 0) {
        return num * num
    } else {
        return num
    }
})
console.log(cuadradoPares); //4, 15, 16, 5, 36, 64, 100


//! filter()
// devuelve los elementos que cumplen una condición

// ejemplo 1

let numeros2 = [2, 15, 4, 5, 6, 8, 10];
let pares = numeros2.filter(num => num % 2 == 0) // [ 2, 4, 6, 8, 10 ]

let numerosYletras = [2, 'hola', 4, 'que tal', 6, 8, 10, true];
let cadenas = numerosYletras.filter(el => typeof el === 'string') // [ 'hola', 'que tal' ]

// ejemplo 2 ---> personas a partir de 30

let personas = [{
        nombre: 'pedro',
        edad: 15
    },
    {
        nombre: 'ana',
        edad: 35
    },
    {
        nombre: 'luis',
        edad: 60
    },
    {
        nombre: 'eva',
        edad: 30
    },
]

let mayores = personas.filter(el => el.edad >= 30)
console.log(mayores);

// ejemplo 3 ---> palabras que incluyan la letra o

let palabras = ['perro', 'silla', 'sarten', 'caballo'];

let letraO = palabras.filter(el => el.includes('o'))
console.log(letraO);

// ejemlo 4 ---> los que tengan la edad apuntada

let personas2 = [{
        nombre: 'pedro',
        edad: 15
    },
    {
        nombre: 'ana',
        edad: 35
    },
    {
        nombre: 'luis'
    },
    {
        nombre: 'eva',
        edad: 30
    },
]

let conEdad = personas2.filter(el => el.hasOwnProperty('edad'))
console.log(conEdad);

//! filter() & map()

let productos = [{
        producto: 'silla',
        precio: 30,
        color: 'marron'
    },
    {
        producto: 'sofa',
        precio: 700,
        color: 'gris'
    },
    {
        producto: 'mesa',
        precio: 100,
        color: 'marron'
    },
]

// producto que me puedo permitir con 150€

let productoHasta = productos.filter(el => el.precio <= 150) // [{ producto: 'silla', precio: 30, color: 'marron' }, { producto: 'mesa', precio: 100, color: 'marron' }]
console.log(productoHasta);

let nombreProducto = productos.filter(el => el.precio <= 150).map(el => el.producto) // silla, mesa
// toma el array productos
// se aplica un filtro de precio <= 150
// devuelve el array con ese filtro ---> [{ producto: 'silla', precio: 30, color: 'marron' }, { producto: 'mesa', precio: 100, color: 'marron' }]
// mapea y devuelve la propiedad producto de cada objeto ---> ['silla', 'mesa']
console.log(nombreProducto);


//! find()
    // devuelve el primer dato que encuentra que cumple la condición

    // ejemplo 1

    let articulos = [
        {nombre : 'bici', precio : 300},
        {nombre : 'tv', precio : 700},
        {nombre : 'libro', precio : 20},
        {nombre : 'libro', precio : 27},
        {nombre : 'teléfono', precio : 300},
        {nombre : 'ordenador', precio : 1500},
        {nombre : 'auriculares', precio : 100},
    ]

    let encuentraArticulo = articulos.find(el => el.nombre == 'libro') // { nombre: 'libro', precio: 300 }
    console.log(encuentraArticulo);


    // ejemplo 2

    let candidatos = [
        {nombre : 'ana', experiencia : 5, edad : 35},
        {nombre : 'luis', experiencia : 15, edad : 55},
        {nombre : 'aaron', experiencia : 12, edad : 40},
        {nombre : 'maria', experiencia : 0, edad : 16},
    ]

    let requisitos = {
        experienciaMinima : 3,
        edadMinima : 18,
        edadMaxima : 50,
    }

    let candidatoAceptado = candidatos.find(function (candidato) {
        return candidato.experiencia >= this.experienciaMinima && candidato.edad >= this.edadMinima && candidato.edad <= this.edadMaxima
    }, requisitos)

    console.log(candidatoAceptado); // { nombre: 'ana', experiencia: 5, edad: 35 }


    //! some()
        // comprueba si al menos un dato es true

        // ejemplo 1

        let listaNumeros = [1, 5, 18, 15];

        let algunNumero = listaNumeros.some(numero => numero > 10)
        console.log(algunNumero);


        // ejemplo 2

        let carrito = [
            {nombre: 'cereales', cantidad: 1},
            {nombre: 'manzanas', cantidad: 2},
            {nombre: 'garbanzos', cantidad: 5},
        ];
        
        let producto = 'cereales'; // si está ---> se suma 1
        //let producto = 'churros' // no esá ---> se añade producto nuevo
        
        let comprobar = carrito.some(el => el.nombre === producto); // antes de agregarlo ---> verificar si ya lo tengo en el carrito // comprobar = true
        
        if (comprobar) {
            // suma 1 a la cantidad, se añade al carrito 1
            carrito = carrito.map(el =>
                el.nombre === producto
                    ? {...el, cantidad: el.cantidad + 1}
                    : el
            );
        } else {
            // si no está, añade un nuevo producto
            carrito.push({nombre: producto, cantidad: 1});
        }
        
        console.log(carrito);
        

//! reduce()
    // reduce a un dato los elementos de una lista

    // ejemplo 1

    let nums = [10, 20, 30, 100] // 160
    let numsSuma = nums.reduce(function (acumulador, valorActual) {
        return acumulador + valorActual;
    }, 0); 
    console.log(numsSuma); // 160

    // ejemplo 2

    let carrito2 = [
        {producto: 'cereales', precio: 100},
        {producto: 'manzanas', precio: 100},
        {producto: 'garbanzos', precio: 100},
    ];

    // sumar el total de los precios del carrito
    let total = carrito2.reduce(function (suma, productoNuevo) {
        return suma + productoNuevo.precio
    }, 0)

    console.log(total); // 100 + 100 + 100 = 300€
