"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/auth/AuthContext";

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  if (!user) return <p>Loading user...</p>;

  useEffect(() => {
    async function loadOrders() {
      const res = await fetch("/api/orders/all", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user?.email,role: user?.role }),
      });

      const data = await res.json();
      console.log(data);
      setOrders(data.orders || []);
    }

    loadOrders();
  }, [user.email]);

  return (
    <div className="p-5 mt-[70px]">
      <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table

          cellPadding="10"
          width="100%"
          style={{ borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Total Amount</th>
              <th>Items</th>
              <th>Payment Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order: any) => (
              <tr key={order._id}>
                <td>{order._id}</td>

                {/* Customer Name */}
                <td>{order.customer?.name}</td>

                {/* Customer Email */}
                <td>{order.customer?.email}</td>

                {/* Total Amount (Stripe *100 fix) */}
                <td>
                  ₹{(order.amount_total / 100).toLocaleString()}
                </td>

                {/* Number of Items */}
                <td>{order.items?.length}</td>

                {/* Payment Status */}
                <td>{order.payment_status}</td>

                {/* Date */}
                <td>
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString()
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
