//REQUIREMENTS//
/////////////////////////////////
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var passport = require('passport');
var session = require('express-session');
var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/finestApp';
var cookieParser = require('cookie-parser')
var logger = require('morgan');

// DB CONNECT
mongoose.connect(mongoUri);

// MIDDLEWARE //
require('./config/passport.js')(passport);

var usersController = require('./controllers/usersController.js');
var locationsController = require('./controllers/locationsController.js');

app.use(express.static('public'));
// app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(session({ name: 'finestapp', secret: 'conventional wisdom' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser()); // to resolve "TypeError: Cannot read property 'connect.sid' of undefined"

// ROUTES //
app.use('/users', usersController)
app.use('/locations', locationsController)

app.get('/test', function(req, res) {
	var bla = req.session;
	res.send(bla);
})


// LISTENER
app.listen(port, function() {
	console.log('listening on port ' + port)
});