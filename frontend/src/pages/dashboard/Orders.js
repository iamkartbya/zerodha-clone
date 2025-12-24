import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${process.env.REACT_APP_API}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load orders");
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
      )}
    </div>
  );
};

export default Orders;
