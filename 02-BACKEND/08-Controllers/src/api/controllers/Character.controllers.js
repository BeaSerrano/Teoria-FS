//! --- importaciones de --- middleware de Cloudinary + modelo Character ´modelo Movie para el match delete
const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const Character = require("../models/Character.model")
const Movie = require("../models/Movie.model")
const enumOk = require("../../utils/enumOk")

/** CRUD
 * CREATE ---> post 👌
 * READ ---> get 👌
 * UPDATE ---> put (actualizacion completa), patch (actualizacion parcial)
 * DELETE ---> delete
 */

//! -----------------------------------------------------
//? ---------------------- POST create ------------------
//! -----------------------------------------------------

const create = async(req, res, next) => {

    // vamos a capturar la url de la imagen que subimos a cloudinary
    /** la imagen se sube antes de ejecutar el controlador >>> capturamos la imagen porque si hay un error
     * en en controlador, una vez dentro, el elemento no se crea */

    // optional chaining ? >>> como la imagen no es obligatoria - required:false - puede ser que no tengamos un req.file
    let catchImg = req.file?.path; // si tiene req.file trae el path y si no tiene req.file no trae el path

    try {
        //! --- ACTUALIZAR LOS INDEXS
        /** los indexs se forman cuando empezamos el create (post) y funcionan cuando la clave es unique 
         * por que? >>> porque si se ha modificado el modelo, podemos sincronizarlo con nuestro controlador */
        await Character.syncIndexes();

        //! --- INSTANCIAR UN CHARACTER >>> new Character
        /** vamos a instanciar un nuevo character y le metemos como info inicial lo que recibimos en el req.body */
        const newCharacter = new Character(req.body);

        //! --- VALORAR SI SE HA RECIBIDO UNA IMAGEN O NO
        /** si recibimos la imagen metemos la url (path) en el objeto creado arriba (en la instancia) */
        if (req.file){
            // si hay file me traes el path de la imagen
            newCharacter.image = catchImg;
        } else {
            // si no hay file metes esta imagen estandar
            newCharacter.image = "https://res.cloudinary.com/deahoouj6/image/upload/v1708714215/placeholder_qj5di6.webp"
        }

        //! --- GUARDAR LA INSTANCIA DEL NUEVO CHARACTER
        const saveCharacter = await newCharacter.save();

        //! -- devolver la respuesta en funcion de SI SE HA GUARDADO O NO
        if (saveCharacter) {
            // si se ha guardado >>> status 200 --- todo ok se ha guardado el character
            return res.status(200).json(saveCharacter)
        } else {
            // si no se ha guardado >>> status 404 --- todo mal, no se ha guardado
            return res.status(404).json("No se ha podido guardar el elemento en la DB ❌")
        }

    } catch (error) {
        //! --- solo entramos en el catch si ha habido un error
        /** si ha habido un error >>> 
         * borramos la imagen de cloudinary porque va antes del controlador
         * y devolvemos respuesta con el error de que no se ha producido el POST (create) */
        req.file?.path && deleteImgCloudinary(catchImg);
        next(error);
        return (
            res.status(404).json({
                message: "Error en la creación del elemento ❌",
                error: error,
            }) && next(error)
        )
    }
}

//! -----------------------------------------------------
//? ---------------------- get by id --------------------
//! -----------------------------------------------------

const getById = async (req, res, next) => {
    try {
        // hago una petición del parametro id
        // cuando vaya a leer la ruta, tengo que buscarlo como un param
        const { id } = req.params;
        // busco dentro del personaje su id con el metodo findById
        const characterById = await Character.findById(id);
        // valoramos si ha encontrado a ese personaje o no
        if (characterById) {
            // si lo ha encontrado, me devueelve el personaje y una respuesta de status todo ok 
            return res.status(200).json(characterById)
        } else {
            // si no lo encuentra, me devueelve una respuesta de status 404, el error es del cliente, y no ha encontrado el id
            return res.status(404).json("no se ha encontrado el character, pon un id correcto")
        }
    } catch (error) {
        // si no es capaz de hacer alguna de las tareas que le pedimos en el try, el intento se rompe y nos lleva al catch, al error
        return res.status(404).json({
            error:"error en la busqueda por id",
            message: error.message,
        })
    }
}

//! -----------------------------------------------------
//? ---------------------- get all ----------------------
//! -----------------------------------------------------

