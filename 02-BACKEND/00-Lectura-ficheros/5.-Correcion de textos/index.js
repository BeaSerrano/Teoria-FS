import fs from "fs";

//! ------> LEEMOS EL ARCHIVO
fs.readFile("ejemplo.txt", "utf-8", (error, data) => {
  error ? console.log(error) : correctData(data);
});

//! ------> creamos la funcion que corrige el texto leido

const correctData = (data) => {
  ///El carácter \D representa cualquier carácter que no sea un dígito.
  /// La  /g en la expresión regular significa que la búsqueda debe ser global, es decir, buscar en todo el texto en lugar de solo la primera coincidencia.
  /// paginas para aprender expresiones regulares
  // ------> https://regex101.com/
  // ------> https://regexr.com/

  /// el match te devuelve un array con las coincidencias
  /// join ---> lo convierte de nuevo a string
  let fixedData = data.match(/\D/g).join("");
  console.log("🚀 ~ file: index.js:20 ~ correctData ~ fixedData :", fixedData);

  writeText(fixedData);
};

const writeText = (data) => {
  fs.writeFile("correctText.txt", data, () => console.log("archivo escrito"));
};
