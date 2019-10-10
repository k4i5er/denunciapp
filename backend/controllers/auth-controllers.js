const passport = require('../config/passport')
const jwt = require('jsonwebtoken')
const Profile = require('../models/Profile')

exports.secureRoute = (req, res, next) => {
  res.json({ message: 'Protected route, welcome', username: req.user, accessToken: req.query.accessToken })
}

exports.signup = async (req, res, next) => {
  console.log("Success...")
  await Profile.create(
    {
      user: req.user._id
    }
  )
  return res.status(201).json({ message: 'Registro exitoso', user: req.user.email, id: req.user._id })
}

exports.localLogin = async (req, res, next) => {
  passport.authenticate('local', async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error('An error ocurred', err)
        return next(error)
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error)
        const body = { _id: user._id, email: user.email }
        const bearer = jwt.sign({ user: body }, process.env.TOKEN_SECRET)
        Profile.findOne({ user: user._id }, (err, userProfile) => {
          return res.json({ bearer, id: user._id, name: userProfile.firstName, lastName: userProfile.lastName })
        })
      })
    } catch (error) {
      return next(error)
    }
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
  const body = { _id: user._id, email: user.email }
  const bearer = jwt.sign({ user: body }, process.env.TOKEN_SECRET)
  return res.status(200).json({ bearer })
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