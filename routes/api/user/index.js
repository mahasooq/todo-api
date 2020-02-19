const express = require('express');
const router = express.Router();
const controller = require('./user.controller');
const auth = require('../../../auth/auth.service');
/* Login */
router.post('/login', controller.login);

/* Login */
router.get('/login', controller.checkLogin);

/* Logout */
router.get('/logout', controller.logout);

/* POST Register route */
router.post('/register', controller.register);

module.exports = router;