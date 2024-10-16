import fs from "fs";
import puppeteer from "puppeteer";

//! --------------- funcion que se encarga del scrapping web

const scrapping = async () => {
  const BASE_URL = "https://www.game.es/buscar/pokemon";

  // CREAR EL BROWSER --- el navegador maximizado

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

  // vamos a guardar los elementos de la pantalla en objetos de javascript
  const title = await page.$$eval("a.cm-txt", (nodes) =>
    nodes.map((n) => n.innerText)
  );

  const images = await page.$$eval(".img-responsive", (nodes) =>
    nodes.map((n) => n.src)
  );

  const prices = await page.$$eval("div.buy--price", (nodes) =>
    nodes.map((n) => n.innerText)
  );

  /// vamos a hacer un objeto completo con esta informacion

  const gameProducts = title.map((item, index) => ({
    title: title[index],
    image: images[index],
    price: prices[index],
  }));

  // -----------> practicamente siempre en este scrapping la ultima posicion del array queda vacia
  gameProducts.pop();
  console.log(
    "🚀 ~ file: index.js:104 ~ scrapping ~ gameProducts:",
    gameProducts
  );

  /// ------>  VAMOS A CREAR UN ARCHIVO CON LA INFO

  const stringGames = JSON.stringify(gameProducts);

  fs.writeFileSync("pokemon.json", stringGames, () => {
    console.log("archivo creado💌");
  });

  await browser.close();
};

scrapping();
