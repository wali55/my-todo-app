import { useState } from "react";
import { baseUrl } from "../base";

const CreateTodo = ({ fetchTodos }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  // handle change the fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // create todo function
  const createTodo = async () => {
    try {
      const response = await fetch(`${baseUrl}/todo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
        }),
      });

      if (!response.ok)
        throw new Error("error occur when try to create a todo");

      await response.json();
      fetchTodos();
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <input
        onChange={handleChange}
        name="title"
        value={formData.title}
        style={{ margin: 10, padding: 10 }}
        type="text"
        placeholder="title"
      />{" "}
      <br />
      <input
        onChange={handleChange}
        name="description"
        value={formData.description}
        style={{ margin: 10, padding: 10 }}
        type="text"
        placeholder="description"
      />{" "}
      <br />
      <button onClick={createTodo} style={{ margin: 10, padding: 10 }}>Add a todo</button>
    </div>
  );
};

export default CreateTodo;
