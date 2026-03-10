const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

const userRoutes = require('./routes/userRoutes');
const walletRoutes = require('./routes/walletRoutes');
const bankAccountRoutes = require('./routes/bankAccountRoutes');
const walletAccountRoutes = require('./routes/walletAccountRoutes');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/users', userRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/bank-accounts', bankAccountRoutes);
app.use('/api/wallet-accounts', walletAccountRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
