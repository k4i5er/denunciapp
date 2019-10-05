const { Schema, model } = require('mongoose')

const reportSchema = new Schema(
  {
    crimeType: ref('Crime'),
    timestamp: Date,
    location: {
      type: {
        default: "Point",
        type: "String",
      }
    },
    coordinates: [Number],
    photo: String,
    isAnonymous: Boolean,
    reportDescription: String,
    comments: [
      {
        comment: String,
        user: {
          ref: 'Profile',
          type: Schema.Types.ObjectId
        }
      }
    ],
    greetings: Number
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('Report', reportSchema)