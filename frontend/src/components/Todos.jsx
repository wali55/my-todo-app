import { baseUrl } from "../base";

const Todos = ({ todos, fetchTodos }) => {
  // update todo
  const updateTodo = async (id) => {
    try {
      const response = await fetch(`${baseUrl}/completed`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) throw new Error("error occur when try to update todo")

      await response.json();
      await fetchTodos();
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo?._id}>
          <h1>{todo?.title}</h1>
          <h2>{todo?.description}</h2>
          <button disabled={todo?.completed} onClick={() => updateTodo(todo?._id)}>{todo.completed ? "Done" : "Mark as completed"}</button>
        </div>
      ))}
    </div>
  );
};

export default Todos;
