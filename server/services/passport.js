const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


// setup options for jwt strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// create jwt strategy
// payload contain sub and iat user id and timestamp
// done is the call func that the user is successfully authenticated
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
    User.findById(payload.sub, function (err, user) {
        // if it not connected to the database
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        }
        else {
            // because it dont find the user
            return done(null, false);
        }
    })
})

// tell passport to use this strategy
passport.use(jwtLogin);
