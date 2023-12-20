const express = require('express');
const { addPlaces, getPlacesById, savePlaces, unsavePlaces } = require('../controller/placesController');
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/add', addPlaces);

router.get('/list/:_id', auth, getPlacesById);

router.put('/list/:_id/save',auth, savePlaces);

router.put('/list/:_id/unsave', auth, unsavePlaces);

module.exports = router;