let express = require('express');
let bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
let mongoose = require('mongoose');
let session = require('express-session');
let app = express();
var port = process.env.PORT || 8080;
const config = require('./config/environment');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", config.fronendUrl);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
    next();
})
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'mysecret',
    saveUninitialized: true,
    maxAge: 3 * 60 * 60 * 1000
}));

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