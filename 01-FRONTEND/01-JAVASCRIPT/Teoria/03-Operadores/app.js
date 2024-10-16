//! --------- OPERADORES --------- //

//? --- Operador de asignación =
// sirve para asignar o reasignar un valor a una variable

let nombre = 'Laura';
nombre = nombre + ' alumna';
nombre = 'Uma Thurman'
console.log(nombre);

//? --- Operador aritméticos + - * / %
// JS acepta números enteros, decimales y negativos

let n = 10;

console.log(n + 2); // 12 ---> suma
console.log(n - 12); // -2 ---> resta
console.log(n * 5); // 50 ---> multiplicación
console.log(n / 2); // 5 ---> división
console.log(n / 3); // 3.3333333333333335 ---> división
console.log(n % 3); // 1 ---> resto de la división
console.log(n % 2); // 0 ---> resto de la división

//* se pueden mezclar los operadores aritméticos con el operador de asignación
// +=   -=   *=   /=   %=

n += 3; // esto es lo mismo que hacer ---> n = n + 3
console.log(n); // 13


//? --- Operadores de comparación == === < >
//* nos da como resultado un dato booleano ---> true o false
/* 
== ---> compara el valor de dos datos y nos dice si tienen el mismo valor
=== ---> compara el valor y el tipo de dato y nos dice si tienen el mismo valor y si son del mismo tipo
< ---> comprueba si un dato es menor que otro
> ---> comprueba si un dato es mayor que otro
*/

let x = 2;
let y = "2";
let z = 1;

console.log(x == y); // true --> mismo valor, distinto tipo de dato
console.log(x == z); // false
console.log(y < z); // false
console.log(x === y); // false --> no tienen el mismo tipo de dato, si el mismo valor
console.log(true == false); // false --> no tiene el mismo valor
console.log(true === false); // false --> no tiene el mismo valor, si mismo tipo de dato
console.log(true == 1); // true ---> mismo valor, los dos son 1
console.log(true === 1); // false ---> uno es boolean y otro number, aunque tengan el mismo valor 1



//* este operador "!" es NOT, niega algo ---> sustituimos un = por la negación !
// != --> distinto valor 
// !== --> distinto tipo de dato y/o valor

console.log(x != y); // false --> x es distinto de y? NO --> valor
console.log(x !== y); // true --> mismo valor y distinto tipo
console.log(x !== z); // true --> mismo tipo y distinto valor

!true // false
!false // true 


//? -------- Otros operadores ---- //

//! ------ OR || ---> devuelve true cuando uno de los valores que comparamos es true
// un valor de todos los que se comparen tiene que ser true

let efectivo = true; // tengo efectivo
let tarjeta = false; // no tengo tarjeta
let pagar = efectivo || tarjeta; // puedes pagar si tienes efectivo O tarjeta
console.log(pagar);
/* devuelve TRUE porque uno de los valores es true, tengo efectivo 
con lo cual puedo pagar aunque no tenga tarjeta */

//! ------ AND && ---> devuelve true si todos los valores que compara son true
// si uno de los valores es false, devuelve false

let coche = false;
let carnetConducir = true;
let puedoConducir = coche && carnetConducir; // solo si las dos son true podré conducir
console.log(puedoConducir); // false, porque no tengo coche aunque si tengo carnetConducir


//? ------ operador de agrupación ()
// controla el orden de las operaciones poniendo por delante la que va entre paréntesis ()
console.log(2 + 3 * 5); // primero hace la multiplicacion y luego la suma ---> 17
console.log((2 + 3) * 5); // agrupo la suma y la hace primero y multiplica el resultado por 5




// EXTRA

console.log(1 == 1); // valor ---> true
console.log(1 === 1); // valor y tipo ---> true
console.log(1 == "1"); // valor ---> true
console.log(1 === "1"); // valor y tipo ---> false

console.log(1 != 1); // distinto valor ---> false
console.log(1 != 2); // distinto valor ---> true
console.log(1 !== 1); // distinto valor y tipo ---> false
console.log(1 !== "1"); // distinto valor y tipo ---> true