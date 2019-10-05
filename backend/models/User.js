const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    googleId: String,
    facebookId: String,
    email: String,
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('User', userSchema)
