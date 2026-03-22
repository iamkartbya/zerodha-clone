import React, { useEffect, useState } from "react";
import { fetchHoldings } from "../../services/Api";

const Holdings = () => {
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHoldings = async () => {
      try {
        const res = await fetchHoldings();
        setHoldings(res.data);
      } catch (err) {
        console.error("Failed to fetch holdings:", err);
      } finally {
        setLoading(false);
      }
    };

    loadHoldings();
  }, []);

  if (loading) return <p style={{ padding: 20 }}>Loading holdings...</p>;
  if (!holdings.length) return <p style={{ padding: 20 }}>No holdings found</p>;

  return (
    <div className="container-fluid p-3">
      <h4>Your Holdings</h4>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Qty</th>
            <th>Avg</th>
            <th>Current Price</th>
            <th>Total Value</th>
          </tr>
        </thead>
        <tbody>
          {holdings.map((h) => (
            <tr key={h._id}>
              <td>{h.name}</td>
              <td>{h.qty}</td>
              <td>₹ {h.avg}</td>
              <td>₹ {h.price}</td>
              <td>₹ {(h.qty * h.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Holdings;
