import React from "react";

function TodoForm({inputValue, setInputValue, handleSubmit}) {
    return(
        <form onSubmit={handleSubmit}>
            <input type="text" 
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
            />
            <button type="submit">Add Task</button>
        </form>
    )
}

export default TodoForm;