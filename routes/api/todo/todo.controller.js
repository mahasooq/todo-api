// Import todo model
Todo = require('./todo.model');
const baseUrl = require('../../../config/environment').hostname;
// Handle todo GET action
const getAll = async function (req, res) {
  try {
    const todos = await Todo.find()
    const todoWithUrl = todos.map(todo => {
      if (!todo) return null
      const {
        _id,
        title,
        completed,
        order
      } = todo;
      return {
        _id,
        title,
        completed,
        order,
        url: `${baseUrl}/todo/${_id}`
      }
    })
    console.log({
      todoWithUrl
    });
    res.status(200).json(todoWithUrl);
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};
// Handle get one todo info
const getOne = async function (req, res) {
  try {
    const todo = await Todo.findById(req.params.todo_id);
    console.log({
      todo
    });
    if (!todo) throw new Error('No todo found')
    const {
      _id,
      title,
      completed,
      order
    } = todo;
    res.status(200).json({
      _id,
      title,
      completed,
      order
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
    const todo = await new Todo(req.body).save()
    console.log({
      todo
    });
    const {
      _id,
      title,
      completed,
      order
    } = todo;
    res.status(200).json({
      _id,
      title,
      completed,
      order,
      url: `${baseUrl}/todo/${_id}`
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
    const todo = await Todo.findByIdAndUpdate(
      req.params.todo_id,
      data, {
      new: true
    });
    console.log({
      todo
    });
    const {
      _id,
      title,
      completed,
      order,
    } = todo;
    res.status(200).json({
      _id,
      title,
      completed,
      order,
      url: `${baseUrl}/todo/${_id}`
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};

//update all todos at once
const updateAll = async function (req, res) {
  try {
    const body = req.body;
    // if (body) {
    const todos = await Todo.updateMany({ completed: false }, body, { new: true })
    res.status(200).json({
      update: true
    });
    // }
    // else return res.status(400).send('Send payload');
  } catch (error) {
    res.status(400).send(error.message);
  }
}

// Handle delete all todos
const deleteAll = async function (req, res) {
  try {
    const cond = req.body.cond;
    console.log({cond});
    
    const todos = cond ? await Todo.remove(cond) : await Todo.remove();;
    console.log({
      todos
    });
    res.status(200).json({ deleted: true });
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
    res.status(200).send();
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
  deleteAll,
  deleteOne,
  updateOne,
  updateAll,
  getOne
}