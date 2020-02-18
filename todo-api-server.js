let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let app = express();
var port = process.env.PORT || 8080;
const config = require('./config/environment');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
    next();
})
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());



mongoose.connect(config.bookshelf.client, {
    useNewUrlParser: true
});

var db = mongoose.connection;

if (!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

require('./routes')(app);
app.listen(port, function () {
    console.log("Running todo API on port " + port);
});