const mongoose = require('mongoose');

const walletAccountSchema = new mongoose.Schema({
  name: { type: String, required: true },
  balance: { type: Number, default: 0 },
  currency: { type: String, default: 'USD' },
  change: { type: Number, default: 20.1 },
  lastUpdated: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('WalletAccount', walletAccountSchema);