const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
require('dotenv').config();

const options = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
}

const strategy = new JWTStrategy(options, async function (jwt_payload, done) {
    try {
       await User.findOne({_id: jwt_payload.id}, (err, user) => {
            if (user) {
                return done(null, user);
            } else {
                return done(null, err);
            }   
        }).select("-password");
         
    } catch (error) {

    }
      })


module.exports = (passport) => {
    passport.use(strategy);
}