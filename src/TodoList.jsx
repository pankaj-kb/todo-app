import React, { useState, useEffect } from "react";

function TodoList(props) {
  const [todoItems, setTodoItems] = useState([]);
  const [task, setTask] = useState("Add New Task");
  const [warning, setWarning] = useState("");

  const addTask = () => {
    if (task.trim() === "" || task === "Add New Task") {
      setWarning("Please enter a valid task.");
      return;
    }

    if (todoItems.includes(task)) {
      setWarning("This task already exists.");
      return;
    }

    setTodoItems([...todoItems, task]);
    setTask("");
    setWarning("");
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem("todoItems");
    if (storedTasks) {
      setTodoItems(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
  }, [todoItems]);

  return (
    <div>
    <h1>{props.title}</h1>
      <ul>
        {todoItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      {warning && <p>{warning}</p>}
    </div>
  );
}

export default TodoList;
