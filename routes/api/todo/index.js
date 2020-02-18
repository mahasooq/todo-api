var express = require('express');
var router = express.Router();
var controller = require('./todo.controller');
/* GET todos listing. */
router.get('/', controller.getAll);

/* DELETE all todos. */
router.delete('/', controller.deleteAll);

/* ADD todo */
router.post('/', controller.addNew);

/* UPDATE todo */
router.put('/:todo_id', controller.updateOne);

/* DELETE todo */
router.delete('/:todo_id', controller.deleteOne);

module.exports = router;