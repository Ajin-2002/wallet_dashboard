import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import WalletCard from "../components/WalletCard";
import WalletChart from "../components/WalletChart";
import TransactionTable from "../components/TransactionTable";
import BankAccounts from "../components/BankAccounts";
import WalletAccounts from "../components/WalletAccounts";
import DepositModal from "../components/DepositModal";
import WithdrawModal from "../components/WithdrawModal";
import AddBankModal from "../components/AddBankModal";
import "./Dashboard.css";

function Dashboard() {
  const [balance, setBalance] = useState(0);
  const [change, setChange] = useState(20.1);
  const [transactions, setTransactions] = useState([]);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [walletAccounts, setWalletAccounts] = useState([]);

  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showAddBank, setShowAddBank] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Fix ESLint warning: disable warning for loadAllData dependency
  useEffect(() => {
    loadAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    await Promise.all([
      loadWallet(),
      loadTransactions(),
      loadBankAccounts(),
      loadWalletAccounts()
    ]);
    setLoading(false);
  };

  const loadWallet = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/api/wallet/balance`)
      .then(res => res.json())
      .then(data => {
        setBalance(data.balance || 0);
        setChange(data.lastMonthChange || 20.1);
      })
      .catch(err => console.error("Error loading wallet:", err));
  };

  const loadTransactions = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/api/wallet/transactions`)
      .then(res => res.json())
      .then(data => setTransactions(Array.isArray(data) ? data : []))
      .catch(err => console.error("Error loading transactions:", err));
  };

  const loadBankAccounts = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/api/bank-accounts`)
      .then(res => res.json())
      .then(data => setBankAccounts(Array.isArray(data) ? data : []))
      .catch(err => console.error("Error loading bank accounts:", err));
  };

  const loadWalletAccounts = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/api/wallet-accounts`)
      .then(res => res.json())
      .then(data => setWalletAccounts(Array.isArray(data) ? data : []))
      .catch(err => console.error("Error loading wallet accounts:", err));
  };

  const handleDeposit = async (amount, currency) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/wallet/deposit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, currency })
      });
      if (res.ok) {
        setShowDeposit(false);
        loadAllData();
      }
    } catch (err) {
      console.error("Error depositing:", err);
    }
  };

  const handleWithdraw = async (amount, currency) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/wallet/withdraw`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, currency })
      });
      if (res.ok) {
        setShowWithdraw(false);
        loadAllData();
      }
    } catch (err) {
      console.error("Error withdrawing:", err);
    }
  };

  const handleAddBank = async (data) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/bank-accounts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        setShowAddBank(false);
        loadBankAccounts();
      }
    } catch (err) {
      console.error("Error adding bank account:", err);
    }
  };

  if (loading) {
    return (
      <div className="dashboard">
        <Navbar />
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Navbar />

      <div className="dashboard-container">
        <div className="left-panel">
          <WalletCard
            balance={balance}
            change={change}
            onDeposit={() => setShowDeposit(true)}
            onWithdraw={() => setShowWithdraw(true)}
            onAddBank={() => setShowAddBank(true)}
          />
        </div>

        <div className="right-panel">
          <div className="chart-wrapper">
            <WalletChart />
          </div>
          <div className="transactions-wrapper">
            <TransactionTable transactions={transactions} />
          </div>
        </div>
      </div>

      <div className="bank-accounts-section">
        <BankAccounts accounts={bankAccounts} />
      </div>

      <div className="wallet-accounts-section">
        <WalletAccounts accounts={walletAccounts} />
      </div>

      <DepositModal
        open={showDeposit}
        onClose={() => setShowDeposit(false)}
        onDeposit={handleDeposit}
      />
      <WithdrawModal
        open={showWithdraw}
        onClose={() => setShowWithdraw(false)}
        onWithdraw={handleWithdraw}
      />
      <AddBankModal
        open={showAddBank}
        onClose={() => setShowAddBank(false)}
        onAdd={handleAddBank}
      />
    </div>
  );
}

export default Dashboard;