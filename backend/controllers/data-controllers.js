const jwt = require('jsonwebtoken')
const Crime = require('../models/Crime')

exports.getCrimes =  (req, res, next) => {
  Crime.find()
    .then(crime => {
      console.log(crime)
      return res.status(200).json({crime})
    }).catch(err =>{
    console.log("Error",err)
    })
  
}

exports.getCrime = (req, res, next) => {
  Crime.findOne({_id: req.params.id})
    .then(crime => {
      console.log(crime)
      return res.status(200).json({crime: crime.crimeName})
    }).catch(err =>{
      console.log("Error",err)
    })
}

exports.editCrime = async (req,res,next) => {
  try {
    await Crime.findOne({ _id: req.body.crimeId }, (err, crime) => {
      crime.crimeName = req.body.crimeName
    }).save()
    return res.status(201).json({ message: 'Actualizado' })
  } catch (err) {
    return res.status(500).json({message: 'Hubo un error'})
  }
}

exports.deleteCrime = async (req, res, next) => {
  try {
    await Crime.findOneAndDelete({ _id: req.body.crimeId })
    return res.status(200).json({message: 'Registro eliminado'})
  } catch (err) {
    return res.status(500).json({message: 'Hubo un error'})
  }
}

