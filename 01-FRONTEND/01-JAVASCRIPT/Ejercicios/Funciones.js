//* Iteración #2: Buscar la palabra más larga
/* Completa la función que tomando un array de strings como argumento devuelva el más largo, 
en caso de que dos strings tenga la misma longitud deberá devolver el primero. */

// Opción 1
const avengers = ['Hulk', 'Thor', 'IronMan', 'Captain A.', 'Spiderman', 'Captain M.'];

/* Para calcular el string más largo hacemos un reduce con los parámetros: 
acc (acumulador), valorActual y de valorInicial usamos un string vacío ''
El reduce devuelve una condición con la que comprobamos la longitud de las palabras
y guardamos en el acumulador la más larga y si no nos quedamos con el valor actual
*/ 
function findLongestWord(array) {
    return array.reduce((acc, valorActual) => {
        return valorActual.length > acc.length ? valorActual : acc;
    }, '');
} 

/* Acc empieza con el valor inicial que es ''
'Hulk' > '' = 'Hulk'
'Thor' > 'Hulk' = 'Hulk'
'IronMan' > 'Hulk' = 'IronMan'
'Captain A.' > 'IronMan' = 'Captain A.'
'Spiderman' > 'Captain A.' = 'Captain A.'
'Captain M.' > 'Captain A.' = 'Captain A.'
DEVUELVE 'Captain A.' */

console.log(findLongestWord(avengers)); //! Captain A.

// Opción 2

const avengers2 = ['Hulk', 'Thor', 'IronMan', 'Captain A.', 'Spiderman', 'Captain M.'];

function findLongestWord2(array) {
    let longestWord = ''; // creo un string vacio
    // uso un bucle for of para comprobar cada palabra (word) del array (avengers2)
    for (const word of array) {
        // con cada palabra hace lo siguiente:
        // si la longitud de "word" es mayor que la longitud de "longestWord"
        // entonces metes la palabra en "longestWord"
        if (word.length > longestWord.length) {
        longestWord = word;
        }
    }

    /* 'Hulk' > '' = true ---> longestWord = 'Hulk'
    'Thor' > 'Hulk' = false ---> longestWord = 'Hulk'
    'IronMan' > 'Hulk' = true ---> longestWord = 'IronMan' 
    Y así con todas las palabras del array 
    El resultado es Captain A. */

    // devuelve la palabra más larga que es la que hemos ido guardando en 'longestWord'
    return longestWord;
}

console.log(findLongestWord2(avengers2)); //! Captain A.


//* Iteración #3: Calcular la suma
/* Calcular una suma puede ser tan simple como iterar sobre un array y sumar cada uno de los elementos. */

const numbers = [1, 2, 3, 5, 45, 37, 58];

function sumNumbers(arr) {
    return arr.reduce((total, num) => total + num, 0);
}

console.log(sumNumbers(numbers)); //! 151


//* Iteración #4: Calcular el promedio
/* Calcular un promedio es una tarea extremadamente común.*/

const numbers2 = [12, 21, 38, 5, 45, 37, 6];

function promedio(e) {
    const sum = e.reduce((total, num) => total + num, 0);
    console.log(sum); //! 164
    
    const pro = sum / e.length; // calcular la media con .lengt para ver la longitud del array
    console.log(pro); //! 23.428571428571427
    
    return pro.toFixed(1); // redondear a un decimal
}  

console.log(promedio(numbers2)); //! 23.4


//* Iteración #5: Calcular promedio de strings y numbers
/* Crea una función que reciba por parámetro un array 
y cuando es un valor number lo sume y de lo contrario cuente la longitud del string y lo sume. */

const mix = [6, 1, 'Rayo', 1, 'vallecano', '10', 'upgrade', 8, 'hub'];

function sumaMix(array) {
    const total = array.reduce((acc, actual) => {
        if (typeof actual == 'number') {
            return acc + actual; // si es number se suma el actual al acc
        } else if (typeof actual == 'string') {
            return acc + actual.length; // si es string se suma la longitud del actual al acc
        } else {
            return acc;
        }
    }, 0);

    return total; // 41,  es el total de la suma de los number y las longitudes de los string

    // EXTRA --> Calcular la media del total entre el número de elementos
    
}

