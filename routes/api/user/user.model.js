var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  first_name: {
    type: String,
    required: true,
    max: 16
  },
  last_name: {
    type: String,
    required: true,
    max: 16
  },
  email: {
    type: String,
    required: true,
    max: 50
  },
  username: {
    type: String,
    required: true,
    max: 16
  },
  password: {
    type: String,
    required: true,
    max: 16
  }
});

module.exports = mongoose.model('User', UserSchema);
