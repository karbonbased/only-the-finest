var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/finestApp');


app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());



var usersController = require('./controllers/usersController.js');
app.use('/users', usersController)





app.listen(port);
console.log('listening on port 3000')