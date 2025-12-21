import React from "react";
import "./Apps.css";

const Apps = () => {
  return (
    <div className="apps-container">
      <h2>Apps</h2>
      <div className="apps-grid">
        <div className="app-card">
          <div className="icon">📊</div>
          <p>Analytics</p>
        </div>
        <div className="app-card">
          <div className="icon">💰</div>
          <p>Funds</p>
        </div>
        <div className="app-card">
          <div className="icon">📈</div>
          <p>Positions</p>
        </div>
        <div className="app-card">
          <div className="icon">🛠️</div>
          <p>Tools</p>
        </div>
      </div>
    </div>
  );
};

export default Apps;
