const Wallet = require('../models/Wallet');

async function getOrCreateWallet() {
  let wallet = await Wallet.findOne();
  if (!wallet) {
    wallet = new Wallet({ userId: 'default' });
    await wallet.save();
  }
  return wallet;
}

exports.getBalance = async (req, res) => {
  try {
    const wallet = await getOrCreateWallet();
    res.json({ 
      balance: wallet.balance || 0, 
      currency: wallet.currency || 'USD',
      lastMonthChange: wallet.lastMonthChange || 20.1
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deposit = async (req, res) => {
  try {
    const { amount, currency = 'USD' } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }
    const wallet = await getOrCreateWallet();
    wallet.balance += amount;
    wallet.transactions.push({ 
      type: 'deposit', 
      amount, 
      currency,
      status: 'Success'
    });
    await wallet.save();
    res.json(wallet);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.withdraw = async (req, res) => {
  try {
    const { amount, currency = 'USD' } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }
    const wallet = await getOrCreateWallet();
    if (wallet.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }
    wallet.balance -= amount;
    wallet.transactions.push({ 
      type: 'withdraw', 
      amount, 
      currency,
      status: 'Success'
    });
    await wallet.save();
    res.json(wallet);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const wallet = await getOrCreateWallet();
    res.json(wallet.transactions.sort((a, b) => b.date - a.date));
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getChartData = async (req, res) => {
  try {
    const wallet = await getOrCreateWallet();
    const dataByDate = {};
    wallet.transactions.forEach(tx => {
      const date = new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
      dataByDate[date] = (dataByDate[date] || 0) + (tx.type === 'deposit' ? tx.amount : -tx.amount);
    });
    res.json(dataByDate);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};