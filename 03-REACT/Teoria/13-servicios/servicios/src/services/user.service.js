import { APIUser } from './service.config';

/** creamos una función asíncrona registerUser que se exporta
 * 
 * cogemos al APIUser creada en el servicio y en un método post
 * pasamos: endpoint, formData (con los datos del formulario) y
 * modificamos el content-type de las headers de la api porque 
 * en register hay un file y no nos vale con json
 * 
 * gestionamos la asincronía con una promesa: 
 * then --> devuelve la respuesta completa
 * catch --> gestiona errores
*/

//! ------------- REGISTER --------------
export const registerUser = async (formData) => {
    return APIUser.post("/users/registerLargo", formData, {
        headers: {"Content-Type": "multipart/form-data"}
    })
    .then((res) => res)
    .catch((error) => error)
}