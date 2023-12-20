const express = require('express');
const {getAllAttractions, getPlacesById} = require('../controller/placesController');
const auth = require('../middleware/auth');

const router = express.Router()

router.get('/', getAllAttractions)

router.get('/:id', getPlacesById)

module.exports = router;