import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import GeneralContext from "../../services/GeneralContext";

const Holdings = () => {
  const { openOrderWindow } = useContext(GeneralContext);
  const [holdings, setHoldings] = useState([]);

  const fetchHoldings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${process.env.REACT_APP_API}/allHoldings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHoldings(res.data);
    } catch (err) {
      console.error("Failed to fetch holdings", err);
    }
  };

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
                <td className={isLoss ? "loss" : "profit"}>{pnl}</td>
                <td>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => openOrderWindow(stock, "BUY")}
                  >
                    BUY
                  </button>

                  <button
                    className="btn btn-sm btn-danger ms-2"
                    onClick={() => openOrderWindow(stock, "SELL")}
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
