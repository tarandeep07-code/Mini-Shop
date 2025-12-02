"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/app/context/CartContext";

interface Billing {
  name: string;
  email: string;
  address: string;
}

interface Item {
  name: string;
  quantity: number;
  price: number;
}

interface OrderDetails {
  order?: any;
  billing: Billing;
  items: Item[];
  paid: boolean;
  amount_total: number;
}

interface SuccessClientProps {
  sessionId: string;
}

export default function SuccessClient({ sessionId }: SuccessClientProps) {
  const { clearCart } = useCart();
  const [details, setDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let canceled = false;

    async function fetchOrder() {
      try {
        console.log("🟡 Loading order for session:", sessionId);

        const res = await fetch(`/api/stripe/verify?session_id=${sessionId}`);
        if (!res.ok) throw new Error("Failed to verify session");

        const data: OrderDetails = await res.json();
        console.log("🟢 verifyData:", data);

        if (!canceled) {
          setDetails(data);
          if (data.paid) clearCart();
        }
      } catch (err: any) {
        console.error("🔥 ERROR:", err);
        if (!canceled) setError(err.message || "Something went wrong");
      } finally {
        if (!canceled) setLoading(false);
      }
    }

    fetchOrder();

    return () => {
      canceled = true;
    };
  }, [sessionId, clearCart]);

  if (loading) return <p className="p-10 text-center">Loading order...</p>;
  if (error) return <p className="p-10 text-center text-red-600">{error}</p>;
  if (!details?.order) return <p className="p-10 text-center text-red-600">Order not found</p>;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful 🎉</h1>
      <div className="border p-5 rounded-lg bg-white shadow">
        <p><strong>Name:</strong> {details.billing.name}</p>
        <p><strong>Email:</strong> {details.billing.email}</p>
        <p><strong>Address:</strong> {details.billing.address}</p>

        <h3 className="text-lg font-semibold mt-4">Items:</h3>
        <ul className="mt-2">
          {details.items.map((item, i) => (
            <li key={i} className="border-b py-2">
              {item.name} — {item.quantity} × ₹{item.price}
            </li>
          ))}
        </ul>

        <p className="mt-4 text-xl font-bold">
          Total: ₹{(details.amount_total / 100).toFixed(2)}
        </p>
      </div>
    </div>
  );
}
