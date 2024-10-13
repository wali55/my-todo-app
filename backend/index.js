const express = require("express");
const { createTodo, updateTodo } = require("./types.js");
const { Todo } = require("./db.js");
const cors = require("cors");


const app = express();

app.use(express.json());
app.use(cors());

app.post("/todo", async (req, res) => {
  const { title, description } = req.body;
  const createTodoValidation = createTodo.safeParse(req.body);
  if (!createTodoValidation.success) {
    return res.status(411).json({
      msg: "wrong inputs",
    });
  }
  // put todo in mongodb
  try {
    const todo = await Todo.create({
      title,
      description,
      completed: false,
    });
    res.status(201).json({ msg: "A new todo is created", todo });
  } catch (error) {
    console.log("error", error);
  }
});

app.get("/todos", async (req, res) => {
  // get todos from mongodb
  try {
    const todos = await Todo.find({});
    res.status(200).json({ todos });
  } catch (error) {
    console.log("error", error);
  }
});

app.put("/completed", async (req, res) => {
  const { id } = req.body;
  const updateTodoValidation = updateTodo.safeParse(req.body);
  if (!updateTodoValidation.success) {
    return res.status(400).json({
      error: updateTodoValidation.error,
    });
  }
  // update todo in mongodb
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(400).json({ msg: "todo not found" });
    }
    todo.completed = true;
    await todo.save();
    res.status(200).json({ msg: "done", todo });
  } catch (error) {
    console.log("error", error);
  }
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
