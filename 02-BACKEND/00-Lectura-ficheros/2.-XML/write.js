const { XMLBuilder } = require("fast-xml-parser");
const fs = require("fs");

/// ------- DOC: https://github.com/NaturalIntelligence/fast-xml-parser/blob/97713ad3ec709f4612118120ce3fde310eed60ec/docs/v4/3.XMLBuilder.md
// ----> Creamos el objeto que luego vamos a crear el XML  y escribirlo con fs
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

// -------> CREAMOS EL OBJETO CON LAS OPTIONS QUE EL XMLBUILDER NECESITA

let options = {
  ignoreAttributes: false,
  format: true,
  arrayNodeName: "alumno",
};

// --------> tenemos que instansciarnos a la libreria para crear una build

// instanciar === new

const builder = new XMLBuilder(options);
let output = builder.build(alumnos);
//console.log("🚀 ~ file: write.js:38 ~ output:", output);

// el output no tiene un elemento raiz por lo cual no se esta creado el XML correctamente

const alumnosROOT = {
  alumnosRootElement: {
    alumnos: [
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
    ],
  },
};

options = {
  ignoreAttributes: false,
  format: true,
};

const builRoot = new XMLBuilder(options);
output = builRoot.build(alumnosROOT);
console.log("🚀 ~ file: write.js:71 ~ output :", output);

fs.writeFile("rootXML.xml", output, () => {
  console.log("archivo escrito");
});
