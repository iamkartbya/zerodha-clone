import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ holding, mode }) => {
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(holding?.price || 0);

  const { closeOrderWindow } = useContext(GeneralContext);

  useEffect(() => {
    setPrice(holding?.price || 0);
  }, [holding]);

  const totalValue = (qty * price).toFixed(2);

  const handleOrder = async () => {
    if (qty <= 0) return alert("Quantity must be greater than 0");

    if (mode === "SELL" && qty > holding.qty) {
      return alert(`You can sell max ${holding.qty} shares`);
    }

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:3002/newOrder",
        {
          name: holding.name,
          qty,
          price,
          mode,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert(`${mode} order placed successfully`);
      closeOrderWindow();
    } catch (err) {
      alert(err.response?.data?.error || "Order failed");
    }
  };

  return (
    <div className="container" id="buy-window">
      <h3 className={mode === "BUY" ? "buy-title" : "sell-title"}>
        {mode} {holding.name}
      </h3>

      <div className="inputs">
        <input
          type="number"
          min="1"
          max={mode === "SELL" ? holding.qty : undefined}
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
        />

        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </div>

      <p style={{ marginTop: 10 }}>
        <strong>Total:</strong> ₹ {totalValue}
      </p>

      <div className="buttons">
        <button
          className={mode === "BUY" ? "btn-buy" : "btn-sell"}
          onClick={handleOrder}
        >
          {mode}
        </button>

        <button className="btn-cancel" onClick={closeOrderWindow}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BuyActionWindow;
