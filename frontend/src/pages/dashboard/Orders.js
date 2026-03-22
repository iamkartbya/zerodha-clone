import React, { useEffect, useState } from "react";
import { fetchOrders } from "../../services/Api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders()
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load orders");
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ padding: 20 }}>Loading orders...</p>;
  if (error) return <p style={{ padding: 20, color: "red" }}>{error}</p>;
  if (!orders.length) return <p style={{ padding: 20 }}>No orders placed yet</p>;

  return (
    <div className="orders">
      <h3>Orders</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Instrument</th>
            <th>Type</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Status</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.name}</td>
              <td
                style={{
                  color: order.mode === "BUY" ? "green" : "red",
                  fontWeight: 600,
                }}
              >
                {order.mode}
              </td>
              <td>{order.qty}</td>
              <td>₹ {order.price}</td>
              <td>{order.status || "COMPLETED"}</td>
              <td style={{ fontSize: 12 }}>
                {new Date(order.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
