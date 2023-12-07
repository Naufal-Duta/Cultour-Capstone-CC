const express = require('express');
const { loginUsers, registerUsers, getUserById, getSavedObjects, getAllUser } = require('../controller/usersController');
const {verifyRegister} = require('../middleware/verifyRegister')

const router = express.Router()

router.post('/register', verifyRegister, registerUsers)

router.post('/login', loginUsers)

router.get('/:_id', getUserById)

router.get('/', getAllUser)

router.get('/:_id/saved', getSavedObjects)


module.exports = router;