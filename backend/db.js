const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://walisantunu:WkNefBVfgtFPVYDD@cluster0.8cpsi.mongodb.net/my-todo-app').then(() => console.log('mongodb connected'));

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})

const Todo = mongoose.model('Todo', todoSchema);

module.exports = {Todo};