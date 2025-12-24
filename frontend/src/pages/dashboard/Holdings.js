import React, { useEffect, useState } from "react";
import { fetchHoldings } from "../../services/Api";

const Holdings = () => {
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadHoldings = async () => {
      try {
        const res = await fetchHoldings(); // interceptor handles token
        if (res.data && res.data.length > 0) {
          setHoldings(res.data);
        } else {
          setHoldings([]);
        }
      } catch (err) {
        console.error("Failed to fetch holdings:", err);
        setError(err.response?.data?.error || "Failed to fetch holdings");
      } finally {
        setLoading(false);
      }
    };

    loadHoldings();
  }, []);

  if (loading) return <p style={{ padding: 20 }}>Loading holdings...</p>;
  if (error) return <p style={{ padding: 20, color: "red" }}>{error}</p>;

  if (holdings.length === 0)
    return <p style={{ padding: 20 }}>No holdings available</p>;

  return (
    <div className="holdings">
      <h3>Holdings ({holdings.length})</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Instrument</th>
            <th>Qty</th>
            <th>Avg</th>
            <th>LTP</th>
            <th>P&L</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {holdings.map((stock, index) => {
            const pnl = ((stock.price - stock.avg) * stock.qty).toFixed(2);
            const isLoss = pnl < 0;
            return (
              <tr key={index}>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.avg}</td>
                <td>{stock.price}</td>
                <td className={isLoss ? "loss" : "profit"}>{pnl}</td>
                <td>
                  <button className="btn btn-sm btn-success">BUY</button>
                  <button className="btn btn-sm btn-danger ms-2">SELL</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Holdings;
