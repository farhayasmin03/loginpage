//const express = require('express');
const path = require('path');
var mongoose = require('mongoose');
//mongoose.connect(sever);
const session = require('express-session');
var MongoStore = require('connect-mongo')(session)
const bodyParser = require('body-parser');
var express = require('express');
var app = express();
var http = require('http').Server(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
const expressValidator = require('express-validator');
const flash = require('connect-flash');

const passport = require('passport');
var mongo = require('mongodb');
//var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/loginapp');
var db = mongoose.connection;
// Check connection
db.once('open', function () {
    console.log('Connected to MongoDB');
});

// Check for DB errors
db.on('error', function (err) {
    console.log(err);
});
//use sessions for tracking logins
app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db
    })
  }));

app.use(express.static('public'));
app.set('view engine', 'ejs');

var routes =require('./routes/router');
app.use('/',routes);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('File Not Found');
    err.status = 404;
    next(err);
  });
  
  // error handler
  // define as the last app.use callback
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
  });
  
  
  // listen on port 3000
  app.listen(3000, function () {
    console.log('Express app listening on port 3000');
  });