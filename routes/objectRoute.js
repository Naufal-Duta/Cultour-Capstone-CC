const express = require('express');
const { getAllObject, addObject, getObjectById, saveObject, unsaveObject } = require('../controller/objectController');

const router = express.Router()

router.post('/add', addObject);

router.get('/list', getAllObject);

router.get('/list/:_id', getObjectById);

router.put('/list/:_id/save', saveObject);

router.put('/list/:_id/unsave', unsaveObject);

module.exports = router;