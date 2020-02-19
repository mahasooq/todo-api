var express = require('express');
var router = express.Router();
var controller = require('./todo.controller');
const auth = require('../../../auth/auth.service');

/* GET todos listing. */
router.get('/', auth.authenticate, controller.getAll);

/* GET one todo */
router.get('/:todo_id', auth.authenticate, controller.getOne);

/* DELETE all todos. */
router.delete('/', auth.authenticate, controller.deleteAll);

/* ADD todo */
router.post('/', auth.authenticate, controller.addNew);

/* UPDATE todo */
router.patch('/:todo_id', auth.authenticate, controller.updateOne);

/* DELETE todo */
router.delete('/:todo_id', auth.authenticate, controller.deleteOne);

module.exports = router;