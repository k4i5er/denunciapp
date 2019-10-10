const { Schema, model } = require('mongoose')

const reportSchema = new Schema(
  {
    crimeType: {
      ref: 'Crime',
      type: Schema.Types.ObjectId
    },
    date: Date,
    address:{
      street: String,
      suburb: String,
      zipCode: String,
      city: String,
      country: String,
    },
    location: {
      type: {
        default: "Point",
        type: String
      },
      coordinates: [Number],
    },
    photoURL: String,
    isAnonymous: Boolean,
    reportDescription: String,
    rating: {
      type: Number,
      default: 0
    },
    greetings: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

reportSchema.index({location: "2dsphere"})

module.exports = model('Report', reportSchema)