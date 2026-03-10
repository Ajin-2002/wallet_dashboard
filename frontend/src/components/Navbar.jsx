import React, { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [activeLink, setActiveLink] = useState("home");

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left Section - User Profile */}
        <div className="navbar-left">
          <div className="user-profile">
            <div className="avatar">AJ</div>
            <span className="username">Ajin</span>
            <button className="dropdown-btn">▼</button>
          </div>
        </div>

        {/* Center Section - Navigation Links */}
        <div className="navbar-center">
          <a
            href="#home"
            className={`nav-link ${activeLink === "home" ? "active" : ""}`}
            onClick={() => setActiveLink("home")}
          >
            Home
          </a>
          <a
            href="#customers"
            className={`nav-link ${activeLink === "customers" ? "active" : ""}`}
            onClick={() => setActiveLink("customers")}
          >
            Customers
          </a>
          <a
            href="#settings"
            className={`nav-link ${activeLink === "settings" ? "active" : ""}`}
            onClick={() => setActiveLink("settings")}
          >
            Settings
          </a>
        </div>

        {/* Right Section - Search */}
        <div className="navbar-right">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;