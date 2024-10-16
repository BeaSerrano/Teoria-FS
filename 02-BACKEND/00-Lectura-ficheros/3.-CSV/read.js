//!-----> 1) IMPORTACIONES

import csv from "csv-parser";
import { createReadStream } from "fs";

//! -----> 2) VAMOS A HACER UN OBJETO VARIO PARA METERLE LA INFO:
const dataStream = [];

//! -----> 3) FUNCION DE LECTURA DEL ARCHIVO

createReadStream("indicator.csv")
  .pipe(csv({ separator: ";" }))
  .on("data", (data) => dataStream.push(data))
  .on("end", () => printInfo(dataStream));

//! ------> 4) crear el printInfo que gestiona la info

const printInfo = (data) => {
  console.log(data);
};
