var mongoose = require('mongoose');
var Locations = require('./location.js').schema;
var bcrypt = require('bcrypt-nodejs');


var userSchema = mongoose.Schema({
	name: String,
	email: String,
	gender: String,
	password: String,
	locations: [Locations]
});

// HASH THE PASSWORD //
userSchema.methods.hash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// CHECK PASSWORD IS VALID //
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('User', userSchema);
