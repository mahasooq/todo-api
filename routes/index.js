module.exports = function (app) {       
    app.use('/todo', require('./api/todo'));
    app.use('/user', require('./api/user'));
}