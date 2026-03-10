const express = require('express');
const router = express.Router();
const walletAccountController = require('../controllers/walletAccountController');

router.post('/', walletAccountController.addWalletAccount);
router.get('/', walletAccountController.getWalletAccounts);
router.delete('/:id', walletAccountController.deleteWalletAccount);

module.exports = router;