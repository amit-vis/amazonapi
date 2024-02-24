// route for home page and conect all the required route file
const express = require('express');
const router = express.Router();
const homeController = require('../controller/home');

router.get('/', homeController.home);
router.get('/initialize', homeController.fetchData);
router.get('/transaction', homeController.transaction);
router.use('/statics', require('./statics'));
router.use('/combine', require('./combine'));

module.exports = router;