import React, { useState } from "react";
import "./Modal.css";

function DepositModal({ open, onClose, onDeposit }) {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");

  const handleDeposit = () => {
    if (amount && Number(amount) > 0) {
      onDeposit(Number(amount), currency);
      setAmount("");
    }
  };

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Deposit to Wallet</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="modal-input"
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="modal-select"
          >
            <option>USD</option>
            <option>EUR</option>
            <option>GBP</option>
          </select>
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-submit" onClick={handleDeposit}>Deposit</button>
        </div>
      </div>
    </div>
  );
}

export default DepositModal;