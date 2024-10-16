import { writeFile } from "fs";
//const fs = require("fs");

//! este es el objeto que vamos a transformar en un csv
const alumnos = [
  {
    name: "Rodri",
    age: "43",
    job: "dev",
  },
  {
    name: "Laura",
    age: "37",
    job: "libreria",
  },
  {
    name: "Antonio",
    age: "33",
    job: "dev",
  },
];

const convertCSV = (data) => {
  let csv = "";

  // vamos a sacarnos las keys para luego saber que cabeceras de tabla vamos a tener

  const headers = Object.keys(alumnos[0]);
  /// escribimos laas cabeceraas
  csv += headers.join(";") + "\n";

  // vamos a escribir la info correspondiente a las columnas en sus fila/*style*/`

  data.forEach((row) => {
    headers.forEach((header, index) => {
      if (index > 0) {
        csv += ";";
      }

      csv += row[header];
    });

    csv += "\n";
  });

  return csv;
};

const csvAlumnos = convertCSV(alumnos);

writeFile("alumnos.csv", csvAlumnos, () => {
  console.log("archivo escribo 🦾");
});
