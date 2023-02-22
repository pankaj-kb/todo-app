import React, { useState } from "react";

function TodoApp() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        setTodos([...todos, inputValue]);
        setInputValue('');
    }

    return (
    <div>

    </div>
    )
}

export default TodoApp;