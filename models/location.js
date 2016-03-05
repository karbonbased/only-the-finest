var mongoose = require('mongoose');

var locationSchema = mongoose.Schema({
	name: String,
	lat: Number,
	lng: Number
})

module.exports = mongoose.model('Location', locationSchema);