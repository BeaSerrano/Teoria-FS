import { useReducer, useRef } from "react"

export const ToDoList = () => {

    const inputRef = useRef();

    const [ tasks , dispatch] = useReducer(( state = [], action ) => {
        switch (action.type) {
            case 'addtask':{
                return [
                    ...state,
                    {
                        id: state.lenght,
                        title: action.title,
                    }
                ]
            }
            case 'removetask': {
                return state.filter((task, index) => index != action.index)
            }
            default: {
                return state;
            }
        }
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({
            type: 'addtask',
            title: inputRef.current.value,
        });
    };

    return (
        <>
            <h1>To Do list</h1>
            <form onSubmit={handleSubmit}>
                <label>To Do</label>
                <input type="text" name="title" ref={inputRef}/>
                <button type="submit">
                    Add to the list
                </button> 
            </form>
            <div className="tasks">
                {tasks && tasks.map((task, index) => (
                    <div className="task" key={index}>
                        <p>{task.title}</p>
                        <button 
                            onClick={() => dispatch({
                                type: 'removetask',
                                index,
                            })}>
                                Borrar
                        </button>
                    </div>
                ))}
            </div>
        </>
    )
}
