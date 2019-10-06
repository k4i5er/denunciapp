const passport = require('passport')
const jwt = require('jsonwebtoken')

exports.signup = passport.authenticate('signup', { session: false }), async (req, res, next) => {
  console.log("Success...")
  res.status(201).json({
    message: 'Registro exitoso',
    user: req.user
  })
}

exports.localLogin = (req, res, next) => {
  passport.authenticate('local', function (err, user, info) {
    if (err) { return next(err) }
    if (!user) { return res.status(401).json({ message: 'Username/Password invalid' }) }
    req.logIn(user, function (err) {
      if (err) { return next(err) }
      return next()
    })
  })(req, res, next)
}


exports.logout = (req, res, next) => {
  req.logout()
  res.sendStatus(200).json({ message: 'Logging out' })
}

exports.facebookLogin = passport.authenticate('facebook', {
  scope: [
    'public_profile'
  ]
})

exports.facebookRedirect = (req, res, next) => {
  res.status(200).json({ message: 'Successfully logged in with facebook!', user: req.user._id })
}

exports.googleLogin = passport.authenticate('google', {
  scope: [
    'profile',
    'email'
  ]
})

exports.googleRedirect = (req, res, next) => {
  res.status(200).json({ message: 'Successfully logged in with Google!', user: req.user.email })
}