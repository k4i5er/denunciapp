const passport = require('passport')
// const User = require('../models/User')
module.exports = () => (req, res, next) => {
  passport.authenticate('local', function (err, user, info) {
    if (err) { return next(err) }
    if (!user) { return res.status(401).json({ message: 'Username/Password invalid' }) }
    req.logIn(user, function (err) {
      if (err) { return next(err) }
      return next()
    })
  })(req, res, next)
}