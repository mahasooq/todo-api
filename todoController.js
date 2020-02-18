// Import todo model
Todo = require ('./todoModel');

// Handle todo GET action
exports.index = function (req, res) {
    Todo.get(function (err, todos) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Todo list retrieved successfully",
            data: todos
        });
    });
};
// Handle create todo actions
exports.new = function (req, res) {
    const todo = new Todo({
      title: req.body.title,
      completed: req.body.completed
    });
    // save the todo and check for errors
    todo.save(function (err) {
      if (err) {
        res.json({
          status: "error",
          message: err,
        });
      }
      res.json({
        message: 'New todo created!',
        data: todo
      });
    });
  };
  
  // Handle view todo info
  exports.view = function (req, res) {
    Todo.findById(req.params.todo_id, function (err, todo) {
      if (err)
        res.send(err);
      res.json({
        message: 'Todo details loading..',
        data: todo
      });
    });
  };
  // Handle update todo info
  exports.update = function (req, res) {
    Todo.findById(req.params.todo_id, function (err, todo) {
      if (err)
        res.send(err);
      console.log(req.body);
      todo.title = req.body.title ? req.body.title : todo.title;
      todo.completed = ('completed' in req.body) ? req.body.completed : todo.completed;
      console.log(todo);
      // save the todo and check for errors
      todo.save(function (err) {
        if (err)
          res.json(err);
        res.json({
          message: 'Todo Info updated',
          data: todo
        });
      });
    });
  };
  // Handle delete todo
  exports.delete = function (req, res) {
    Todo.findById(req.params.todo_id, function (err, todo) {
      if (err)
        res.send(err);
      todo.remove({
        _id: req.params.todo_id
      }, function (err, todo) {
        if (err)
          res.send(err);
        res.json({
          status: "success",
          message: 'Todo deleted'
        });
      });
    });
  };
