import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3002";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_URL}/orders`);
        setOrders(response.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [API_URL]);

  if (loading) return <div className="orders-loading">Loading orders...</div>;
  if (error) return <div className="orders-error">{error}</div>;

  return (
    <div className="orders-page">
      {orders.length === 0 ? (
        <div className="no-orders-card">
          <h2>No orders yet</h2>
          <p>You haven’t placed any orders today.</p>
          <Link to="/" className="orders-btn">
            Get started
          </Link>
        </div>
      ) : (
        <div className="orders-table-container">
          <h2>Your Orders</h2>

          <table className="orders-table">
            <thead>
              <tr>
                <th>Stock</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.name}</td>
                  <td>{order.qty}</td>
                  <td>₹{order.price}</td>
                  <td
                    className={
                      order.mode === "BUY" ? "buy-mode" : "sell-mode"
                    }
                  >
                    {order.mode}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
