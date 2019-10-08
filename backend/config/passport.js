const passport = require('passport')

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const FacebookStrategy = require('passport-facebook')
const LocalStrategy = require('passport-local').Strategy
const JWTstrategy = require('passport-jwt').Strategy

const ExtractJWT = require('passport-jwt').ExtractJwt

const User = require('../models/User')

passport.use(User.createStrategy())

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)
  done(null, user)
})

// JWT config
passport.use(new JWTstrategy({
  secretOrKey: process.env.TOKEN_SECRET,
  jwtFromRequest: ExtractJWT.fromUrlQueryParameter('accessToken')
}, async (token, done) => {
  try {
    return done(null, token.user)
  } catch (error) {
    done(error)
  }
}))

// Signup config
passport.use('signup', new LocalStrategy({
  usernameField: 'email',
}, async (email, password, done) => {
  console.log('callback...', email, password)
  try {
    const user = await User.register({ email }, password)
    return done(null, user, { message: 'User registered ' })
  } catch (error) {
    return done(null, error)
  }
}))

//Facebook Login config
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
        email: profile._json.email,
        facebookId: profile._json.id,
      }).save()
      done(null, newUser)
    }
  })
)

//Google Login config
passport.use(
  new GoogleStrategy({
    // Options for strategy
    callbackURL: '/api/auth/google/redirect',
    clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_SECRET,
    profileFields: ['id', 'displayName', 'name', 'email']
  }, async (accessToken, refreshToken, profile, done) => {
    const currentUser = await User.findOne({ googleId: profile.id })
    if (currentUser) {
      done(null, currentUser)
    }
    else {
      const newUser = await new User({
        email: profile._json.email,
        googleId: profile.id
      }).save()
      done(null, newUser)
    }
  })
)

module.exports = passport