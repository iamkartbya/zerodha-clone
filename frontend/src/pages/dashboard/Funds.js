import React, { useEffect, useState } from "react";
import { fetchHoldings } from "../../services/Api";

const Funds = () => {
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadFunds = async () => {
      try {
        const res = await fetchHoldings();
        setHoldings(res.data || []);
      } catch (err) {
        console.error("Failed to fetch funds:", err);
        setError(err.response?.data?.error || "Failed to fetch funds");
      } finally {
        setLoading(false);
      }
    };
    loadFunds();
  }, []);

  if (loading) return <p style={{ padding: 20 }}>Loading funds...</p>;
  if (error) return <p style={{ padding: 20, color: "red" }}>{error}</p>;

  // Basic calculations
  const usedMargin = holdings.reduce((sum, h) => sum + h.qty * h.avg, 0);
  const currentValue = holdings.reduce((sum, h) => sum + h.qty * h.price, 0);
  const availableCash = currentValue - usedMargin;

  const equityData = [
    { label: "Available Margin", value: availableCash, colored: true },
    { label: "Used Margin", value: usedMargin },
    { label: "Available Cash", value: availableCash },
    { label: "Opening Balance", value: usedMargin + availableCash },
  ];

  return (
    <div className="container-fluid p-3">
      <div className="d-flex justify-content-between mb-4">
        <p>Instant, zero-cost fund transfers with UPI</p>
        <div className="d-flex gap-2">
          <button className="btn btn-success">Add Funds</button>
          <button className="btn btn-primary">Withdraw</button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-light">
              <h5 className="mb-0">Equity Funds</h5>
            </div>
            <div className="card-body">
              {equityData.map((item, index) => (
                <div
                  key={index}
                  className="d-flex justify-content-between py-2 border-bottom"
                >
                  <span>{item.label}</span>
                  <span className={item.colored ? "text-success fw-bold" : ""}>
                    ₹ {item.value.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow-sm h-100 text-center d-flex flex-column justify-content-center align-items-center p-3">
            <p>You don't have a commodity account</p>
            <button className="btn btn-primary">Open Account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Funds;
