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

// SEED ROUTE FOR USERS
router.get('/seed', function(req, res){

	var users = [
		{name: 'Jen', email: 'Jen@Jen.com' , gender: 'f', password: 'Jen', locations: [
			{name: 'Estela',
			lat: 40.724777, 
			lng: -73.994658},
			{name: 'ABC Kitchen',
			lat: 40.738237,
			lng: -73.991126},
			{name: 'Buvette',
			lat: 40.729331,
			lng:  -73.983839}
			]},

			{name: 'Emily', email: 'Emily@Emily.com' , gender: 'f', password: 'Emily', locations: [
			{name: 'Blue Bottle Coffee',
			lat: 40.729331, 
			lng: -73.983839},
			{name: 'Cafe Mogador',
			lat: 40.721577,
			lng: -73.959653},
			{name: 'Bird',
			lat: 40.714248,
			lng:  -73.960202}
			]},

			{name: 'Josh', email: 'Josh@Josh.com' , gender: 'm', password: 'Josh', locations: [ 	
			{name: 'Liquiteria',
			lat: 40.738237, 
			lng:  -73.991126},
			{name: 'Apple',
			lat: 40.752936,
			lng: -73.976896},
			{name: 'ECO Pets NYC',
			lat: 40.719895,
			lng:  -73.963611}
			]},
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
	res.send(req.user)

});

// LOGOUT //
router.get('/logout', function(req, res){
	req.logout();
	res.redirect('/')
});

// LOGIN //
router.post('/login', passport.authenticate('local-login', {
	failureRedirect : '/'}), 
	function(req, res) {
        console.log(req.user);
    	res.send(req.user)
    });

// UPDATE USER Object With a Location object in req.body //
router.put('/:id', function(req, res){
    User.findById(req.params.id, function(err, user) {
        user.locations.push(req.body);
        user.save();

        res.send(user);
    });
});


module.exports = router;

