//var passport = require('passport');
var User = require('../models/user.js');
var LocalStrategy   = require('passport-local').Strategy;
var passport = require('passport');

module.exports = function(passport) {
console.log("passport file recognized")

// ENCRYPT
////////////////////////////////////////////////

// REQUIRED FOR PERSISTANT LOGIN SESSIONS
// PASSPORT NEEDS TO SERIALIZE AND DESERIALIZE USERS FROM SESSION

  // USED TO SERIALIZE THE USER FOR THE SESSION
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });


    // SET UP THE LOCAL STRATEGY FOR SIGN-UP
passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {

        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'email' :  email }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {
                return done(null, false);
            } else {

                // if there is no user with that email
                // create the user
                var newUser            = new User();

                // set the user's local credentials
                newUser.name = req.body.name;
                newUser.gender = req.body.gender;
                newUser.email    = email;
                newUser.password = newUser.hash(password);

                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        });    

        });

    }));

// SIGN IN LOCAL STRATEGY
 passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false, console.log('No user found')); 

            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false, console.log('Wrong password.'));

            // all is well, return successful user
            return done(null, user);
        });

    }));

} // close module exports