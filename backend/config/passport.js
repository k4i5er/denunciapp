const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const FacebookStrategy = require('passport-facebook')
const User = require('../models/User')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)
  done(null, user)
})

passport.use(
  new FacebookStrategy({
    callbackURL: '/api/auth/facebook/redirect',
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    profileFields: ['id', 'displayName', 'name', 'email']
  }, async (accessToken, refreshToken, profile, done) => {
    // profile: id,username,displayName,name,gender,profileUrl,provider,_raw,_json
    // console.log('Profile: ', profile)
    // console.log(`profile: ${profile._json.first_name}, ${profile._json.last_name}, ${profile._json.email}, ${profile._json.id}`)
    const currentUser = await User.findOne({ facebookId: profile._json.id })
    if (currentUser) {
      done(null, currentUser)
    }
    else {
      const newUser = await new User({
        username: profile._json.email,
        facebookId: profile._json.id,
      }).save()
      done(null, newUser)
    }
  })
)

passport.use(
  new GoogleStrategy({
    // Options for strategy
    callbackURL: '/api/auth/google/redirect',
    clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_SECRET
  }, async (accessToken, refreshToken, profile, done) => {
    const currentUser = await User.findOne({ googleId: profile.id })
    if (currentUser) {
      done(null, currentUser)
    }
    else {
      const newUser = await new User({
        username: profile.displayName,
        googleId: profile.id
      }).save()
      done(null, newUser)
    }
  })
)