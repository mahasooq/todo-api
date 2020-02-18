// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/', function (req, res) {
   res.json({
       status: 'Todo API is working',
       message: 'Welcome to todo API routes'
   }); 
});

// Import todo controller
var todoController = require('./todoController');
// Todo routes
router.route('/todo')
    .get(todoController.index)
    .post(todoController.new);
router.route('/todo/:todo_id')
    .get(todoController.view)
    .patch(todoController.update)
    .put(todoController.update)
    .delete(todoController.delete);

// Export API routes
module.exports = router;