const BankAccount = require('../models/BankAccount');

exports.addBankAccount = async (req, res) => {
  try {
    const { bankName, accountNumber, balance, currency } = req.body;
    if (!bankName || !accountNumber) return res.status(400).json({ message: 'Missing fields' });
    
    const account = new BankAccount({ bankName, accountNumber, balance: balance || 0, currency });
    await account.save();
    res.status(201).json(account);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getBankAccounts = async (req, res) => {
  try {
    const accounts = await BankAccount.find();
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteBankAccount = async (req, res) => {
  try {
    const { id } = req.params;
    await BankAccount.findByIdAndDelete(id);
    res.json({ message: 'Account deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};