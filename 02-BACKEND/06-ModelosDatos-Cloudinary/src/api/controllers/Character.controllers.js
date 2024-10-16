//! --- importaciones de --- middleware de Cloudinary + modelo Character
const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const Character = require("../models/Character.model")

//! -----------------------------------------------------
//! ---------------------- POST create ------------------
//! -----------------------------------------------------

const create = async(req, res, next) => {

    // vamos a capturar la url de la imagen que subimos a cloudinary
    /** la imagen se sube antes de ejecutar el controlador >>> capturamos la imagen porque si hay un error
     * en en controlador, una vez dentro, el elemento no se crea */

    // optional chaining ? >>> como la imagen no es obligatoria - required:false - puede ser que no tengamos un req.file
    let catchImg = req.file?.path; // si tiene req.file trae el path y si no tiene req.file no trae el path

    try {
        //! --- ACTUALIZAR LOS INDEXS
        /** los indexs se forman cuando empezamos el create y funcionan cuando la clave es unique 
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

//! --- EXPORTAMOS EL CONTROLADOR

module.exports = { create }