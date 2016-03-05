var mongoose = require('mongoose');
var Locations = require('./location.js').schema;

var userSchema = mongoose.Schema({
	name: String,
	email: String,
	gender: String,
	password: String,
	locations: [Locations]
});




module.exports = mongoose.model('User', userSchema);