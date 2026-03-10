import React from "react";
import "./BankAccounts.css";

function BankAccounts({ accounts }) {
  const defaultAccounts = [
    { id: 1, bankName: "Citi Bank", accountNumber: "****1234", balance: 5000000, currency: "USD", change: 20.1 },
    { id: 2, bankName: "Barclays Bank", accountNumber: "****5678", balance: 120353, currency: "USD", change: 20.1 },
    { id: 3, bankName: "Axis Bank", accountNumber: "****9012", balance: 110353, currency: "USD", change: 20.1 },
    { id: 4, bankName: "Barclays Bank", accountNumber: "****3456", balance: 110353, currency: "USD", change: 20.1 }
  ];

  const displayAccounts = accounts.length > 0 ? accounts : defaultAccounts;

  return (
    <div className="bank-accounts">
      <div className="accounts-header">
        <h3>Associated Bank Accounts</h3>
        <span className="menu-icon">⋮</span>
      </div>
      <div className="bank-cards-grid">
        {displayAccounts.map((acc, idx) => (
          <div key={idx} className="bank-card-item">
            <div className="bank-card-header">
              <h4>{acc.bankName}</h4>
              <button className="bank-menu">⋮</button>
            </div>
            <p className="bank-balance">
              {(acc.balance / 1000).toLocaleString()} K
            </p>
            <span className="bank-change">
              +{acc.change || 20.1}% since last hour
            </span>
            <p className="bank-account-number">{acc.accountNumber}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BankAccounts;