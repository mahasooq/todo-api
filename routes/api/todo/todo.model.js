var mongoose = require('mongoose');
// Setup schema
var todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    order: {
        type: Number,
    }
});

var Todo = module.exports = mongoose.model('todo', todoSchema);