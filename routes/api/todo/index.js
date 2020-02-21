var express = require('express');
var router = express.Router();
var controller = require('./todo.controller');
/* GET todos listing. */
router.get('/', controller.getAll);

/* GET one todo */
router.get('/:todo_id', controller.getOne);

/* DELETE all todos. */
// router.delete('/', controller.deleteAll);

router.post('/delete-many', controller.deleteAll);

/* ADD todo */
router.post('/', controller.addNew);

/* UPDATE all */
router.patch('/all', controller.updateAll);

/* UPDATE todo */
router.patch('/:todo_id', controller.updateOne);

/* DELETE todo */
router.delete('/:todo_id', controller.deleteOne);

module.exports = router;