const getAll = async (req, res, next) => {
    try {
        // intenta encontrar todos los characters
        const allCharacter = await Character.find();
        // el find() nos devuelde un array, una coleccion en este caso con los personajes
        // si el lenght de los character es mayor que 0 es porque al menos hay un character
        if (allCharacter.length > 0) {
            // si hay algun character me devuelves todos los personajes >>> los devuelve en un array
            return res.status(200).json(allCharacter)
        } else {
            // si no hay ninguno, pues un error
            return res.status(404).json("no se han encontrado characters, sorry!")
        }
    } catch (error) {
        return res.status(404).json({
            error:"error en la busqueda de los characters",
            message: error.message,
        })
    }
}

//! -----------------------------------------------------
//? ---------------------- get by name ------------------
//! -----------------------------------------------------

// ver comemtarios en getById y getAll ---> es una mezcla de los dos

const getByName = async (req, res, next) => {
    try {
        const { name } = req.params;
        const characterByName = await Character.find({ name });
        if (characterByName.length > 0) {
            return res.status(200).json(characterByName)
        } else {
            return res.status(404).json("no se ha encontrado el character")
        }
    } catch (error) {
        return res.status(404).json({
            error:"error en la busqueda por nombre",
            message: error.message,
        })
    }
}

//! -----------------------------------------------------
//? ---------------------- UPDATE -----------------------
//! -----------------------------------------------------

/** actualizar un character, o una part del character, que ya tenemos subida a la db
 * patch >>> para hacer una actualización parcial
 */

const update = async (req, res, next) => {

    // capturamos la imagen para poder manejar el file
    let catchImg = req.file?.path;

    try {
        // sincronizar los indices para poder reviar le modelo y que se sincronice
        await Character.syncIndexes();

        const { id }  = req.params;
        const characterById = await Character.findById(id);

        if (characterById) {
            // guardo la imagen que ya estaba subida para dejar esta si no hay cambio de imagen
            const oldImg = characterById.image;

            /** dar pautas de lo que puede modificar el usuario en el body del character y de lo que no
             * y de como tiene que hacer y guardarse
             */

                // el id no va a cmabiar, no le damos opcion
                /** name y gender ---> encuentra un name o un gender nuevo?
                 * si lo encuentra mete en el body el nuevo
                 * si no lo encuentra, no ha subido nada nuevo, entonces me pone la imagen antigua
                 */
                /** recogemos el path del file subido y los mismo --->
                 * si hayuna imagen nueva mete el nuevo path del cath image de la imagen nueva
                 * si no hay imagen nueva, usa la oldImg que es la antigua capturada
                 */

                /** la interrogacion después del req.body? es un OPTIONAL CHAINING
                 * le decimos al backend que puede que haya esa clave o puede que no
                 */
            const customBody = {
                _id: characterById._id,
                name: req.body?.name ? req.body?.name : characterById.name,
                image: req.file?.path ? catchImg : oldImg,
            }

            /** comprobamos mediante la funcion enumOk de utils el check de esa funcion
             * que puede true o false ---> si es true el check, si ha cogido uno d elos pramatros que no deja el enum
             * entonces coge el nuevo gender, si es false el check entonces no cmabia el gender, deja el que estaba
             */
            if (req.body?.gender) {
                const resultEnum = enumOk(req.body?.gender)
                customBody.gender = resultEnum.check
                ? req.body?.gender
                : characterById.gender
            }

            try {
                /** una vez hecho el customBody le digo que me haga un update del personaje que ha recogido por id
                 * como tenemos un file de por medio ---> le digo que si hay una imagen que queremos cambiar,
                 * que me elimine (con la funcion del middleware, la imagen antigua)
                 */
                await Character.findByIdAndUpdate(id, customBody)
                if (req.file?.path) {
                    deleteImgCloudinary(oldImg)
                }

                // aqui puedo controlar la respuesta
            
                //? --------------------------------------------------------------
                //? ----------- TESTEO EN TIEMPO REAL DE QUE TODO ESTE OK --------
                //? --------------------------------------------------------------

                /** vamos a buscar el elemento actualizado por su id */
                const characterByIdUpdate = await Character.findById(id);

                /** saco las claves del req body, del body del personaje {}, para saber que elementos hay dentro
                 * en este caso tendría que sacar sus claves: _id, name, egnder, image
                 * lo sacamos con el método Object.keys()
                 */
                const elementUpdate = Object.keys(req.body);

                /** hacemos un objeto vacio para poder hacer el testeo e ir metiendo en este objeto
                 * los personajes actualizados y la peticion con los cambios del cliente
                 * comprobamos con este testeo --- si la actualizacion se ha hehco correctamente
                 */
                let test = {};

                /** recorremos con un forEach las claves del body (de elementUpdate) 
                 * y creamos los objetos para el test */

                /** comprobamos name y gender --- si los items del body son iguales a los actualizados por el usuario
                 * entonces me da true y se ha actualizado correctamente
                 * si no me da false y ha habido un error enla 
                 * 
                 * hecho con un if else y metiendo el item dentreo del test
                 */
                elementUpdate.forEach((item) => {
                    if(req.body[item] === characterByIdUpdate[item]){
                        test[item] = true;
                    } else {
                        test[item] = false;
                    }
                })

                /** comprobamos el path del file de la imagen en este caso --- si el path nuevo es igual al actualizado
                 * entonces me da true y se ha actualizado correctamente
                 * si no me da false y ha habido un error en la actualizacion
                 * 
                 * operador ternario y spread operator para modificar el array
                 */
                if(req.file){
                    characterByIdUpdate.image === req.file?.path 
                    ? (test = { ...test, file: true}) 
                    : (test = { ...test, file: false})
                }

                /** vamos a comprobar que no haya ningun false
                 * si hay un false entonces ha habido un error en la actualizacion ---> 404
                 * si no hay ningun false entonces todo ha salido bien ---> 200
                 */

                /** hacemos un acumulador para poder recorred cada elemento del array sin hacerle cambios */
                let acc = 0;

                /** recorremos con un for in todas las claves del objeto test
                 * y le decimos que si un false lo capture y pase a comprobar el siguiente
                 */
                for ( clave in test) {
                    test[clave] == false && acc++;
                }

                /** vamos pasando de un elemento a otro
                 * si hay algun false ---> error 404 y devuelve el objeto test para evr que ha pasado y nos dice que no se ha actualizado
                 * si no hay un false ---> error 200 y devuelve el objeto test para evr que ha pasado y nos dice que se ha actualizado
                 */
                if (acc > 0) {
                    return res.status(404).json({
                        dataTest : test,
                        update: false
                    })
                } else {
                    return res.status(200).json({
                        dataTest : test,
                        update: true
                    })
                }

                //? ----------------------- FIN DEL TESTEO ------------------------


            } catch (error) {
                next(error)
                return (
                    res.status(404).json({
                        message: "no se ha actualizado el character ❌",
                        error: error,
                    }) && next(error)
                )
            }

        } else {
            next(error);
            return (
                res.status(404).json({
                    message: "el charcater no existe ❌",
                    error: error,
                }) && next(error)
            )
        }

    } catch (error) {
        next(error);
        return (
            res.status(404).json({
                message: "ningun character con ese id ❌",
                error: error,
            }) && next(error)
        )
    }
}

