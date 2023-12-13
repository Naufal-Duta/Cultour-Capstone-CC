const express = require('express');
const { loginUsers, registerUsers, getUserById, getSavedObjects, getAllUser, getRegisterUsers } = require('../controller/usersController');
const {verifyRegister} = require('../middleware/verifyRegister')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/register', registerUsers)

router.get('/register', getRegisterUsers)

router.post('/login', loginUsers)

router.get('/:_id', getUserById)

router.get('/', getAllUser)

router.post('/saved', auth, getSavedObjects)


module.exports = router;