const UserDAO = require('./userDAO');
const MD5 = require('md5');
var mongoose = require('mongoose');
var User = mongoose.model('User');

/* API to register new user */
let register = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(401).json({
      message: 'Parameters are missing'
    })
  } else {
    try {
      let criteria = {
        email: req.body.email
      }
      const checkEmail = await UserDAO.getUsers(criteria);
      if (checkEmail && checkEmail.length == 1) {
        res.status(401).json({
          message: 'email already registered'
        })
      } else {
        let userData = {
          first_name: req.body.first_name ? req.body.first_name : "",
          last_name: req.body.last_name ? req.body.last_name : "",
          email: req.body.email,
          username: req.body.username,
          password: MD5(MD5(req.body.password)),
        };
        const addUser = await UserDAO.createUser(userData);
        // console
        if (addUser) {
          res.status(200).json({
            message: 'User registered successfully!'
          })
        } else {
          res.status(403).json({
            message: "Something went wrong"
          });
        }
      }
    } catch (error) {
      res.status(404).json({
        message: "Something went wrong",
        error: error
      });
    }
  }
};

/* API to login user */
let login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(401).json({
      message: 'Parameters are missing'
    });
  } else {
    try {
      let criteria = {
        email: req.body.email
      };
      const checkEmail = await UserDAO.getUsers(criteria);
      if (checkEmail && checkEmail.length == 1) {
        let criteria = {
          email: req.body.email,
          password: MD5(MD5(req.body.password))
        };
        let fields = {
          "username": 0,
          "password": 0
        }
        const checkPassword = await UserDAO.getUsers(criteria, fields);
        if (checkPassword && checkPassword.length == 1) {
          var user = new User();

          user.first_name = req.body.first_name ? req.body.first_name : "";
          user.last_name = req.body.last_name ? req.body.last_name : "";
          user.email = req.body.email;
          user.phone = req.body.phone;
          var token = user.generateJwt();
          res.status(200).json({
            message: 'Logged in successfully!',
            result: checkPassword,
            token: token
          });
        } else {
          res.status(401).json({
            message: 'Incorrect password'
          });
        }
      } else {
        res.status(401).json({
          message: 'Email not exist!'
        });
      }
    } catch (error) {
      res.status(401).json({
        message: 'Something went wrong',
        error: error
      });
    }
  }
};

module.exports = {
  register: register,
  login: login
}
