// Import todo model
Todo = require('./todo.model');

// Handle todo GET action
const getAll = async function (req, res) {
  try {
    const todos = await Todo.find()
    // .limit()
    console.log({
      todos
    });
    res.status(200).json({
      status: "success",
      message: "Todo list retrieved successfully",
      data: todos
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};
// Handle create todo actions
const addNew = async function (req, res) {
  try {
    const todo = await new Todo({
      title: req.body.title,
      completed: req.body.completed
    }).save()
    console.log({
      todo
    });
    res.status(200).json({
      status: "success",
      message: 'New todo created!',
      data: todo
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};

// Handle view todo info
const view = async function (req, res) {
  try {
    const todo = await Todo.findById(req.params.todo_id);
    console.log({
      todo
    });
    res.status(200).json({
      status: "success",
      message: 'Todo details loading..',
      data: todo
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};
// Handle update todo info
const updateOne = async function (req, res) {
  try {
    const data = req.body;
    const todo = await Todo.findByIdAndUpdate(req.params.todo_id, data);
    console.log({
      todo
    });
    res.status(200).json({
      message: 'Todo details updated',
      data: todo
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};
// Handle delete todo
const deleteOne = async function (req, res) {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.todo_id);
    console.log({
      todo
    });
    res.status(200).json({
      succes: 'Success',
      message: 'Todo details deleted',
      data: todo
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  getAll,
  addNew,
  deleteOne,
  updateOne
}