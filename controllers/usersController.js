var express = require('express');
var router = express.Router();


var User = require('../models/user.js');
var Locations = require('../models/location.js');

// INDEX PAGE GET ROUTE
router.get('/', function(req, res){
	User.find(function(err, user){
		res.send(user);
	});
});


// SEED ROUTE FOR USERS
router.get('/seed', function(req, res){
	var users = [
		{name: 'Jen', email: 'Jen@Jen.com' , gender: 'f', password: 'Jen'},
		{name: 'Emily', email: 'Emily@Emily.com' , gender: 'f', password: 'Emily'},
		{name: 'Josh', email: 'Josh@Josh.com' , gender: 'f', password: 'Josh'},
	];

	// CREATE THE SEEDED USERS IN DB
	User.create(users, function(err, users){
		res.redirect('/');
	});
});





module.exports = router;