import React, { useEffect, useState } from "react";
import axios from "axios";

const Summary = () => {
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const username = localStorage.getItem("username") || "User";

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${process.env.REACT_APP_API}/allHoldings`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHoldings(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHoldings();
  }, []);

  if (loading) return <p style={{ padding: 20 }}>Loading summary...</p>;

  // ---------------- Dynamic Calculations ----------------
  const totalInvestment = holdings.reduce((sum, h) => sum + h.qty * h.avg, 0);
  const currentValue = holdings.reduce((sum, h) => sum + h.qty * h.price, 0);
  const pnl = currentValue - totalInvestment;
  const pnlPercentage = totalInvestment > 0 ? (pnl / totalInvestment) * 100 : 0;
  const usedMargin = totalInvestment;
  const availableMargin = currentValue - usedMargin;

  return (
    <div className="summary-section p-3">
      {/* Greeting */}
      <h5>Hi, {username} 👋</h5>
      <hr />

      {/* Main Stats */}
      <div className="row text-center mb-4">
        <div className="col">
          <div className="card shadow-sm p-3">
            <p className="mb-1">Total Investment</p>
            <h4>₹ {totalInvestment.toFixed(2)}</h4>
          </div>
        </div>
        <div className="col">
          <div className="card shadow-sm p-3">
            <p className="mb-1">Current Value</p>
            <h4>₹ {currentValue.toFixed(2)}</h4>
          </div>
        </div>
        <div className="col">
          <div className={`card shadow-sm p-3 ${pnl >= 0 ? "text-success" : "text-danger"}`}>
            <p className="mb-1">Total P&L</p>
            <h4>₹ {pnl.toFixed(2)} ({pnlPercentage.toFixed(2)}%)</h4>
          </div>
        </div>
      </div>

      {/* Quick Stats / Mini Cards */}
      <div className="row text-center">
        <div className="col">
          <div className="card shadow-sm p-3 mb-2">
            <p className="mb-1">Holdings</p>
            <h5>{holdings.length}</h5>
          </div>
        </div>
        <div className="col">
          <div className="card shadow-sm p-3 mb-2">
            <p className="mb-1">Used Margin</p>
            <h5>₹ {usedMargin.toFixed(2)}</h5>
          </div>
        </div>
        <div className="col">
          <div className="card shadow-sm p-3 mb-2">
            <p className="mb-1">Available Margin</p>
            <h5>₹ {availableMargin.toFixed(2)}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
