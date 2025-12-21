import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Menu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const username = localStorage.getItem("username") || "User";
  const firstLetter = username[0].toUpperCase();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="d-flex align-items-center gap-4">

      <Link
        to="/kite"
        className={`text-decoration-none ${
          isActive("/kite") ? "fw-bold text-primary" : "text-dark"
        }`}
      >
        Dashboard
      </Link>

      <Link
        to="/kite/orders"
        className={`text-decoration-none ${
          isActive("/kite/orders") ? "fw-bold text-primary" : "text-dark"
        }`}
      >
        Orders
      </Link>

      <Link
        to="/kite/holdings"
        className={`text-decoration-none ${
          isActive("/kite/holdings") ? "fw-bold text-primary" : "text-dark"
        }`}
      >
        Holdings
      </Link>

      <Link
        to="/kite/positions"
        className={`text-decoration-none ${
          isActive("/kite/positions") ? "fw-bold text-primary" : "text-dark"
        }`}
      >
        Positions
      </Link>

      <Link
        to="/kite/funds"
        className={`text-decoration-none ${
          isActive("/kite/funds") ? "fw-bold text-primary" : "text-dark"
        }`}
      >
        Funds
      </Link>

      <Link
        to="/kite/apps"
        className={`text-decoration-none ${
          isActive("/kite/apps") ? "fw-bold text-primary" : "text-dark"
        }`}
      >
        Apps
      </Link>

      {/* PROFILE */}
      <div className="position-relative">
        <div
          className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center"
          style={{ width: 34, height: 34, cursor: "pointer" }}
          onClick={() => setOpen(!open)}
        >
          {firstLetter}
        </div>

        {open && (
          <div
            className="position-absolute end-0 mt-2 bg-white border rounded shadow p-2"
            style={{ minWidth: "120px" }}
          >
            <div className="fw-semibold mb-2">{username}</div>
            <button
              className="btn btn-sm btn-danger w-100"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
