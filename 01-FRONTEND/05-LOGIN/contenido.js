// nos devuelve el email guardado en el session storage
let userEmail = sessionStorage.getItem("email");

// nos devuelve el email guardado en el local storage
// let userEmail = localStorage.getItem("email");

// mostrar el email en el html
document.getElementById("userEmail").textContent = userEmail;

// setItem(clave) ---> almacena clave : valor ---> email : email@g.com
// getItem(clave) ---> devuelve el valor guardado ( si usamos value nos devuelve solo el valor)
// removeItem(clave) ---> elimina clave y valor
// clear() ---> borra todo
// hey(indice) ---> devuelve la clave del indice que le digamos