const router = require('express').Router();
const { signup, logout, localLogin, facebookLogin, googleLogin, googleRedirect, facebookRedirect } = require('../controllers/auth-controllers')
const passport = require('../config/passport')

// Routes prefix: /api/auth

// Signup
router.post('/signup', signup, (req, res, next) => {
  res.status(201).json({ message: 'User signed up' })
})

// Logout
router.get('/logout', logout)

// Local Login
router.post('/login', localLogin,
  (req, res, next) => {
    res.status(200).json({ message: 'Successfully logged in with local credentials', username: req.user.email })
  })

// Google Login
router.get('/google', googleLogin)

// Facebook Login
router.get('/facebook', facebookLogin)

// Callback route to Facebook redirect
router.get('/facebook/redirect', passport.authenticate('facebook', { scope: 'email' }), facebookRedirect)

// Callback route to Google redirect
router.get('/google/redirect', passport.authenticate('google', { scope: 'email' }), googleRedirect)

module.exports = router;
