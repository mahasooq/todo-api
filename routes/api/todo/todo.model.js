var mongoose = require('mongoose');
// Setup schema
var todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
});

var Todo = module.exports = mongoose.model('todo', todoSchema);