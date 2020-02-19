// Import todo model
Todo = require('./todo.model');
const baseUrl = require('../../../config/environment').hostname;
// Handle todo GET action
const getAll = async function (req, res) {
  try {
    const user = req.session.user;
    const todos = await Todo.find({
      userId: user._id
    })
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
    const user = req.session.user;
    const todo = await Todo.findOne({
      _id: req.params.todo_id,
      userId: user._id
    });
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
    const user = req.session.user;
    const recievedData = req.body;
    recievedData.userId = user._id;

    const todo = await new Todo(recievedData).save()
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
    const user = req.session.user;

    const data = req.body;
    const todo = await Todo.findOneAndUpdate({
        _id: req.params.todo_id,
        userId: user._id
      },
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

// Handle delete all todos
const deleteAll = async function (req, res) {
  try {
    const user = req.session.user;

    const todos = await Todo.remove({
      userId: user._id
    });
    console.log({
      todos
    });
    res.status(200).send();
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
    const user = req.session.user;

    const todo = await Todo.findOneAndDelete({
      _id: req.params.todo_id,
      userId: user._id
    });
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
  getOne
}