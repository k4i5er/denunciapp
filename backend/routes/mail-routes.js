const express = require('express')
const router = express.Router()
const { sendMail } = require('../controllers/mail-controllers')

router.post('/send', sendMail)

module.exports = router