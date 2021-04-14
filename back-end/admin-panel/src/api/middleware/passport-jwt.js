import PassoprtJWT from 'passport-jwt';
import { devConfig } from './../../../src/config/env/development';
import User from '../resources/user/user.model';
import passport from 'passport';

// var JwtStrategy = require('passport-jwt').Strategy,
    // ExtractJwt = require('passport-jwt').ExtractJwt;
export const configureJWTStrategy = () => {
    var opts = {}
opts.jwtFromRequest = PassoprtJWT.ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = devConfig.secret;
passport.use(
    new PassoprtJWT.Strategy(opts, (payload, done) => {
        User.findOne({_id: payload.id}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    }))

}
