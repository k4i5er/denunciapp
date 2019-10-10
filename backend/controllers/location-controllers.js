const Report = require('../models/Report')
const Profile = require('../models/Profile')

exports.sendReport = async (req, res, next) => {
  const {
    userId,
    crimeTypeId,
    street,
    suburb,
    zipCode,
    city,
    country,
    dateReport,
    timeReport,
    anonymous,
    description,
    lat,
    long } = req.body
  console.log(req.body)
  await Report.findOne({user:userId}, (err, report) => {
    report.crimeType = crimeTypeId
    report.date = new Date(`${dateReport} ${timeReport}`)
    report.address.street = street
    report.address.suburb = suburb
    report.address.zipCode = zipCode
    report.address.city = city
    report.address.country = country
    report.isAnonymous = anonymous
    report.description = description
    report.location.coordinates = [long, lat]
    report.save()
  })
  await Profile.
  
  res.status(201).json({message: 'Report created'})
}