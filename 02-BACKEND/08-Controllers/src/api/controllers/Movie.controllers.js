//! --- importaciones de modelos de datos
const Movie = require("../models/Movie.model")
const Character = require("../models/Character.model")

//! -----------------------------------------------------
//? ---------------------- POST create ------------------
//! -----------------------------------------------------

const createMovie = async (req, res, next) => {
    try {
        // actualizamos indices de mdelo
        await Movie.syncIndexes();
        /** instanciamos nuevo Movie con su body del modelo
         * y guardamos
         */
        const newMovie = new Movie(req.body)
        const savedMovie = await newMovie.save()
        /** devuelve si se ha guardado o no con status y mensaje o movie */
        return res
            .status(savedMovie ? 200 : 404)
            .json(savedMovie ? savedMovie : "error al crear la movie")

    } catch (error) {
        return res.status(404).json({
            error: "error en el catch",
            message: error.message
        }) && next(error)
    }
}

//! -------------------------------- toggle ---------------------------
//? ---------------------- add o delete un character ------------------
//! -------------------------------------------------------------------

/** qué es un toggle ---> elemento intercativo
 * tien dos estados ---> activado y desactivado /// Permite al usuario cmabiar entre dos estados
 * Ej ---> es como un interruptor de la luz. Si está encendido y le doy, lo activo, se apaga la luz. Y viceversa
 */

//? en la ruta (dentro de MovieRoutes) add/:id --->  el id se refiere al id de la pelicula que es el que buscamos con movieByid
const toggleCharacter = async (req, res, next) => {
    try {
        /** estee id es el id de la moviee que queremos actualizar */
        const {
            id
        } = req.params;
        const {
            characters
        } = req.body; // -----> idDeLosCharacter enviaremos esto por el req.body "12412242253,12535222232,12523266346"
        /** Buscamos la pelicula por id para saber si existe */
        const movieById = await Movie.findById(id);

        /** vamos a hacer un condicional para si existee hacer la update sino mandamos un 404 */
        if (movieById) {
            /** cageemos el string que traemos del body y lo convertimos en un array
             * separando las posiciones donde en el string habia una coma
             * se hace mediante el metodo del split
             */
            const arrayIdCharacters = characters.split(",");

            /** recorremos este array que hemos creado y vemos si tenemos quee:
             * 1) ----> sacar eel character si ya lo tenemos en el back
             * 2) ----> meterlo en caso de que no lo tengamos metido en el back
             */
            Promise.all(
                    arrayIdCharacters.map(async (character, index) => {
                        if (movieById.characters.includes(character)) {
                            //*************************************************************************** */

                            //________ BORRAR DEL ARRAY DE PERSONAJES EL PEERSONAJE DENTRO DE LA MOVIE___

                            //*************************************************************************** */

                            try {
                                await Movie.findByIdAndUpdate(id, {
                                    // dentro de la clavee characters me vas a sacar el id del elemento que estoy recorriendo
                                    $pull: {
                                        characters: character
                                    },
                                });

                                try {
                                    await Character.findByIdAndUpdate(character, {
                                        $pull: {
                                            movies: id
                                        },
                                    });
                                } catch (error) {
                                    res.status(404).json({
                                        error: "error update character",
                                        message: error.message,
                                    }) && next(error);
                                }
                            } catch (error) {
                                res.status(404).json({
                                    error: "error update movie",
                                    message: error.message,
                                }) && next(error);
                            }
                        } else {
                            //*************************************************************************** */
                            //________ METER EL PERSONAJE EN EL ARRAY DE PERSONAJES DE LA MOVIE_____________
                            //*************************************************************************** */
                            /** si no lo incluye lo tenemos que meter -------> $push */

                            try {
                                await Movie.findByIdAndUpdate(id, {
                                    $push: {
                                        characters: character
                                    },
                                });
                                try {
                                    await Character.findByIdAndUpdate(character, {
                                        $push: {
                                            movies: id
                                        },
                                    });
                                } catch (error) {
                                    res.status(404).json({
                                        error: "error update character",
                                        message: error.message,
                                    }) && next(error);
                                }
                            } catch (error) {
                                res.status(404).json({
                                    error: "error update movie",
                                    message: error.message,
                                }) && next(error);
                            }
                        }
                    })
                )
                .catch((error) => res.status(404).json(error.message))
                .then(async () => {
                    return res.status(200).json({
                        dataUpdate: await Movie.findById(id).populate("characters"),
                    });
                });
        } else {
            return res.status(404).json("esta pelicula no existe");
        }
    } catch (error) {
        return (
            res.status(404).json({
                error: "error catch",
                message: error.message,
            }) && next(error)
        );
    }
};

//! -------------------------------------------------------------------
//? -------------------------- delete movie ---------------------------
//! -------------------------------------------------------------------

//* ESTE LO HACEIS VOSOTROS ---> coger de referencia el delete de Character (08) o de User (09)


//! --- exportaciones
module.exports = {
    createMovie,
    toggleCharacter
}