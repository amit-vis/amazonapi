// route for the statics
const express = require('express');
const router = express.Router();
const staticsController = require('../controller/statics');

router.get('/total-sale-amount', staticsController.totalSaleAmount);
router.get('/total-sold-item', staticsController.totalSoldItems);
router.get('/total-notsold-item', staticsController.totalNotSoldItem);
router.get('/price-range-data', staticsController.getPriceRangeData);
router.get('/category-data', staticsController.categoryData)


module.exports = router;