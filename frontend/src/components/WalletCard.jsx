import React from "react";
import "./WalletCard.css";

function WalletCard({ balance, change, onDeposit, onWithdraw, onAddBank }) {
  return (
    <div className="wallet-card">
      {/* Balance Section */}
      <div className="wallet-balance-section">
        <h2>Total Balance</h2>
        <h1>${balance?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h1>
        <p className="balance-change">+{change}% from last month</p>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="btn btn-primary" onClick={onDeposit}>Add to wallet</button>
        <button className="btn btn-secondary" onClick={onWithdraw}>Withdraw</button>
        <button className="btn btn-secondary" onClick={onAddBank}>Add New Account</button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <label>Referral</label>
          <p>2362 USD</p>
          <span>+20.1% from last month</span>
        </div>
        <div className="stat-card">
          <label>Bonus</label>
          <p>2362 USD</p>
          <span>+20.1% from last month</span>
        </div>
      </div>
    </div>
  );
}

export default WalletCard;