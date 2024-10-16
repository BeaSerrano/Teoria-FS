//! -------- OBJETOS ------- //

// colección no ordenada de datos
// cada elemento del objeto tiene una forma --> clave : valor // key : value
// la CLAVE es una cadena de texto (string), en JS no hace falta ponerle comillas
// el VALOR puede ser cualquier cosa (string, number, boolean, funcion, array, ...), cualquier tipo de dato
// las parejas de datos se separan con comas
// en resumen son parejas de datos, en el que uno es la clave de acceso al otro, al valor

// Crear objetos
let unObjetoVacio = {}; // vacío

let unObjeto = {
    nombre : "Jon",
    edad : 25,
    animal : 'lobo'
};

// nombre, edad, animal, stark --> son propiedades (claves) del objeto
// Jon, 25, lobo, true --> son los valores de esas propiedades, estos pueden cambiar

console.log(unObjeto.nombre); // Jon ⭐
console.log(unObjeto['edad']); // 25

// modificamos una propiedad
unObjeto.edad = 30;
console.log(unObjeto.edad); // 30
console.log(unObjeto); // { nombre: 'Jon', edad: 30, animal: 'lobo', stark: true }


// añadir una propiedad
unObjeto.familia = 'Stark'; // tiene que tener un valor asignado
console.log(unObjeto); // { nombre: 'Jon', edad: 30, animal: 'lobo', familia: 'Stark' }

// eliminar una propiedad
delete unObjeto.animal; 
console.log(unObjeto); // { nombre: 'Jon', edad: 30, familia: 'Stark' }



//// Propiedad vs Método
/* en JS, toda clave de un objeto que como valor lleva un primitivo (string, boolean, number)
se llama PROPIEDAD. Todas las claves que como valor llevan una función se llaman MÉTODOS.
Una función dentro de un objeto es un método

Función --> función suelta en el código
Método ---> función dentro de un objeto */

//* Crear un método --> crear una función en un objeto

let empresa = {
    nombre : 'Neoland', // propiedad
    sector : 23, // propiedad
    localizacion : 'Madrid', // propiedad
    // método
    pausaCafe : function () {
        console.log(`Es la hora del café 😀`);
    }
}

console.log(empresa.localizacion); // Madrid
console.log(empresa.pausaCafe); // [Function: pausaCafe] --> CUIDADO, necesitamos los () de función
console.log(empresa.pausaCafe()); // Es la hora del café 😀



//* Métodos y bucles con objetos

//// bucle for ... in
// recorre todas las propiedades del objeto y realiza una instrucción que le digamos
// necesita dos parámetros --> variable, objeto
// La variable da el nombre a cada propiedad --> key
// El objeto se refiere al objeto que queramos usar --> empresa
// Sintaxis del for ... in --> for (variable in objeto){instrucción}

for (let key in empresa) {
    // instrucción
    console.log("La clave " + key + ' tiene el valor: ' +  empresa[key]);
}
// Resultado:
    /* 
    La clave nombre tiene el valor: Neoland
    La clave sector tiene el valor: IT
    La clave localizacion tiene el valor: Madrid
    La clave pausaCafe tiene el valor: function () {console.log(`Es la hora del café 😀`);}
    */

//// método Object.keys(objeto)
// nos devuelve un array con todas las claves del objeto en forma de string

let clavesUno = Object.keys(empresa);
console.log(clavesUno); // [ 'nombre', 'sector', 'localizacion', 'pausaCafe' ]

//// método Object.value(objeto)
// nos devuelve un array con todos los valores del objeto en forma de su propio tipo de dato

let valoresUno = Object.values(empresa) 
console.log(valoresUno); // [ 'Neoland', 'IT', 'Madrid', [Function: pausaCafe] ]

//// método Object.entries(objeto)
// crea un array como una colección pareja clave : valor
// crea un array global y dentro otros arrays por cada pareja clave : valor que haya en el objeto
// devuelve un array de arrays

let entries = Object.entries(empresa);
console.log(entries);
/* 
    [
        [ 'nombre', 'Neoland' ],
        [ 'sector', 23 ],
        [ 'localizacion', 'Madrid' ],
        [ 'pausaCafe', [Function: pausaCafe] ]
    ] 
*/

//// método Object.fromEntries(array)
// crea un objeto a partir de un array

let arrayEmpresa = [
    ['nombre', 'Zara'], // 0
    ['online', true], // 1
    ['empleados', 23234234] // 2
]

let objetoEmpresa = Object.fromEntries(arrayEmpresa);
console.log(objetoEmpresa); // { nombre: 'Zara', online: true, empleados: 23234234 }




//? ---- COMPARAR OBJETOS ---- //
// los objetos son datos de tipo estructural, tienen una estructura dentro
// dos objetos nunca son iguales, incluso aunque tengan las mismas propiedades

//* Tenemos dos variables, dos objetos distintos con las mismas propiedades y valor

let peces = { nombre : 'banco'};
let dinero = { nombre : 'banco'};

