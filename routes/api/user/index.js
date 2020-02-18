var express = require('express');
var router = express.Router();
var controller = require('./user.controller');

/* GET Login route */
router.get('/login', controller.login);

/* POST Register route */
router.post('/register', controller.register);

module.exports = router;