const WalletAccount = require('../models/WalletAccount');

exports.addWalletAccount = async (req, res) => {
  try {
    const { name, balance, currency } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required' });
    
    const account = new WalletAccount({ name, balance: balance || 0, currency });
    await account.save();
    res.status(201).json(account);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getWalletAccounts = async (req, res) => {
  try {
    const accounts = await WalletAccount.find();
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteWalletAccount = async (req, res) => {
  try {
    const { id } = req.params;
    await WalletAccount.findByIdAndDelete(id);
    res.json({ message: 'Account deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};