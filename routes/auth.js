const express = require('express');
const passport = require('passport');
const router = express.Router();

// auth login
router.get('/login', (req, res) => {
    res.render('login'); // This renders the login.ejs view
});

// auth logout
router.get('/logout', (req,res) => {
    //res.send('logging out');
    req.logout((error) => {
        if (err) return next(err);
        req.session.destroy(() => {
            res.redirect('/');  // Redirect to home or login page.
        })
    })
})

// auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],  // Request profile and email
    prompt: 'consent'
}))

// Google OAuth callback
router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/api-docs'); // Redirect to a protected route on successful login
    }
);


module.exports = router;