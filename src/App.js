import { useState } from "react";
import "./App.css";
import Item from "./components/Item";

function App() {
  const [input, setInput] = useState("");
  const [doArr, setDoArr] = useState([]);

  function handleChange(ev) {
    setInput(ev.target.value);
  }

  function handleClick() {
    input.length &&
      setDoArr((prevItems) => {
        return [...prevItems, input];
      });
    setInput("");
  }

  function clearDone() {
    setDoArr([]);
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input value={input} onChange={handleChange} type="text" />
        <button onClick={handleClick}>
          <span>Add</span>
        </button>
      </div>
      {doArr.length > 0 && (
        <div onClick={clearDone} className="clearBtn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-eraser"
          >
            <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21" />
            <path d="M22 21H7" />
            <path d="m5 11 9 9" />
          </svg>
        </div>
      )}
      <div className="toDoList">
        <ul>
          {doArr.map((toDoItem, index) => (
            <Item key={index} toDo={toDoItem} />
          ))}
        </ul>
        <div className="eraser"></div>
      </div>
      {doArr.length === 0 && (
        <div style={{ marginTop: "50px" }}>
          <p style={{ fontSize: "1.5rem" }}>Well Done !</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-trophy"
          >
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16" />
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
          </svg>
        </div>
      )}
    </div>
  );
}

export default App;
