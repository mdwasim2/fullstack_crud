import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

const App = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [todos, setTodos] = useState([]);

  const handleAddTodo = () => {
    if (name.trim() && age.trim()) {
      setTodos([...todos, { name, age }]);
      setName("");
      setAge("");
    }
  };

  const handleDeleteTodo = (indexToDelete) => {
    const newTodos = todos.filter((_, index) => index !== indexToDelete);
    setTodos(newTodos);
  };

  function getAllTask() {
    axios
      .get("http://localhost:3000/getalltodo")
      .then((res) => {
        setTodos(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getAllTask();
  }, []);

  return (
    <div className="max-w-lg mx-auto mt-12 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Todo List</h2>

      {/* Input Fields */}
      <div className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Enter name"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter age"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          onClick={handleAddTodo}
        >
          Add Todo
        </button>
      </div>

      {/* Todo List */}
      {todos.length === 0 ? (
        <p className="text-center text-gray-500">No todos yet.</p>
      ) : (
        <ul className="space-y-3">
          {todos.map((todo, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-100 px-4 py-3 rounded-md"
            >
              <div>
                <p className="font-medium">{todo.name.toUpperCase()}</p>
                <p className="text-sm text-gray-600">Age: {todo.age}</p>
              </div>
              <button
                className="text-red-500 hover:text-red-700 font-semibold"
                onClick={() => handleDeleteTodo(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
