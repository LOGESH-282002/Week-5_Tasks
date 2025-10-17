import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setTodos([...todos, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveTodo = (indexToRemove) => {
    setTodos(todos.filter((_, index) => index !== indexToRemove));
  };

  return (
    <>
      <div>
        <h1 className="title">TO-DO Application</h1>
        <div className="counter">
          <p>Total Tasks: {todos.length}</p>
        </div>
        <form className="box" onSubmit={handleAddTodo}>
          <input
            className="txt"
            type="text"
            placeholder="Enter your task"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="btn1" type="submit">
            Add Task
          </button>
        </form>
        <div className="todo-list">
          {todos.length > 0 ? (
            <ul>
              {todos.map((todo, index) => (
                <li key={index}>
                  {todo}
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveTodo(index)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-tasks-message">No tasks yet. Add one above!</p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
