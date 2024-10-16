/// --------------> fs ---> es una libreria que nos sirve para leeer y escribir ficheros
//! ---------> LEE Y ESCRIBE TEXTO PLANO

const fs = require("fs");
const movie = [];
fs.readFile("./src/data/movie.json", (error, data) => {
  error ? console.log(error) : movie.push(JSON.parse(data));
  /// ----------------->>>>>>>>>>> llamamos a una funcion que se encarga de gestionar la data
  printData();
});

const printData = () => {
  console.log(movie);
};
