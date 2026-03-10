import React from "react";
import "./WalletAccounts.css";

function WalletAccounts({ accounts }) {
  const defaultAccounts = [
    { id: 1, name: "Wallet A", balance: 10000, change: 125 },
    { id: 2, name: "Wallet B", balance: 5000, change: 125 },
    { id: 3, name: "Wallet C", balance: 5000, change: 125 },
    { id: 4, name: "Barclays Bank", balance: 5000, change: 125 }
  ];

  const displayAccounts = accounts.length > 0 ? accounts : defaultAccounts;

  return (
    <div className="wallet-accounts">
      <div className="accounts-header">
        <h3>Wallet Accounts</h3>
        <span className="menu-icon">⋮</span>
      </div>
      <div className="accounts-grid">
        {displayAccounts.map((acc, idx) => (
          <div key={idx} className="account-card">
            <div className="account-info">
              <h4>{acc.name}</h4>
              <p className="account-balance">
                {acc.balance?.toLocaleString()}
              </p>
              <span className="account-change">
                +{acc.change} since last hour
              </span>
            </div>
            <button className="account-menu">⋮</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WalletAccounts;