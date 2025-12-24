import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"; // Make sure to create this CSS file

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const isLoggedIn = !!token;
  const avatarLetter = username ? username[0].toUpperCase() : "";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login"); // redirect to login after logout
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light border-bottom bg-white fixed-top">
      <div className="container p-2">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <img
            src="media/images/logo.svg"
            className="img-fluid"
            style={{ maxWidth: 120 }}
            alt="StockBaar Logo"
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item me-4">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item me-4">
              <Link className="nav-link" to="/support">Support</Link>
            </li>
            <li className="nav-item me-4">
              <Link className="nav-link" to="/product">Products</Link>
            </li>
            <li className="nav-item me-4">
              <Link className="nav-link" to="/pricing">Pricing</Link>
            </li>

            {!isLoggedIn ? (
              <>
                <li className="nav-item me-3">
                  <Link className="nav-link" to="/signup">Signup</Link>
                </li>
                <li className="nav-item me-3">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              </>
            ) : (
              <li className="nav-item d-flex align-items-center me-3">
                
                {/* Logout */}
                <button className="btn btn-link nav-link" onClick={handleLogout}>
                  Logout
                </button>
                {/* Avatar */}
                <div className="navbar-avatar" title={username}>
                  {avatarLetter}
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
