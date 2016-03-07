// REQUIREMENTS //
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var User = require('../models/user.js');
var Locations = require('../models/location.js');

// INDEX PAGE GET ROUTE
router.get('/', function(req, res){
	User.find(function(err, user){
		res.send(user);
	});
});

// router.post('/', function(req, res) {
// 	User.create(req.body, function(err, user) {
// 		res.send(user);
// 	});
// });


// SEED ROUTE FOR USERS
router.get('/seed', function(req, res){
	var users = [
		{name: 'Jen', email: 'Jen@Jen.com' , gender: 'f', password: 'Jen'},
		{name: 'Emily', email: 'Emily@Emily.com' , gender: 'f', password: 'Emily'},
		{name: 'Josh', email: 'Josh@Josh.com' , gender: 'm', password: 'Josh'},
	];

	// CREATE THE SEEDED USERS IN DB
	User.create(users, function(err, users){
		res.redirect('/');
	});
});

// NEW SIGNUP //
router.post('/signup', passport.authenticate('local-signup', {
	failureRedirect: '/'}), 
	function(req, res) {
	res.send(req.body)
});

// LOGOUT //
router.get('/logout', function(req, res){
	req.logout();
	res.redirect('/')
})

// LOGIN //
router.post('/login', passport.authenticate('local-login', {
	failureRedirect : '/'}), 
	function(req, res) {
	res.send(req.body)
});


module.exports = router;