import React from "react";
import { useNavigate } from "react-router-dom";

const ProtectedLink = ({ to, children, className, style }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleClick = (e) => {
    e.preventDefault();
    if (token) {
      navigate(to); // User is logged in → go to the route
    } else {
      navigate("/login"); // Not logged in → go to login
    }
  };

  return (
    <a href={to} onClick={handleClick} className={className} style={style}>
      {children}
    </a>
  );
};

export default ProtectedLink;
