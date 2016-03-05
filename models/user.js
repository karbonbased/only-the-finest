var mongoose = require('mongoose');


var userSchema = mongoose.Schema({
	name: String,
	userName: String,
	email: String,
	gender: String,
	password: String
});




module.exports = mongoose.model('User', userSchema);