const axios = require('axios');
const express = require('express')
const {recommendPlace, busNearRecommendedPlace, restaurantNearRecommendedPlace, hotelNearRecommendedPlace} = require('../controller/recommendController')

const router = express.Router()

router.post('/', recommendPlace)
router.post('/bus', busNearRecommendedPlace)
router.post('/restaurant', restaurantNearRecommendedPlace)
router.post('/hotel', hotelNearRecommendedPlace)


module.exports = router;