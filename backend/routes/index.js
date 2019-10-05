const router = require('express').Router();
const passportGoogle = require('passport-google-oauth')
const passportLocal = require('passport-local-mongoose')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

//Logout
router.get('/logout', (req, res, next) => {
  res.send('Logging out')
})

// Login
router.get('/login', (req, res, next) => {
  res.send("Local logging")
})


//Google login
router.get('/google', (req, res, next) => {
  res.send('Logging in with google')
})

module.exports = router;
