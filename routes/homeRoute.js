const express = require('express');
const {getAllAttractions, getObjectById} = require('../controller/objectController');
const auth = require('../middleware/auth');

const router = express.Router()

router.get('/', getAllAttractions)

router.get('/:id', getObjectById)

module.exports = router;