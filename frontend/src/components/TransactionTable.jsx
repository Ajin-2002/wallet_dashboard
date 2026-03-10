import React from "react";
import "./TransactionTable.css";

function TransactionTable({ transactions }) {
  return (
    <div className="transaction-table">
      <div className="table-header">
        <h3>Transaction History</h3>
        <button className="menu-btn">⋮</button>
      </div>

      <div className="table-content">
        {transactions.length === 0 ? (
          <div className="empty-state">No transactions yet</div>
        ) : (
          <div className="transaction-list">
            {transactions.map((t, i) => (
              <div key={i} className="transaction-item">
                <div className="tx-left">
                  <p className="tx-title">
                    {t.type === "deposit" ? "Added to Wallet" : "Withdrawn"}
                  </p>
                  <p className="tx-date">
                    {new Date(t.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: '2-digit', 
                      year: 'numeric'
                    })}
                    {' '}
                    {new Date(t.date).toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit',
                      hour12: true
                    })}
                  </p>
                </div>
                <div className="tx-right">
                  <p className={`tx-amount ${t.type === "deposit" ? "positive" : "negative"}`}>
                    {t.type === "deposit" ? "+" : "-"}{t.amount.toLocaleString()} {t.currency}
                  </p>
                  <span className={`tx-status ${t.status.toLowerCase()}`}>
                    {t.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TransactionTable;