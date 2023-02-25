import React from "react";
import { useState } from "react";

function TodoList() {
  const [todoItems, setTodoItems] = useState(['Write', 'Read', 'Repeat']);
  const [task, setTask] = useState(()=> "Add New Task")

  const addTask = () => {
    setTodoItems([...todoItems,task])
    setTask("")
  }
  return(
    <div>
      <ul>
        {todoItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <input type="text" 
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button 
      onClick={addTask}>
      Add Task
      </button>
    </div>
  )
}

export default TodoList;