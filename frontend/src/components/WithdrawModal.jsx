import React, { useState } from "react";
import "./Modal.css";

function WithdrawModal({ open, onClose, onWithdraw }) {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");

  const handleWithdraw = () => {
    if (amount && Number(amount) > 0) {
      onWithdraw(Number(amount), currency);
      setAmount("");
    }
  };

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Withdraw from Wallet</h2>
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
          <button className="btn-submit" onClick={handleWithdraw}>Withdraw</button>
        </div>
      </div>
    </div>
  );
}

export default WithdrawModal;