import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import GeneralContext from "../../services/GeneralContext";

const BuyActionWindow = ({ stock, mode }) => {
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(stock?.price || 0);

  const { closeOrderWindow } = useContext(GeneralContext);

  useEffect(() => {
    setPrice(stock?.price || 0);
  }, [stock]);

  const totalValue = (qty * price).toFixed(2);

  const handleOrder = async () => {
    if (qty <= 0) return alert("Quantity must be greater than 0");

    if (mode === "SELL" && qty > stock.qty) {
      return alert(`You can sell max ${stock.qty} shares`);
    }

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${process.env.REACT_APP_API}/newOrder`,
        {
          name: stock.name,
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
    <div
      className="modal show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className={`modal-header ${mode === "BUY" ? "bg-success" : "bg-danger"} text-white`}>
            <h5 className="modal-title">
              {mode} {stock.name}
            </h5>
            <button type="button" className="btn-close" onClick={closeOrderWindow}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Quantity</label>
              <input
                type="number"
                min="1"
                max={mode === "SELL" ? stock.qty : undefined}
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="form-control"
              />
            </div>

            <p>
              <strong>Total:</strong> ₹ {totalValue}
            </p>
          </div>
          <div className="modal-footer">
            <button
              className={`btn ${mode === "BUY" ? "btn-success" : "btn-danger"}`}
              onClick={handleOrder}
            >
              {mode}
            </button>
            <button className="btn btn-secondary" onClick={closeOrderWindow}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
