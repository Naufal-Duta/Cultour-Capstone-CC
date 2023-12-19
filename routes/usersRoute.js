const express = require('express');
const {getUserById, getSavedObjects, getAllUser, errorMethod } = require('../controller/usersController');
const auth = require('../middleware/auth');
const errorMiddleware = require('../middleware/errorMiddleware');

const router = express.Router()

router.get('/:_id', getUserById)

router.post('/:_id', errorMethod)

router.get('/', getAllUser)

router.post('/saved', auth, getSavedObjects)

module.exports = router;