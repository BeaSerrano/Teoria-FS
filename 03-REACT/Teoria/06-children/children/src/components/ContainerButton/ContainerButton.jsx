import "./ContainerButton.css";

export const ContainerButton = ({ children }) => {
    /** como ContainerButton, dentro de App cuando llamamos al componente
     * tiene dos children, me devuelve un array con dos objetos ---> el button y el parrafo
     * que tiene como hijos
     */
    return (
        <div className="card">
            {children}
        </div>
    )
}