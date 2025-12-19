import React, { useEffect, useState } from "react";
import axios from "axios";

const Positions = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPositions();
  }, []);

  const fetchPositions = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:3002/positions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPositions(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load positions");
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
                    style={{
                      color: isLoss ? "red" : "green",
                      fontWeight: 600,
                    }}
                  >
                    ₹ {pnl.toFixed(2)}
                  </td>

                  <td className={pos.isLoss ? "loss" : "profit"}>
                    {pos.day || "—"}
                  </td>
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
