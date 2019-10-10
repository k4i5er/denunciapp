const { Schema, model } = require('mongoose')

const profileSchema = new Schema(
  {
    user: {
      ref: 'User',
      type: Schema.Types.ObjectId
    },
    profilePic: String,
    name: String,
    lastName: String,
    reports: [
      {
        ref: 'Report',
        type: Schema.Types.ObjectId
      }
    ],
    userRating: {
      type: Number,
      default: 0
    },
    badge: String
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('Profile', profileSchema)