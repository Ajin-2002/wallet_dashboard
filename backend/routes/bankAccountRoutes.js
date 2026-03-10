const express = require('express');
const router = express.Router();
const bankAccountController = require('../controllers/bankAccountController');

router.post('/', bankAccountController.addBankAccount);
router.get('/', bankAccountController.getBankAccounts);
router.delete('/:id', bankAccountController.deleteBankAccount);

module.exports = router;