//! -----------------------------------------------------
//? ---------------------- DELETE -----------------------
//! -----------------------------------------------------
const deleteCharacter = async(req, res, next) => {
    try {
        /** traernos el id del personaje mediante un parametro :id */
        const { id } = req.params;
        /** aplicamos el metodo, en este caso find by id and delete ---> para eliminar */
        const character = await Character.findByIdAndDelete(id);

        // buscamos el personaje para ver si existe
        if(character){
            const findByIdcharacter = await Character.findById(id)

            // borramos los id del personaje
            /** tenemos que borrar los id del personaje que hemos borrado con el delete
             * donde lo tenemos que borrar? dentro del array de characters de movie ---> movie --- characters []
             */
            try {
                /** el primer objeto hace de condicion para que compruebe si hay characters o no
                 * y con el pull se ejecuta el traer el id, en caso de que haya
                 */
                const test = await Movie.updateMany(
                    { characters: id},
                    { $pull: { characters: id} }
                )

                return res
                .status(findByIdcharacter ? 404 : 200)
                .json({ deleteTest : findByIdcharacter ? true : false})

            } catch (error) {
                // error si no se ha actualizado
                return res.status(404).json({error:error.message})
            }
        }



        //? ----------------------- TESTEO ------------------------
        /* const findByIdCharacter = await Character.findById(id)

        if (findByIdCharacter) {
            return res.status(404).json("no se ha borrado 🚫", error)
        } else {
            return res.status(200).json("se ha borrado 👌")
        } */
        //? ----------------------- FIN TESTEO ---------------------

    } catch (error) {
        return res.status(404).json("ha habido un error", error)
    }
}


//! --- EXPORTAMOS EL CONTROLADOR

module.exports = { 
    create, 
    getById,
    getAll,
    getByName,
    update,
    deleteCharacter
}