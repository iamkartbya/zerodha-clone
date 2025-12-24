import React, { useEffect, useState } from "react";
import axios from "axios";

const Funds = () => {
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHoldings();
  }, []);

  const fetchHoldings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${process.env.REACT_APP_API}/allHoldings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHoldings(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch holdings");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p style={{ padding: 20 }}>Loading funds...</p>;

  // ----------------- Dynamic Calculations -----------------
  const usedMargin = holdings.reduce((sum, h) => sum + h.qty * h.avg, 0);
  const currentValue = holdings.reduce((sum, h) => sum + h.qty * h.price, 0);
  const availableCash = currentValue - usedMargin; // simple calculation
  const totalInvestment = usedMargin + availableCash;

  // Define rows dynamically
  const equityData = [
    { label: "Available Margin", value: availableCash, colored: true },
    { label: "Used Margin", value: usedMargin },
    { label: "Available Cash", value: availableCash },
    { label: "Opening Balance", value: totalInvestment },
    { label: "Payin", value: totalInvestment },
    { label: "SPAN", value: 0 },
    { label: "Delivery Margin", value: 0 },
    { label: "Exposure", value: 0 },
    { label: "Options Premium", value: 0 },
    { label: "Collateral (Liquid Funds)", value: 0 },
    { label: "Collateral (Equity)", value: 0 },
    { label: "Total Collateral", value: 0 },
  ];

  return (
    <div className="container-fluid p-3">
      {/* Top Buttons */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <p className="mb-0">Instant, zero-cost fund transfers with UPI</p>
        <div className="d-flex gap-2">
          <button className="btn btn-success">Add Funds</button>
          <button className="btn btn-primary">Withdraw</button>
        </div>
      </div>

      <div className="row">
        {/* Equity Column */}
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

        {/* Commodity Column */}
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm h-100 text-center d-flex flex-column justify-content-center align-items-center p-3">
            <p className="mb-3">You don't have a commodity account</p>
            <button className="btn btn-primary">Open Account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Funds;
