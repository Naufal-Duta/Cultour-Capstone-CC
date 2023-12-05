const express = require('express');
const { loginUsers, registerUsers } = require('../controller/usersController');
const {verifyRegister} = require('../middleware/verifyRegister')

const router = express.Router()

router.post('/register', verifyRegister, registerUsers)

router.post('/login', loginUsers)

module.exports = router;