//! -- acceder a los elementos de html ---> siempre pide string

/* document.getElementById('titulo-principal') // accedo al id titulo-principal
document.getElementsByClassName('listItem') // acedo a todas las clases listItem
document.getElementsByTagName('p') // accedo a todas las etiquetas p */

//! -- acceder a los elementos de css ---> siempre pide string

/* document.querySelector('.lista > li') // accedo a todo el css con este selector
document.querySelectorAll('.lista > li, p') // accedo a los selectores .lista > li y p */

//! -- crear un elemento e insertarlo en html
/* let boton = document.createElement('button'); // crea el elemento <button></button>
boton.innerText = 'Soy un botón'; // <button>Soy un botón</button>
document.body.appendChild(boton); // inserta en el body del html <button>Soy un botón</button> */

//! -- eliminar un elemento
/* let eliminarTituloPrincipal = document.getElementById('titulo-principal'); // metido en la variable <h1 id="titulo-principal">hola mundo!</h1>
eliminarTituloPrincipal.parentNode.removeChild(eliminarTituloPrincipal); */

//! -- class
/* let parrafo = document.getElementById('titulo-secundario');
parrafo.classList.add('claseParrafo');
parrafo.classList.remove('claseParrafo'); */

//! -- css ---> sobre el primer elemento
/* let miLista = document.querySelector('.listItem'); // el primer li.listItem
miLista.style.fontSize = '30px';
miLista.style.backgroundColor = 'aqua';
miLista.style.color = 'red'; */

//! -- css ---> para todos los elementos
/* let miLista = document.querySelectorAll('.listItem');
miLista.forEach(item => {
  item.style.fontSize = '30px';
  item.style.backgroundColor = 'aqua';
  item.style.color = 'red';
}); */

//! -- añadir bloque html
/* let container2 = document.getElementById('container2');
container2.insertAdjacentHTML('afterend', '<div><p>hola insertado con js</p></div>') */
// beforebegin --> encima del container2
// afterbegin --> dentro del container2 como el primer elemento
// beforeend --> dentro del container2 como el ultimo elemento
// afterend --> debajo del container2

//! --  templates
/* let persona = 'Lisa';
let ciudad = 'Sprinfield';

let nuevoContenido = document.querySelector('#container2');
let nuevoHTML = `<ul>
  <li>nombre : ${persona}</li>
  <li>ciudad : ${ciudad}</li>
</ul>
`;
nuevoContenido.innerHTML = nuevoHTML; */

//!-- carga de recursos ---> DOMContentLoaded
/* function cargar() {
  // carga la estructura
  alert('tienes más de 18 años?')
  // nos dice el tamaño de la imagen pero no carga la imagen
  alert(`tamaño de imagen: ${miImagen.offsetWidth} x ${miImagen.offsetHeight}`)
}
document.addEventListener('DOMContentLoaded', cargar) */
// después de esto carga todo el contenido externo


//!-- carga de recursos ---> window.onload
/* window.onload = () => {
  // carga la estructura y después lanza el contenido de la función
  alert('tienes más de 18 años?')
} */

//! -- eventos

// onClick ---> onclick y funcion en uno
/* let botonClick = document.querySelector('button');
botonClick.onclick = function () {
  alert('hola de nuevo')
} */

// onclick + funcion + setAttribute
let boton2 = document.querySelector('button');
let saluda = () => {alert('hola de nuevo, qué pesada!')}
boton2.setAttribute('onclick','saluda()') // crea dentro del button html el atributo onClick con la funcion saluda