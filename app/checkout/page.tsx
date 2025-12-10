"use client";

import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart, isLoaded } = useCart();
  const router = useRouter();

  // Redirect to cart if empty
    useEffect(() => {
    if (!isLoaded) return;          // wait for hydration
    if (cart.length === 0) {
      router.replace("/cart");
    }
  }, [isLoaded, cart, router]);

  // Billing state
  const [billing, setBilling] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBilling({ ...billing, [e.target.name]: e.target.value });
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Submit checkout → Stripe
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

try {
  // 1️⃣ Call Stripe Checkout API
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cart, billing }),
  });

  const data = await res.json();

  // Use the Stripe session URL, fallback if nested
  const stripeUrl = data.url || data.session?.url || data.checkout_url;

  if (stripeUrl) {
    // 2️⃣ Redirect to Stripe Checkout
    window.location.href = stripeUrl;
  } else {
    console.error("Stripe redirect URL missing", data);
    alert("Something went wrong. Please try again.");
  }
} catch (err) {
  console.error("Checkout failed", err);
  alert("Checkout failed. Please try again.");
} finally {
  setLoading(false);
}
  }

  if (cart.length === 0) return null;

  return (
    <div className="min-h-screen bg-gray-50 pt-[100px] pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-black mb-10">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-10">

          {/* -----------------------------
                🛒 Order Items
            ------------------------------ */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center justify-between bg-white shadow-md p-5 rounded-2xl border border-gray-100"
              >
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 relative">
                    <Image
                      src={`https://picsum.photos/seed/${item.id}/400/300`}
                      alt={item.name}
                      fill
                      className="object-cover rounded-xl border border-gray-200"
                      unoptimized
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-black">{item.name}</h2>
                    <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-semibold text-black">
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </p>
              </motion.div>
            ))}
          </div>

          {/* -----------------------------
                💳 Billing + Stripe
            ------------------------------ */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 h-fit"
          >
            <h2 className="text-xl font-semibold text-black mb-6 border-b pb-3">
              Billing Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={billing.name}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={billing.email}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={billing.phone}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
                required
              />
              <textarea
                name="address"
                placeholder="Full Address"
                value={billing.address}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
                rows={3}
                required
              />

              {/* Total Summary */}
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between mb-3 text-gray-700">
                  <span>Subtotal</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between mb-3 text-gray-700">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-black border-t pt-4">
                  <span>Total</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg mt-4 text-white transition-all ${
                  loading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {loading ? "Processing..." : "Pay with Stripe"}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
