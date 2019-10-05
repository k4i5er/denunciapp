const router = require('express').Router();
const { logout, localLogin, facebookLogin, googleLogin, googleRedirect, facebookRedirect } = require('../controllers/auth-controllers')
const passport = require('passport')

//Logout
router.get('/logout', logout)

// Login
router.get('/login', localLogin)

// Google login
router.get('/google', googleLogin)

// Facebook Login
router.get('/facebook', facebookLogin)

// Callback route to /Facebook redirect
router.get('/facebook/redirect', passport.authenticate('facebook', { scope: 'email' }), facebookRedirect)

// Callback route to Google redirect
router.get('/google/redirect', passport.authenticate('google'), googleRedirect)

module.exports = router;
