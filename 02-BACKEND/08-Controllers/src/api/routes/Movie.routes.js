//! --- importaciones
const { createMovie, toggleCharacter } = require("../controllers/Movie.controllers");

//!! --- importacion del router

const MovieRoutes = require("express").Router();

//! --- rutas
MovieRoutes.post("/", createMovie)
MovieRoutes.patch("/add/:id", toggleCharacter)

//! --- exportaciones
module.exports = MovieRoutes;