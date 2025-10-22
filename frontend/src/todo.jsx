import React, { useState, useEffect } from "react";
import axios from "axios";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");


  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/todos");
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!title.trim()) return;
    try {
      const res = await axios.post("http://localhost:3000/todos/add", { title });
      setTodos([...todos, res.data.todo]);
      setTitle("");
    } catch (err) {
      console.error(err);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      const res = await axios.put(`http://localhost:3000/todos/update/${id}`, { completed: !completed });
      setTodos(todos.map(todo => (todo._id === id ? res.data : todo)));
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (id, currentTitle) => {
    setEditingId(id);
    setEditTitle(currentTitle);
  };

  const updateTodo = async (id) => {
    if (!editTitle.trim()) return;
    try {
      const res = await axios.put(`http://localhost:3000/todos/update/${id}`, { title: editTitle });
      setTodos(todos.map(todo => (todo._id === id ? res.data : todo)));
      setEditingId(null);
      setEditTitle("");
    } catch (err) {
      console.error(err);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/todos/delete/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "24px", color: "#333" }}>My Todos</h1>
      
      <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
          placeholder="What needs to be done?"
          style={{
            flex: 1,
            padding: "12px 16px",
            fontSize: "15px",
            border: "2px solid #e0e0e0",
            borderRadius: "8px",
            outline: "none"
          }}
        />
        <button 
          onClick={addTodo}
          style={{
            padding: "12px 24px",
            fontSize: "15px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "500"
          }}
        >
          Add
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map(todo => (
          <li 
            key={todo._id}
            style={{
              padding: "16px",
              marginBottom: "8px",
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              border: "1px solid #e0e0e0"
            }}
          >
            {editingId === todo._id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && updateTodo(todo._id)}
                  style={{
                    flex: 1,
                    padding: "8px 12px",
                    fontSize: "15px",
                    border: "2px solid #4CAF50",
                    borderRadius: "6px",
                    outline: "none"
                  }}
                  autoFocus
                />
                <button 
                  onClick={() => updateTodo(todo._id)}
                  style={{
                    padding: "8px 16px",
                    fontSize: "14px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer"
                  }}
                >
                  Save
                </button>
                <button 
                  onClick={cancelEdit}
                  style={{
                    padding: "8px 16px",
                    fontSize: "14px",
                    backgroundColor: "#999",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer"
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo._id, todo.completed)}
                  style={{ width: "18px", height: "18px", cursor: "pointer" }}
                />
                <span
                  style={{
                    flex: 1,
                    fontSize: "15px",
                    textDecoration: todo.completed ? "line-through" : "none",
                    color: todo.completed ? "#999" : "#333",
                    cursor: "pointer"
                  }}
                  onClick={() => toggleComplete(todo._id, todo.completed)}
                >
                  {todo.title}
                </span>
                <button 
                  onClick={() => startEdit(todo._id, todo.title)}
                  style={{
                    padding: "6px 12px",
                    fontSize: "13px",
                    backgroundColor: "#2196F3",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer"
                  }}
                >
                  Edit
                </button>
                <button 
                  onClick={() => deleteTodo(todo._id)}
                  style={{
                    padding: "6px 12px",
                    fontSize: "13px",
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer"
                  }}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>

      {todos.length === 0 && (
        <p style={{ textAlign: "center", color: "#999", marginTop: "40px", fontSize: "15px" }}>
          No todos yet. Add one to get started!
        </p>
      )}
    </div>
  );
};

export default Todo;