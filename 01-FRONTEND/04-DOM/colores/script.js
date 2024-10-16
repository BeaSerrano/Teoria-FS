// selección de elementos que vamos a usar
const boton = document.querySelector('button'); // <button id="boton">Cámbiame el color</button>
const color = document.getElementById('color'); // <p id="color">#EB4034</p>

// generar color aleatorio
    // digitos
    // color
    // bucle for con numeros aleatorios ---> 6 iteraciones porque hexadecimal son 6 digitos
        // funcion digitos aleatorios
        // añadir digitos a color
    // devuelve el color
// cambiar fondo de body y codigo de color del parrafo

function generarColor() {
    let digitos = '0123456789ABCDEF'; // 16
    let nuevoColor = '#'; // el inicio general del color

    for (let i = 0; i < 6; i++) {
        // funcion digitos aleatorios
        let aleatorios = Math.floor(Math.random() * 16); // aleatorio con random y redondeado con floor
        // añadir digitos a color
        nuevoColor += digitos[aleatorios];
    };
    return nuevoColor;
}

// crear un evento
boton.addEventListener('click', function () {
    let colorAleatorio = generarColor();
    document.body.style.backgroundColor = colorAleatorio;
    color.textContent = colorAleatorio;
})