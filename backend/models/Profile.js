const { Schema, model } = require('mongoose')

const profileSchema = new Schema({
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
  ]
})

module.exports = model('Profile', profileSchema)