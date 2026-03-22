import React, { useEffect, useState } from "react";
import { fetchHoldings } from "../../services/Api";

const Summary = () => {
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const username = localStorage.getItem("username") || "User";

  useEffect(() => {
    fetchHoldings()
      .then((res) => {
        setHoldings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load holdings");
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ padding: 20 }}>Loading summary...</p>;
  if (error) return <p style={{ padding: 20, color: "red" }}>{error}</p>;

  const totalInvestment = holdings.reduce((sum, h) => sum + h.qty * h.avg, 0);
  const currentValue = holdings.reduce((sum, h) => sum + h.qty * h.price, 0);
  const pnl = currentValue - totalInvestment;
  const pnlPercentage = totalInvestment > 0 ? (pnl / totalInvestment) * 100 : 0;

  const usedMargin = totalInvestment;
  const availableMargin = currentValue - usedMargin;

  return (
    <div className="summary-section p-3">
      <h5>Hi, {username} 👋</h5>
      <hr />

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
