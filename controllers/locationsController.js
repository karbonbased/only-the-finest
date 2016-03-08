var express = require('express'),
    router  = express.Router();

var User      = require('../models/user'),
    Locations  = require('../models/location');


router.get('/', function(req, res) {
	Locations.find(function(err, locations) {
		res.send(locations)
		//res.render('locations/index.ejs', { locations: locations });
	});
});

router.get('/json', function(req, res) {
	Locations.find(function(err, location) {
		res.send(location);
	});
});

router.post('/', function(req, res) {
	Locations.create(req.body, function(err, locations) {
		res.send(locations);
	});
});

// SEED ROUTE FOR USERS
router.get('/seed', function(req, res){
var locations = [
		{name: 'Prospect Park',
		lat: 40.660301, 
		lng: -73.968977},

		{name: 'Columbus Circle',
		lat: 40.768280,
		lng: -73.982351},

		{name: 'General Assembly',
		lat: 40.740047,
		lng: -73.990092},

		{name: 'Brooklyn Navy Yard',
		lat: 40.699671,
		lng: -73.973941},

		{name: 'PS1',
		lat: 40.745507, 
		lng: -73.946899},

		{name: 'Starrett City',
		lat: 40.650274,
		lng: -73.883603},

		{name: 'Flushing Meadows',
		lat: 40.739762, 
		lng: -73.840828},

		{name: 'Sumner Houses',
		lat: 40.697482, 
		lng: -73.940075},

		{name: 'Estela',
		lat: 40.724777, 
		lng: -73.994658},

		{name: 'ABC Kitchen',
		lat: 40.738237,
		lng: -73.991126},

		{name: 'Buvette',
		lat: 40.729331,
		lng:  -73.983839},

		{name: 'Blue Bottle Coffee',
		lat: 40.729331, 
		lng: -73.983839},

		{name: 'Cafe Mogador',
		lat: 40.721577,
		lng: -73.959653},

		{name: 'Bird',
		lat: 40.714248,
		lng:  -73.960202},
		
		{name: 'Liquiteria',
		lat: 40.738237, 
		lng:  -73.991126},

		{name: 'Apple',
		lat: 40.752936,
		lng: -73.976896},

		{name: 'ECO Pets NYC',
		lat: 40.719895,
		lng:  -73.963611}

	];

	// CREATE THE SEEDED LOCATIONS IN DB


	Locations.create(locations, function(err, locations){
		res.redirect('/');
	});
});


module.exports = router;