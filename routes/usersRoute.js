const express = require('express');
const { loginUsers, registerUsers, getUserById, getSavedObjects, getAllUser, errorMethod } = require('../controller/usersController');
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/register', registerUsers)

router.get('/register', errorMethod)

router.post('/login', loginUsers)

router.get('/login', errorMethod)

router.get('/:_id', getUserById)

router.post('/:_id', errorMethod)

router.get('/', getAllUser)

router.post('/saved', auth, getSavedObjects)


module.exports = router;