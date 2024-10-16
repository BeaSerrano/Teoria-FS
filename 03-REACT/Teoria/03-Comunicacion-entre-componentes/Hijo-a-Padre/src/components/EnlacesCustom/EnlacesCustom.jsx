// rafce ---> atajo del teclado para crear función arrow con exportación

/** para poder componetizar estos enlaces tenemos que desacoplar la información que tienen: href, img
 * para hacer componentes dinámicos ---> usamos las PROPS
 * 
 * props ---> son un objeto con parámetros que vamos a componetizar para usar en otro sitio
 * 
 * en la función EnlacesCustom estas son las props ---> {url, src, clase, alt}
 * son lo que necesitamos para crear el componente
 * En en el componente, en este caso en los atributos, metemos los parámetros que vamos a usar
 * siempre entre llaves ---> { prop }
 */

import "./EnlacesCustom.css"

export const EnlacesCustom = ({url, src, clase, alt}) => {
    return (
        <a href={url} target="_blank">
            <img src={src} className={clase} alt={alt} />
        </a>
    )
}