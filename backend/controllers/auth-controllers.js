const passport = require('passport')

exports.localLogin = (req, res, next) => {
  res.sendStatus(200).json({ message: 'Logging in local' })
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
  res.status(200).json({ message: 'Successfully logged in with Google!', user: req.user.username })
}