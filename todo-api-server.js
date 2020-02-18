let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let app = express();
var port = process.env.PORT || 8080;

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(cors())

mongoose.connect('mongodb+srv://m001-student:m001-mongodb-basics@sandbox-3rsww.mongodb.net/angular-todos?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

var db = mongoose.connection;

if (!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

let apiRoutes = require('./api-routes');
app.use('/', apiRoutes)

app.listen(port, function () {
    console.log("Running todo API on port " + port);
});