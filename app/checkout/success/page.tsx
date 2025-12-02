"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/app/context/CartContext";
import { useSearchParams, useRouter } from "next/navigation";


export const dynamic = "force-dynamic";

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
  order?: string;
  billing: Billing;
  items: Item[];
  paid: boolean;
  amount_total: number;
}

export default function SuccessPage() {
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");

  const [details, setDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      router.replace("/"); // safer than push on first render
      return;
    }

    async function loadOrder() {
      try {
        console.log("🟡 Loading order for session:", sessionId);

        // Verify payment with Stripe
        const verifyRes = await fetch(`/api/stripe/verify?session_id=${sessionId}`);
        if (!verifyRes.ok) throw new Error("Failed to verify payment");
        const verifyData: OrderDetails = await verifyRes.json();
        console.log("🟢 verifyData:", verifyData);

        // Save order in DB
        const saveRes = await fetch("/api/orders/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            billing: verifyData.billing,
            cart: verifyData.items,
          }),
        });
        const saveData = await saveRes.json();
        console.log("🟢 Save Response:", saveData);

        if (saveData.error) {
          console.warn("🔴 Save API error:", saveData.error);
        }

        // Clear cart if paid
        if (verifyData.paid) {
          console.log("🟢 Clearing cart...");
          clearCart();
        }

        setDetails(verifyData);
      } catch (err: any) {
        console.error("🔥 ERROR LOADING ORDER:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    loadOrder();
  }, [sessionId, router, clearCart]);

  if (loading) return <p className="p-10 text-center">Loading order...</p>;

  if (error) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold text-red-600">Error ❌</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!details?.order) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold text-red-600">Order not found ❌</h1>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful 🎉</h1>

      <h2 className="text-xl font-semibold mb-3">Order Summary</h2>

      <div className="border p-5 rounded-lg bg-white shadow">
        <p><strong>Name:</strong> {details.billing.name}</p>
        <p><strong>Email:</strong> {details.billing.email}</p>
        <p><strong>Address:</strong> {details.billing.address}</p>

        <h3 className="text-lg font-semibold mt-4">Items:</h3>

        {details.items.length === 0 ? (
          <p>No items found</p>
        ) : (
          <ul className="mt-2">
            {details.items.map((item, i) => (
              <li key={i} className="border-b py-2">
                {item.name} — {item.quantity} × ₹{item.price}
              </li>
            ))}
          </ul>
        )}

        <p className="mt-4 text-xl font-bold">
          Total: ₹{(details.amount_total / 100).toFixed(2)}
        </p>
      </div>
    </div>
  );
}
