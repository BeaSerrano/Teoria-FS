import { useState } from "react";

//!--------------------------------------------------------
//?--------------------- CUSTOM HOOKS ---------------------
//!--------------------------------------------------------

/** Custom Hook que es un contador que gestiona las páginas */

export const useCounter = (initialValue = 1) => {
    const [counter, setCounter] = useState(initialValue);

    const increment = (value = 1) => setCounter(value + counter)

    const decrement = (value = 1) => setCounter(counter - value)

    const reset = () => setCounter(initialValue)

    return {
        counter,
        increment,
        decrement,
        reset,
    }
}