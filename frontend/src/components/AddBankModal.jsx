import React, { useState } from "react";
import "./Modal.css";

function AddBankModal({ open, onClose, onAdd }) {
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [balance, setBalance] = useState("");
  const [currency, setCurrency] = useState("USD");

  const handleAdd = async () => {
    if (bankName && accountNumber) {
      await onAdd({ bankName, accountNumber, balance: Number(balance) || 0, currency });
      setBankName("");
      setAccountNumber("");
      setBalance("");
    }
  };

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Bank Account</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <input
            type="text"
            placeholder="Bank Name"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            className="modal-input"
          />
          <input
            type="text"
            placeholder="Account Number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="modal-input"
          />
          <input
            type="number"
            placeholder="Balance"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
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
          <button className="btn-submit" onClick={handleAdd}>Add Account</button>
        </div>
      </div>
    </div>
  );
}

export default AddBankModal;