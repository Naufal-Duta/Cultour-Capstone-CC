const express = require('express');
const { loginUsers, registerUsers, errorMethod } = require('../controller/usersController');
const errorMiddleware = require('../middleware/errorMiddleware');

const router = express.Router()

router.post('/register', registerUsers)

router.get('/register', errorMiddleware, errorMethod)

router.post('/login', loginUsers)

router.get('/login', errorMethod)

module.exports = router;