/* Si el valor inicial es 0 (acumulador) y el primer elemento del array (valorActual) es 6.
Lo que hace la condición primera del reduce es comprobar si 6 es tipo number.
Como es tipo number, hace la acción del if --> suma el acumulador y el valorActual --> 0 + 6
Ahora el acumulador es 6 y pasa al siguiente elemento del array. 

acc ahora es 6 y el valorActual es 1. 1 es number? Si, pues sumo acc + valorActual --> 6 + 1
Ahora el aculumador (acc) es 7. Pasa al siguiente elemento del array que es 'Rayo', que es un string.
'Rayo' es number? No. Pasa a la siguiente condición --> 'Rayo' es tipo string? Si. 
Entonces suma el acumulador, que es 7, y la longitud (.lenght) del valorActual que es 'Rayo'.
7 + 4 = el acumulador ahora es 11 ... Y así con todos los elementos del array 

El resultado final se guarda en la variable 'total' donde hemos hecho toda la lógica.
*/

console.log('SUMA MIX 🫱', sumaMix(mix)); //! 41




//* Promedio del ejercicio anterior

const mixedElements = [6, 1, 'Rayo', 1, 'vallecano', '10', 'upgrade', 8, 'hub'];

function averageWord(e) {
    const total = e.reduce((acc, item) => {
        if (typeof item === 'number') {
        return acc + item; // suma el numero
        } else if (typeof item === 'string') {
        return acc + item.length; // suma la longitud del string
        }
        return acc; // si no es number o string no hace nada, no suma nada
    }, 0);
    console.log(total); //! 41
    
    
    // calcular la media redondeando a dos decimales
    const totalElementos = e.filter(item => typeof item === 'number' || typeof item === 'string').length;
    console.log(totalElementos); //! 9 --> nunmero de munbers y string que hay
    
    return totalElementos ? (total / totalElementos).toFixed(2) : 0;
    //! devuelve 41 / 9
}

console.log(averageWord(mixedElements)); //! 4.56 --> da como resultado 4.6 pero tipo string

//* Iteración #6: Valores únicos
/* Crea una función que reciba por parámetro un array y compruebe si existen elementos duplicados, 
en caso que existan los elimina para retornar un array sin los elementos duplicados.  */

const duplicates = [
    'sushi',
    'pizza',
    'pizza',
    'burger',
    'potatoe',
    'pasta',
    'ice-cream',
    'pizza',
    'chicken',
    'onion rings',
    'pasta',
    'soda'
];

// creo la función con un parámetro --> e será igual a un array elegido en la llamada a la función
function removeDuplicates(e) {
    // creo un array vacío
    const unicos = [];
    // al array (e) le aplico un bucle forEach
    // item se refiere a cada elemento del array
    e.forEach(item => {
        // si el array NO (!) incluye el item por el que pasa el forEach, entonces meye el item en el array unicos
        if (!unicos.includes(item)) {
            unicos.push(item); // solo añade el elemento si no está ya en el array
        }
    })

    /* EXPLICACIÓN FOR EACH
    
    unicos = []
    1er elemento 'sushi' está incluido en unicos? No ---> lo pusheamos en unicos
    unicos = ['sushi']
    2 elemento 'pizza' está incluido en unicos? No ---> lo pusheamos en unicos
    unicos = ['sushi', 'pizza']
    3 elemento 'pizza' está incluido en unicos? Si ---> entonces no hacemos nada, pasa al siguiente elemento
    unicos = ['sushi', 'pizza']
    Y ASI CON TODOS LOS ELEMENTOS DEL ARRAY */

    // la función removeDuplicates devuelve el array unicos final, después de haber hecho todo el proceso del forEach
    return unicos;
}

console.log(removeDuplicates(duplicates)); //! imprime el array sin los duplicados

//si quiero usar ese array unicos el otro sitio, lo meto en una variable para poder usarlo
// en esa variable llamaremos a la función funcion(array)
const unicosFueraDeLaFuncion = removeDuplicates(duplicates);
console.log(unicosFueraDeLaFuncion);

/*
    [
        'sushi',   'pizza',
        'burger',  'potatoe',
        'pasta',   'ice-cream',
        'chicken', 'onion rings',
        'soda'
    ]
*/


// Poner todos los elementos del el nuevo array sin duplicados en mayúscula
const unicosMayus = unicosFueraDeLaFuncion.map((e) => {
    return e.toUpperCase();
})
console.log(unicosMayus);

/* 
        [
            'SUSHI',   'PIZZA',
            'BURGER',  'POTATOE',
            'PASTA',   'ICE-CREAM',
            'CHICKEN', 'ONION RINGS',
            'SODA'
        ]
*/


