//! -------------- FUNCIONES -------------- //
// son bloques de código que se puede utilizar varias veces
// al crear una función eliminamos la necesidad de repetir ese código cada vez que se necesite
// reutilizamos ese mismo bloque de código llamando a esa función --> nombreFuncion()
// declaramos una función con la keyword 'function'
// hace nuestro código más modular
// IMPORTANTE --> la palabra RETURN, la función hace lo que sea y devuelve algo después de return, siempre es la última línea
// EXTRA --> una función dentro de una función es una 'callback'

//? Declarar una función

function saluda() {
    // instruccion
    return console.log('hola');
}
saluda() // llamada a la función --> hola


//? Parámetros formales (actuales)
// los parámetros van dentro de los paréntesis de la función
// la función puede tener cero, uno, dos o más parámetros
/* los parámetros de la función son como variables dentro de la propieda función, no son nada fuera de esta
solo funcionan dentro de los corchetes --> fuera de la función usamos datos para 'rellenar el hueco' de 
esos parámetros --> Esos parámetros se usan en la llamada a la función : nombreFuncion(parametros) */

function despedida(persona) {
    return `Adiós ${persona}`
}

console.log(despedida('Bea')); // Adiós Bea
console.log(despedida("Noelia")); // Adiós Noelia
console.log(despedida('Javi')); // Adiós Javi

/** En la función despedida 'persona es el parámetro formal y 'Bea', 'Noelia' y 'Javi son los
 * parámetros actuales, son los que se definen fuera de la función
 */

//? Usando más de un parámetro

function presentacion(persona, edad, ciudad) {
    return `Hola soy ${persona}, tengo ${edad} años y soy de ${ciudad}`
}

console.log(presentacion('Bea', 34, 'Badajoz')); // Hola soy Bea, tengo 34 años y soy de Badajoz
console.log(presentacion('Noelia', 35, 'Madrid')); // Hola soy Noelia, tengo 35 años y soy de Madrid


//? Parámetros opcionales
// los parámetros opcionales es necesario definirlos dentro de la función
// no hace falta definirlos en la llamada a la función porque se definen dentro al crearlo

function alumnos(alguien, opcional='alumno') {
    return `Hola, soy ${alguien} y soy un ${opcional}`
}
console.log(alumnos('Laura')); // Hola, soy Laura y soy un alumno

/* la diferencia entre un parámetro formal/actual y uno opcional es que 
el parámetro formal/actual es dinámico, cambia 
y el parámetro opcional está definido dentro de la función */


//? Calculo área rectángulo

function areaRectangulo(base, altura) {
    return `el área de este rectángulo es ${base * altura}`
}
console.log(areaRectangulo(5, 3)); // el área de este rectángulo es 15


//// 3 FORMAS DE DECLARAR FUNCIONES EN JAVASCRIPT

//? Function declaration
// la que viene por defecto en VSC
// no está dentro de ninguna variable

    function area1(lado) {
        return `${lado ** 2}`
    }
    area1(5); // 25


//? Function expression
// la función está dentro de una variable
// por lo tanto no necesitamos nombrarla
// podemos llamar a la función con el nombre de la variable que la contiene

    const area2 = function (lado) {
        return `${lado ** 2}`
    }
    area2(10) // 100


//? Function arrow
// simplifica las dos primeras formas de declarar una función
// no necesita palabra clave 'function'
// no necesita corchetes {} ni return --> se reemplazar por la flecha =>

    //* parametro => instrucción
    //* ( parametro1, parametro2 ) => instruccion

    // función arrow con un parámetro --> no hace falta los paréntesis
    const area3 = lado => `${lado ** 2}`
    area3(2); // 4

    // función arrow con más de un parámetro --> si hacen falta los paréntesis ()
    const area4 = (base, altura) => `${base * altura}`
    area4(5, 6); // 30


//// EJERCICIOS

// 1 . Escribir una función que me diga si un número es par o impar en consola

function parImpar(numero) {
    if (numero % 2 === 0) {
        console.log(`el número ${numero} es par`);
    } else {
        console.log(`el número ${numero} es impar`);
    }
    return console.log('bien hecho');
};
parImpar(12); // el número 12 es par - bien hecho
parImpar(5); // el número 5 es impar - bien hecho


/* 2 . Crea una función que tenga dos parámetros: 
uno representa la calidad del servicio y otro el coste total del servicio.
La función devuelve una propina según la calidad
---> 'fatal' = devuelve un 5% de propina
---> 'ok' = devuelve un 15% de propina
---> 'bueno' = devuelve un 20% de propina
---> 'excelente' = devuelve un 30% de propina
---> Si no hay calificación se devuelve 8% propina por defecto
*/

function calculadoraPropina(calidad, coste) {
    if ( calidad == 'fatal' ) {
        console.log(coste * 0.05);
    } else if ( calidad == 'ok') {
        console.log(coste * 0.15);
    } else if ( calidad == 'bueno') {
        console.log(coste * 0.20);
    } else if ( calidad == 'excelente') {
        console.log(coste * 0.30);
    } else {
        console.log(coste * 0.08);
    }
}

calculadoraPropina('fatal', 100); // 5 de propina
calculadoraPropina('horroso', 100); // 8 de propina

// Mismo ejercicio con condicional switch

let calidad = 'ok';
let coste = 50;

switch (calidad) {
    case 'fatal':
        console.log(coste * 0.05);
        break;
    
    case 'ok':
        console.log(coste * 0.15); // esta es la opción correcta --> 7.5
        break;

    case 'bueno':
        console.log(coste * 0.20);
        break;
    
    case 'excelente':
        console.log(coste * 0.30);
        break;

    default:
        console.log(coste * 0.08);
        break;
}

// Mismo ejercicio con condicional ternario - mismas variables lineas 152 y 153

calidad == 'fatal' 
? console.log(coste * 0.05) 
: calidad == 'ok'
? console.log(coste * 0.15) // 7.5
: calidad == 'bueno'
? console.log(coste * 0.20)
: calidad == 'excelente'
? console.log(coste * 0.30)
: console.log(coste * 0.08)