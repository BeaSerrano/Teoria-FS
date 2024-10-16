import axios from 'axios';
import { updateToken } from '../utils';

/** creamos las headers de nuestra petición ala api del backend del node user 
 * --> lo que acepta la petición
 * --> el contenido que va a ser json
 * --> quién puede acceder -- * es que puede acceder cualquier cliente
 * --> actualizamos el token con la función de utils para coger el token del usuario 
 * que está en el localStorage en ese momento
*/
const APIHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${updateToken()}`,
}

/** hacemos la petición creando una instancia objeto con axios
 * --> base url -- en vuestro caso, si no hay despliegue, la hacemos con el localhost...
 * --> usamos las headers que hemos creado
 * --> damos un tiempo máximo para realizar la petición
 */
export const APIUser = axios.create({
    baseURL: `https://node-user-production.up.railway.app/api/v1`,
    headers: APIHeaders,
    timeout: 600000,
})