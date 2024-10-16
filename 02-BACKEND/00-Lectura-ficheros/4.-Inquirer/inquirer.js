import { writeFile } from "fs";
import inquirer from "inquirer";

//todo-----> ejercicio vamos a hacer un package.json custom con lo que nos responda el usuario
let customJSON = {
  name: "",
  private: true,
  version: "",
  scripts: {
    dev: "vite",
    build: "vite build",
    preview: "vite preview",
  },
  dependencies: {
    react: "^18.2.0",
    "react-dom": "^18.2.0",
  },
  devDependencies: {
    "@types/react": "^18.0.27",
    "@types/react-dom": "^18.0.10",
    "@vitejs/plugin-react": "^3.1.0",
    vite: "^4.1.0",
  },
};

// vamos a empezar a preguntarle al user de la terminal que es lo que quiere

inquirer
  .prompt([
    {
      name: "name",
      message: "cual es el nombre de tu proyecto?",
      default: "react-proyect",
    },
    {
      name: "version",
      message: "Cual es la version de tu proyecto?",
      default: "0.0.1",
    },
    {
      type: "confirm",
      name: "router",
      message: "Quieres instalar el react-router-DOM?",
    },
    {
      type: "confirm",
      name: "eslint_prettier",
      message: "Quieres instalar eslint_prettier?",
    },
  ])
  .then((answers) => {
    customJSON = {
      ...customJSON,
      name: answers.name,
      version: answers.version,
      dependencies: answers.router
        ? { ...customJSON.dependencies, "react-router-dom": "^6.8.1" }
        : { ...customJSON.dependencies },

      devDependencies: answers.eslint_prettier
        ? {
            ...customJSON.devDependencies,
            eslint: "^8.34.0",
            "eslint-config-prettier": "^8.6.0",
            "eslint-plugin-import": "^2.27.5",
            "eslint-plugin-jsx-a11y": "^6.7.1",
            "eslint-plugin-prettier": "^4.2.1",
            "eslint-plugin-react": "^7.32.2",
            "eslint-plugin-simple-import-sort": "^10.0.0",
            "pre-commit": "^1.2.2",
            prettier: "^2.8.4",
          }
        : { ...customJSON.devDependencies },
      "pre-commit": answers.eslint_prettier ? "lint" : "",
    };

    console.log(customJSON);

    writeCustomJSON(customJSON);
  });

const writeCustomJSON = (data) => {
  /// tenemoos un objeto y para escribirlo con fs hay que convertirlo a strin
  const dataString = JSON.stringify(data);

  writeFile("custom-package.json", dataString, () => {
    console.log("se ha escrito el archivo 💌");
  });
};