console.log(peces == dinero); // false
console.log(peces === dinero); // false

//* Dos variables, un solo objeto

let peces2 = { nombre : 'banco'}; // { nombre: 'banco' }
let dinero2 = peces2; // { nombre: 'banco' } --> creamos dinero2 a partir del contenido de peces2

// dinero2 y peces2 apuntan al mimso objeto

console.log(peces2 == dinero2); // true
console.log(peces2 === dinero2); // true

peces2.nombre = 'mar';
console.log(peces2); // { nombre: 'mar' }
console.log(dinero2); // { nombre: 'mar' }

/* aquí no estamos creando una copia del objeto peces2, lo que hemos hecho ha sido
apuntar la variable peces2 a la variable dinero2, entonces si se modifica la principal (peces2)
se modifica a la que apunta (dinero2) por eso en las comparaciones( ==, ===) so dice true, que si son iguales
*/

//// spread operator {...objeto} --> copia de objeto
// sirve para hacer una copia de otro objeto
// el ordenador se lo toma como dos objetos distintos
// se pueden modificar por separado, es decir, si modifico la copia o el original no se modifica el otro
// no se modifican mutuamente, una vez hecho el spread operator son dos objetos distintos

const original = { 
    name : 'Bea', 
    apellido : 'Serrano' 
};

const copiaOriginal = {
    ...original
}

console.log(original); // { name: 'Bea', apellido: 'Serrano' }
console.log(copiaOriginal); // { name: 'Bea', apellido: 'Serrano' }

console.log(original == copiaOriginal); // false
console.log(original === copiaOriginal); // false

// Cambio del original --> no se modifica la copia
original.name = 'Noelia';
console.log(original); // { name: 'Noelia', apellido: 'Serrano' }
console.log(copiaOriginal); // { name: 'Bea', apellido: 'Serrano' }

// Cambio de la copia --> no se modifica el original
copiaOriginal.name = 'Noelia';
console.log(original); // { name: 'Bea', apellido: 'Serrano' }
console.log(copiaOriginal); // { name: 'Noelia', apellido: 'Serrano' }


// Crear copia y modificar propiedades a partir del original

const extra = {
    marca : 'Samsung',
    color : 'verde',
    age : 2024,
};

const extraCompleto = {
    ...extra,
    color : 'rojo',
}

console.log(extra); // { marca: 'Samsung', color: 'verde', age: 2024 }
console.log(extraCompleto); // { marca: 'Samsung', color: 'rojo', age: 2024 }



//// map() --> ejercicio array y objetos dentro
// crea un nuevo array con la instrucción que le digamos
// dentro de map usamos una función

const animales = [
    {
        name : 'cat',
        size : 'small'
    },
    {
        name : 'elephant',
        size : 'big'
    },
    {
        name : 'lion',
        size : 'medium'
    },
    {
        name : 'dog',
        size : 'small'
    }
];

console.log(animales); // un array de 5 objetos

const nombreAnimales = animales.map( animal => {
    return animal.name
});
console.log(nombreAnimales); // [ 'cat', 'elephant', 'lion', 'dog' ]

const frase = animales.map(elemento => `This animal is a ${elemento.name} and its size is ${elemento.size}`)
console.log(frase);
/* 
        [
            'This animal is a cat and its size is small',
            'This animal is a elephant and its size is big',
            'This animal is a lion and its size is medium',
            'This animal is a dog and its size is small'
        ] 
*/

//// this
// se usa para referirnos al mismo objeto donde estamos
// con this podemos acceder a las propiedades de un objeto dentro del mismo

let trabajador = {
    nombre : 'Bea Serrano',
    bootcamp : 'FullStack',
    localizacion : 'Online',
    pausaCafe : function () {
        console.log(`${this.nombre} es hora de un descanso 😆`);
    }
}

console.log(trabajador.pausaCafe()); // Bea Serrano es hora de un descanso 😆




//? --- Ejercicio --> Sacamos nombres y apellidos --> "soy nombre apellido"

const personajes = [
    {
        nombre : 'Jon',
        apellido : 'Snow'
    },
    {
        nombre : 'Luca',
        apellido : 'Modric'
    },
    {
        nombre : 'Lisa',
        apellido : 'Simpson'
    },
    {
        nombre : 'Fernando',
        apellido : 'Alonso'
    }
];

// ejercicio resuelto con función completa
const nombres = personajes.map(
    function (elemento) {
        return `Soy ${elemento.nombre} ${elemento.apellido}`
    }
);

// ejercicio resuelto con función arrow
const nombresArrow = personajes.map(
    elemento => `Soy ${elemento.nombre} ${elemento.apellido}`
);
console.log(nombresArrow);


//? Ejercicio --> acortar dias de la semana a 3 primeras letras

const dias = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo'
];

let diasCortos = dias.map( cadaDia => cadaDia.substring(0, 3))
console.log(diasCortos); // [ 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom' ]  