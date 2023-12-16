const express = require('express');
const { getAllObject, addObject, getObjectById, saveObject, unsaveObject } = require('../controller/objectController');
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/add', addObject);

router.get('/list/:_id', auth, getObjectById);

router.put('/list/:_id/save',auth, saveObject);

router.put('/list/:_id/unsave', auth, unsaveObject);

module.exports = router;