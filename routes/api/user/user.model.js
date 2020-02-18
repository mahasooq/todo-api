var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

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

UserSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        phone: this.phone,
        exp: parseInt(expiry.getTime() / 1000)
    }, 'MY_SECRET');
};

module.exports = mongoose.model('User', UserSchema);
