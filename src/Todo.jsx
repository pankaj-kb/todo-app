import React, { useState } from "react";
import { useEffect } from "react";

function Todo() {
  const [todoItems, setTodoItems] = useState([]);
  const [task, setTask] = useState("");
  const [warning, setWarning] = useState("");
  const [listTitle, setListTitle] = useState("My List");
  const [editIndex, setEditIndex] = useState(-1);

  const addTask = () => {
    if (task.trim() === "") {
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

  const editTask = (index, value) => {
    const newTodoItems = [...todoItems];
    newTodoItems[index] = value;
    setTodoItems(newTodoItems);
    setEditIndex(-1);
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

  const handleTitleChange = (event) => {
    setListTitle(event.target.value);
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
  };

  const handleCancelClick = () => {
    setEditIndex(-1);
  };

  const handleDeleteClick = (index) => {
    const newTodoItems = [...todoItems];
    newTodoItems.splice(index, 1);
    setTodoItems(newTodoItems);
  };

  const handleEditSubmit = (event, index) => {
    event.preventDefault();
    const newTask = event.target.elements.editTask.value.trim();
    if (newTask === "") {
      setWarning("Please enter a valid task.");
      return;
    }
    editTask(index, newTask);
  };

  return (
    <div>
      <h1 contentEditable="true" onBlur={handleTitleChange}>
        {listTitle}{" "}
      </h1>{" "}
      <ul>
        {" "}
        {todoItems.map((item, index) => (
          <li key={index}>
            {" "}
            {editIndex === index ? (
              <form onSubmit={(event) => handleEditSubmit(event, index)}>
                <input
                  type="text"
                  name="editTask"
                  defaultValue={item}
                  autoFocus
                />
                <button type="submit"> Save </button>{" "}
                <button type="button" onClick={handleCancelClick}>
                  Cancel{" "}
                </button>{" "}
              </form>
            ) : (
              <div>
                <span> {item} </span>{" "}
                <button type="button" onClick={() => handleEditClick(index)}>
                  Edit{" "}
                </button>{" "}
                <button type="button" onClick={() => handleDeleteClick(index)}>
                  {" "}
                  Delete Task{" "}
                </button>{" "}
              </div>
            )}{" "}
          </li>
        ))}{" "}
      </ul>{" "}
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />{" "}
      <button onClick={addTask}> Add Task </button>{" "}
      {warning && <p> {warning} </p>}{" "}
    </div>
  );
}

export default Todo;
