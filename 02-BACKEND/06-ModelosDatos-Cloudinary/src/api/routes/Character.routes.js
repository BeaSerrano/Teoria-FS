//! --- IMPORTACIONES DE funciones upload DE CLOUDINARY Y create del CONTROLADOR Character

const { upload } = require("../../middleware/files.middleware");
const { create } = require("../controllers/Character.controllers");

//!! --- importamos también el router

const CharacterRoutes = require("express").Router();

/** entre la ruta y la funcion del controlador (create) está el middleware de la subida (upload) de files de cloudinary
 * Upload tiene un método single que lo que hace es subir una imagen en concreto y lo sube con la clave image que es clave del modelo
 * 
 * lo que hace es que en el body recibe una clave que se llama image y en esa clave el middleware upload lo sube a cloudinary 
 * y nos devuelve el path de ese file subido (la url de la imagen de cloudinary =  req.file.path)
*/

//! --- hacemos la ruta con el método, el endpoint y la funcion que queramos ejecutar en la ruta >>> extra upload de cloudinary

CharacterRoutes.post("/", upload.single("image"), create)

//! --- exportamos la ruta

module.exports = CharacterRoutes;
