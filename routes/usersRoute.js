const express = require('express');
const { loginUsers, registerUsers } = require('../controller/usersController');


const router = express.Router()

router.post('/register', registerUsers)

router.post('/login', loginUsers)

module.exports = router;