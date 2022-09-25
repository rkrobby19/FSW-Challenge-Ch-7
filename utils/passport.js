const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const opts = {};
const { User } = require("../models");

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "Auth Key";

passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done) {
        const userData = await User.findOne({
            where: {
                email: jwt_payload.email,
            },
        });
        if (userData) {
            return done(null, {
                id: userData.id,
                username: userData.username,
                email: userData.email,
                role: userData.role,
            });
        } else {
            return done(null, false);
        }
    })
);
