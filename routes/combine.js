// route for combine data
const express = require('express');
const router = express.Router();
const combinedController = require('../controller/combined');

router.get('/combined-data', combinedController.combinedData);

module.exports = router