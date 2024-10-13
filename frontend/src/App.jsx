import { useEffect, useState } from "react";
import CreateTodo from "./components/CreateTodo";
import Todos from "./components/Todos";
import { baseUrl } from "./base";

function App() {
  const [todos, setTodos] = useState([]);

  // fetch todo function
  const fetchTodos = async () => {
    try {
      const response = await fetch(`${baseUrl}/todos`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (!response.ok) throw new Error("Error occur when fetching todo data");

      const data = await response.json();
      setTodos(data?.todos);
    } catch (error) {
      console.log('error', error)
    }
  }

  // fetch todo
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <CreateTodo fetchTodos={fetchTodos} />
      <Todos todos={todos} fetchTodos={fetchTodos} />
    </div>
  );
}

export default App;
