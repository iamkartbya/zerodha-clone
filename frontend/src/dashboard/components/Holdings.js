import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";

const Holdings = () => {
  const { openOrderWindow } = useContext(GeneralContext);

  // ✅ State for holdings
  const [holdings, setHoldings] = useState([]);

  // ✅ Fetch holdings from backend
  const fetchHoldings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3002/allHoldings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHoldings(res.data);
    } catch (err) {
      console.error("Failed to fetch holdings", err);
    }
  };

  // ✅ Load holdings on mount
  useEffect(() => {
    fetchHoldings();
  }, []);

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
                <td className={isLoss ? "loss" : "profit"}>
                  {pnl}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => openOrderWindow(stock.name, "BUY")}
                  >
                    BUY
                  </button>

                  <button
                    className="btn btn-sm btn-danger ms-2"
                    onClick={() => openOrderWindow(stock.name, "SELL")}
                  >
                    SELL
                  </button>
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
