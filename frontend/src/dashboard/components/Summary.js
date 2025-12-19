import React, { useEffect, useState } from "react";
import { fetchHoldings } from "../services/Api";
import { holdings } from "../data/data";
const Summary = () => {
  const [holdings, setHoldings] = useState([]);
  const username = localStorage.getItem("username") || "User";

  useEffect(() => {
    const loadHoldings = async () => {
      try {
        const res = await fetchHoldings();
        setHoldings(res.data);
      } catch (err) {
        console.error("Failed to fetch holdings:", err);
      }
    };
    loadHoldings();
  }, []);

  const investment = holdings.reduce((sum, h) => sum + (h.investment || 0), 0);
  const currentValue = holdings.reduce((sum, h) => sum + (h.currentValue || 0), 0);
  const pnl = currentValue - investment;

  return (
    <>
      <div className="username">
        <h6>Hi, {username}!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span><p>Holdings ({holdings.length})</p></span>
        <div className="data">
          <div className="first">
            <h3 className={pnl >= 0 ? "profit" : "loss"}>
              {pnl.toFixed(2)} <small>{((pnl / investment) * 100 || 0).toFixed(2)}%</small>
            </h3>
            <p>P&L</p>
          </div>
          <hr />
          <div className="second">
            <p>Current Value <span>{currentValue.toFixed(2)}</span></p>
            <p>Investment <span>{investment.toFixed(2)}</span></p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
