const express = require('express');
const { getAllObject, addObject, getObjectById } = require('../controller/objectController');

const router = express.Router()

router.get('/list', getAllObject);

router.post('/add', addObject);

router.get('/list/:_id', getObjectById);

module.exports = router;