const router = require('express').Router();
const { getCrimes, getCrime, editCrime } = require('../controllers/data-controllers')

// Routes prefix: /api/data

// Gets all crimes
router.get('/crimes', getCrimes)

// Get one crime only
router.get('/crime/:id', getCrime)

// Edit a crime
router.put('/crime/edit/:id', editCrime)



module.exports = router;
