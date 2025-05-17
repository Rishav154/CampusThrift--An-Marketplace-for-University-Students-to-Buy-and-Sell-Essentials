require('dotenv').config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/User");

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            const existingUser = await User.findOne({email: profile.emails[0].value});

            if (existingUser) {
                return done(null, existingUser);
            }

            const newUser = new User({
                fullname: {
                    firstname: profile.name.givenName,
                    lastname: profile.name.familyName,
                },
                email: profile.emails[0].value,
                phone: 9999999999,
                university: "N/A",
                course: "N/A",
                yearOfGrad: 0,
                password: await User.hashPassword("dummy_password"),
                googleSignIn: true,
            });

            await newUser.save();
            done(null, newUser);
        } catch (err) {
            done(err, null);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => done(null, user));
});
