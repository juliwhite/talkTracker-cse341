//const passport = require('passport') // to handled authentication
const GoogleStrategy = require('passport-google-oauth20').Strategy  // allow user to sign in with their google account. 
const mongoose = require('mongoose') // to interact with mondoDB database
const User = require('../models/User')  // a MondoDB model for storing user data in database.

module.exports = function(passport){
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
        // TEST
        //console.log(profile)

        // Here we will save in the database. Build a new user object. the new user should mathc with the user schema.
        //const { id, displayName, name: { givenName, familyName }, photos } = profile;
        const newUser = {
            googleID: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value
        }

        try {
            let user = await User.findOne({ googleID: profile.id })
            if(user) {  // if user exists
                // we call the callback
                done(null, user)
            } else {
                // if not user then we will create the user.
                user = await User.create(newUser)
                done(null, user)
            }
        } catch(err) {
            console.error(error)
        }

    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);  // Replace with your model name
            done(null, user);
          } catch (err) {
            done(err);
          }
    })
};