//* Iteración #7: Buscador de nombres
/* Crea una función que reciba por parámetro un array y otro parámetro que sea el valor que desea comprobar 
que si existe o no dentro de dicho array - comprueba si existe el elemento, en caso que existan 
nos devuelve un true y la posición de dicho elemento y si no existe nos devuelve un false. */

const nameFinder = [
    'Peter',
    'Steve',
    'Tony',
    'Natasha',
    'Clint',
    'Logan',
    'Xabier',
    'Bruce',
    'Peggy',
    'Jessica',
    'Marc'
];

// una función con dos parámetros -> uno va a ser el array (e) y otro los valores a comprobar (name)
function finderName(e, name) {
    // uso un bucle for para pasar por cada elemento del array
        // i = 0 ---> el bucle empieza en el primer elemento del array
        // i < e.length ---> recorre toda la longitud del array, repite el bucle tantas vecez como elementos tenga el array
        // i++ ---> va de uno en uno, no se salta ningún elemento
    for (let i = 0; i < e.length; i++) {
        // hace este condicional en cada elemento del array por el que ejecuta el bucle
        // e[i] === name ---> array[posicion] === name (name es el nombre que voy a buscar)
            // la condición el if dice ---> si en la posición que sea i en cada momento está el nombre que busco entonces...
                // { inArray: true, position: i } ---> devuelve un objeto que nos indica si el name está en el array y la posición que ocupa
                // si no está, devuelve { inArray: false } ---> un objeto que indica que no está en el array, es false
        if (e[i] === name) {
        // output ---> si está en el array
        return { inArray: true, position: i };
        }
    }
    // output ---> si no está en el array
    return { inArray: false };
}

console.log(finderName(nameFinder, 'Uma')); //! { inArray: false }
console.log(finderName(nameFinder, 'Marc')); //! { inArray: true, position: 10 }

// OTROS POSIBLES OUTPUT DEL CONDICIONAL

    // PARA TRUE --> return `La persona ${name} está en el array (${true}) en la posición ${i}`;
        //! La persona Uma no está en el array (false)
    // PARA FALSE ---> return `La persona ${name} no está en el array (${false})`;
        //! La persona Marc está en el array (true) en la posición 10



//* Iteration #8: Contador de repeticiones
/* Crea una función que nos devuelva el número de veces que se repite cada una 
de las palabras que conforma el array */

const counterWords = [
    'code',
    'repeat',
    'eat',
    'sleep',
    'code',
    'enjoy',
    'sleep',
    'code',
    'enjoy',
    'upgrade',
    'code'
];

// función con parámetro e que se refiere al array
function repeatCounter(e) {
    // creamos una variable contador que en inicio es un objeto
    const contador = {};
    console.log(contador); //! {}
    
    // con un bucle forEach que tiene dentro una función con un parñametro 'palabra' que se refiere a cada elemento del array
    e.forEach(palabra => {
        console.log(palabra); //! devuelve todas las palabras
        
        // usamos como clave cada palabra del array
        // tanto si está la palabra como si su valor es 0 (no está todavía en el objeto) se suma +1 a su valor
        // va creado un objeto cuyas claves son las palabras y el valor de cada uno es lo que se repite la palabra
            // queda así {palabra : numero}
        contador[palabra] = (contador[palabra] || 0) + 1; // suma el contador
    });

    // nos devuelve el objeto contador con todos los resultados que ha ido almacenando gracias al bucle
    return contador;
}

const palabrasRepetidas = repeatCounter(counterWords);
console.log(palabrasRepetidas);

// Esto es 'contador' que es lo que devulde la función después del return
/* 
        {
            code : 4,
            repeat : 1,
            eat : 1,
            sleep : 2,
            enjoy : 2,
            upgrade : 1,
        }
 */


// PROBAMOS OTRA VEZ ESTE EJERCICIO CON EL ARRAY DE LAS COMIDAS = duplicates (linea 161)

const duplicatesContador = repeatCounter(duplicates)
console.log(duplicatesContador);

// Esto es 'contador' que es lo que devulde la función después del return
/*
    {
        sushi: 1,
        pizza: 3,
        burger: 1,
        potatoe: 1,
        pasta: 2,
        'ice-cream': 1,
        chicken: 1,
        'onion rings': 1,
        soda: 1
    }
*/