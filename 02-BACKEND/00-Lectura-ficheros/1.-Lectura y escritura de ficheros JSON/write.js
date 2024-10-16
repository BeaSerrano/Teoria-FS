const fs = require("fs");

const movie = [
  {
    title: "Infinity pool",
    year: 2023,
    availables: false,
  },
  {
    title: "dora",
    year: 2020,
    availables: true,
  },
  {
    title: "Infinity world",
    year: 2019,
    availables: true,
  },
];

//todo ---------------------- REPASO DE ES6 ---------

/// --------> si queremos devolver objetos con formato custom tenemos que hacerlo con los metodos de es6 --> MAP
const dataUpdate = movie.map((pelicula, index) => {
  if (pelicula.year === 2023) {
    console.log("entro");
    return {
      ...pelicula,
      view: false,
    };
  } else {
    return {
      ...pelicula,
    };
  }
});
console.log("🚀 ~ file: write.js:35 ~ dataUpdate ~ dataUpdate:", dataUpdate);

const texto = "En un lugar de la mancha de cuyo .....";

//texto.forEach((letra, index) => console.log(letra)); //;---> MAP NI FOREACH NO PARA STRING

for (let letra of texto) console.log(letra);

//todo --------------> ESCRIBIR EL OBJETO EN UN ARCHIVO JSON

const stringMovie = JSON.stringify(dataUpdate);

fs.writeFile("movie.json", stringMovie, () => {
  console.log("archivo escrito 🔍👨‍⚖️👌");
});
