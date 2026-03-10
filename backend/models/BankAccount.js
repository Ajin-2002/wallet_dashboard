const mongoose = require('mongoose');

const bankAccountSchema = new mongoose.Schema({
  bankName: { type: String, required: true },
  accountNumber: { type: String, required: true },
  balance: { type: Number, default: 0 },
  currency: { type: String, default: 'USD' },
  change: { type: Number, default: 20.1 },
  lastUpdated: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('BankAccount', bankAccountSchema);