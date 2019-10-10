const router = require('express').Router();
const { sendReport  } = require('../controllers/location-controllers')

router.post('/report', sendReport)

module.exports = router