import React, { useEffect, useState } from "react";
import { fetchPositions } from "../../services/Api";

const Positions = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPositions();
  }, []);

  const loadPositions = async () => {
    try {
      const res = await fetchPositions();
      setPositions(res.data);
    } catch (err) {
      console.error("Positions fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p style={{ padding: 20 }}>Loading positions...</p>;
  }

  return (
    <div className="positions">
      <h3>Positions</h3>

      {positions.length === 0 ? (
        <p>No open positions</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty</th>
              <th>Avg</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Day</th>
            </tr>
          </thead>

          <tbody>
            {positions.map((pos, index) => {
              const pnl = (pos.price - pos.avg) * pos.qty;
              const isLoss = pnl < 0;

              return (
                <tr key={index}>
                  <td>{pos.product || "CNC"}</td>
                  <td>{pos.name}</td>
                  <td>{pos.qty}</td>
                  <td>₹ {pos.avg}</td>
                  <td>₹ {pos.price}</td>

                  <td
                    className={isLoss ? "text-danger fw-semibold" : "text-success fw-semibold"}
                  >
                    ₹ {pnl.toFixed(2)}
                  </td>

                  <td>{pos.day || "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Positions;
