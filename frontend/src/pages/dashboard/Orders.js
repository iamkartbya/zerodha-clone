import React, { useEffect, useState } from "react";
import { fetchOrders } from "../../services/Api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const res = await fetchOrders();
      setOrders(res.data);
    } catch (err) {
      console.error("Orders fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p style={{ padding: 20 }}>Loading orders...</p>;
  }

  return (
    <div className="orders">
      <h3>Orders</h3>

      {orders.length === 0 ? (
        <p>No orders placed yet</p>
      ) : (
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
                  className={
                    order.mode === "BUY" ? "text-success fw-semibold" : "text-danger fw-semibold"
                  }
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
      )}
    </div>
  );
};

export default Orders;
