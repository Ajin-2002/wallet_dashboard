const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');

router.get('/balance', walletController.getBalance);
router.post('/deposit', walletController.deposit);
router.post('/withdraw', walletController.withdraw);
router.get('/transactions', walletController.getTransactions);
router.get('/chart-data', walletController.getChartData);

module.exports = router;