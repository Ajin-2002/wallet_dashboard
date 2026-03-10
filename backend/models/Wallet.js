const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  type: { type: String, enum: ['deposit', 'withdraw'], required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['Success', 'Pending', 'Failed'], default: 'Success' },
  description: String
});

const walletSchema = new mongoose.Schema({
  userId: String,
  balance: { type: Number, default: 0 },
  currency: { type: String, default: 'USD' },
  transactions: [transactionSchema],
  lastMonthChange: { type: Number, default: 20.1 }
}, { timestamps: true });

module.exports = mongoose.model('Wallet', walletSchema);