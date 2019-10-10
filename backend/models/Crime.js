const { Schema, model } = require('mongoose')

const crimeSchema = new Schema(
  {
    crimeName: String,
    crimeImg: String,
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('Crime', crimeSchema)