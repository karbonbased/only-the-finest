//REQUIREMENTS//
/////////////////////////////////

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var passport = require('passport');
var session = require('express-session');
var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/visualize';



app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());



var usersController = require('./controllers/usersController.js');
app.use('/users', usersController)

var locationsController = require('./controllers/locationsController.js');
app.use('/locations', locationsController)

//PASSPORT
/////////////////////////////////
app.use(session({ name: 'finestapp', secret: 'conventional wisdom', resave: true,
    saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());



//CONNECTIONS
/////////////////////////////////

mongoose.connect(mongoUri);

app.listen(port, function() {
console.log('listening on port ' + port)
});