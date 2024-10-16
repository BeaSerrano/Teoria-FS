export const Button = ({ funcionSeteadoraEstado, valorActual }) => {
    return (
        <button onClick={() => {
            funcionSeteadoraEstado((valorActualEstado) => {
                return valorActualEstado >= 10 ? 0 : valorActualEstado + 1
            })
        }}>
            count is {valorActual}
        </button>
    )
}