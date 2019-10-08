const router = require('express').Router();
const { secureRoute, signup, logout, localLogin, facebookLogin, googleLogin, googleRedirect, facebookRedirect } = require('../controllers/auth-controllers')
const passport = require('../config/passport')

// Routes prefix: /api/auth

// Signup
router.post('/signup', passport.authenticate('signup', { session: false }), signup)

// Logout
router.get('/logout', logout)

// Local Login
router.post('/login', localLogin)

// Google Login
router.get('/google', googleLogin)

// Facebook Login
router.get('/facebook', facebookLogin)

// Callback route to Facebook redirect
router.get('/facebook/redirect', passport.authenticate('facebook', { scope: 'email' }), facebookRedirect)

// Callback route to Google redirect
router.get('/google/redirect', passport.authenticate('google', { scope: 'email' }), googleRedirect)

// Secure route
router.get('/profile', passport.authenticate('jwt', { session: false }), secureRoute)

module.exports = router;
