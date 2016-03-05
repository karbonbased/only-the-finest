var express = require('express'),
    router  = express.Router();

var User      = require('../models/user'),
    Locations  = require('../models/location');


router.get('/', function(req, res) {
	Locations.find(function(err, locations) {
		res.send('map stuff goes here')
		//res.render('locations/index.ejs', { locations: locations });
	});
});

router.get('/json', function(req, res) {
	Locations.find(function(err, location) {
		res.send(location);
	});
});

module.exports = router;