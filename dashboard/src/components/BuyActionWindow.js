import React, { useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, mode = "BUY" }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);

  const { closeOrderWindow } = useContext(GeneralContext);

  const handleOrderClick = async () => {
    if (stockQuantity <= 0 || stockPrice <= 0) {
      alert("Quantity and price must be greater than 0");
      return;
    }

    try {
      await axios.post("http://localhost:3002/newOrder", {
        name: uid,
        qty: Number(stockQuantity),
        price: Number(stockPrice),
        mode, // BUY or SELL
      });

      closeOrderWindow();
      alert(`${mode} order placed successfully!`);
    } catch (error) {
      console.error(error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="container" id="buy-window">
      <h3 className={mode === "BUY" ? "buy-title" : "sell-title"}>
        {mode} {uid}
      </h3>

      <div className="inputs">
        <input
          type="number"
          min="1"
          value={stockQuantity}
          onChange={(e) => setStockQuantity(e.target.value)}
          placeholder="Quantity"
        />
        <input
          type="number"
          min="0.01"
          step="0.05"
          value={stockPrice}
          onChange={(e) => setStockPrice(e.target.value)}
          placeholder="Price"
        />
      </div>

      <div className="buttons">
        <button
          className={mode === "BUY" ? "btn-buy" : "btn-sell"}
          onClick={handleOrderClick}
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
