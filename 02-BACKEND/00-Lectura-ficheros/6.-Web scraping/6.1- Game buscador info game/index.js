import fs from "fs";
import inquirer from "inquirer";
import puppeteer from "puppeteer";

//! -------------> funcion que hace el scrapping

const scrapping = async (keyWord) => {
  const BASE_URL = "https://www.game.es/";

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
  });

  // vamos a abrir una pagina en el navegador

  const page = await browser.newPage();

  // una vez abierta la pagina hay que navegar hasta la url de BASE_URL
  await page.goto(BASE_URL);

  // esperamos un poco tiempo a que se cargen todos los elementos de la pagina
  await page.waitForTimeout(6000); /// ----> vamos ac esperar 6 segundos

  //! diferencia al anterior proyecto -----> vamos a utilizar el input para meterle la palabra que cogimos por la terminal

  await page.click("#searchinput");

  await page.type("#searchinput", keyWord);
  await page.keyboard.press("Enter");

  // vamos a hacer los scroll porque ya nos cargado los elementos que hemos buscado en el input
  // esperamos un poco tiempo a que se cargen todos los elementos de la pagina
  await page.waitForTimeout(6000); /// ----> vamos ac esperar 6 segundos

  // vamos a hacer varios scroll para cargar el mayor numero de elementos

  await page.evaluate(() => {
    const element = document.getElementById("l-footer");
    const y = element.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: y });
  });

  await page.waitForTimeout(6000);

  await page.evaluate(() => {
    const element = document.getElementById("l-footer");
    const y = element.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: y });
  });

  await page.waitForTimeout(6000);

  await page.evaluate(() => {
    const element = document.getElementById("l-footer");
    const y = element.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: y });
  });

  await page.waitForTimeout(6000);

  await page.evaluate(() => {
    const element = document.getElementById("l-footer");
    const y = element.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: y });
  });

  await page.waitForTimeout(6000);

  await page.evaluate(() => {
    const element = document.getElementById("l-footer");
    const y = element.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: y });
  });

  await page.waitForTimeout(6000);

  await page.evaluate(() => {
    const element = document.getElementById("l-footer");
    const y = element.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: y });
  });

  await page.waitForTimeout(6000);

  // vamos a decir que espere a que tengamos renderizado unos elementos concretos de la pagina

  await page.waitForSelector(".search-item");

  //! forma mas rapida de coger los elementos dde la pantalla en un objeto de js

  const gameProducts = await page.$$eval("div.search-item", (nodes) =>
    nodes.map((n) => ({
      title: n.querySelector("a.cm-txt")?.innerText,
      image: n.querySelector(".img-responsive")?.src,
      price: n.querySelector("div.buy--price")?.innerText,
      type: n.querySelector("span.cm-txt")?.innerText,
    }))
  );

  gameProducts.pop();
  console.log(
    "🚀 ~ file: index.js:103 ~ scrapping ~ gameProducts:",
    gameProducts
  );

  // --------------> convertirlo a string para poder crear un archivo con font-size:
  const gameString = JSON.stringify(gameProducts);

  fs.writeFile(
    `${keyWord.replace(" ", "").toLowerCase()}.json`,
    gameString,
    () => {
      console.log("archivo creado");
    }
  );

  await browser.close();
};

inquirer
  .prompt([
    {
      name: "busqueda",
      message: "Que quieres buscar",
    },
  ])
  .then((answers) => {
    let keyWord = answers.busqueda;
    scrapping(keyWord);
  });
