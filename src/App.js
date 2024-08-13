import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";
import confetti from "canvas-confetti";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { grey } from "@mui/material/colors";

function App() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [showAddAnimation, setShowAddAnimation] = useState(false);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    if (tasks.every((task) => task.completed)) {
      triggerConfetti();
    }
  }, [tasks]);

  function handleChange(ev) {
    setInput(ev.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (input.trim()) {
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: Date.now(), text: input, completed: false },
      ]);
      setInput("");
      setShowAddAnimation(true);
      setTimeout(() => setShowAddAnimation(false), 500);
    }
  }

  function toggleComplete(id) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function editTask(id, newText) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  function clearCompleted() {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
  }

  function onDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTasks(items);
  }

  function triggerConfetti() {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }

  return (
    <div className={`container ${darkMode ? "dark-mode" : ""}`}>
      <div className="heading">
        <h1>To-Do List</h1>
        <button onClick={() => setDarkMode(!darkMode)} className="mode-toggle">
          {darkMode ? (
            <LightModeIcon sx={{ color: grey[50] }} />
          ) : (
            <DarkModeIcon />
          )}
        </button>
      </div>
      <form onSubmit={handleSubmit} className="form">
        <input
          value={input}
          onChange={handleChange}
          type="text"
          placeholder="Add a new task..."
        />
        <button type="submit" className={showAddAnimation ? "animate-add" : ""}>
          <span>Add</span>
        </button>
      </form>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="task-list"
            >
              {tasks.map((task, index) => (
                <Draggable
                  key={task.id}
                  draggableId={task.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`task-item ${
                        task.completed ? "completed" : ""
                      } ${snapshot.isDragging ? "dragging" : ""}`}
                    >
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleComplete(task.id)}
                      />
                      <span
                        onDoubleClick={() => {
                          const newText = prompt("Edit task:", task.text);
                          if (newText) editTask(task.id, newText);
                        }}
                      >
                        {task.text}
                      </span>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="delete-btn"
                      >
                        ❌
                      </button>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      {tasks.length > 0 && (
        <button onClick={clearCompleted} className="clear-btn">
          Clear Completed
        </button>
      )}
      {tasks.length === 0 && (
        <div className="empty-state">
          <p>Well Done! All tasks completed.</p>
          <EmojiEventsIcon fontSize="large" />
        </div>
      )}
    </div>
  );
}

export default App;
