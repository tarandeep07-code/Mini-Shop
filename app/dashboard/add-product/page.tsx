"use client";

import { useState } from "react";
import { useAuth } from "@/app/auth/AuthContext";

export default function AddProductForm() {
  const { user } = useAuth();

    if (user?.role === "customer") {
    return (
      <div className="mt-[70px] p-6 max-w-xl">
        <p className="text-red-600 font-semibold">
          You do not have permission to access this page.
        </p>
      </div>
    );
  }

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...form,
      publisher: {
        name: user?.name,
        email: user?.email,
        role: user?.role,
      },
    };

    const res = await fetch("/api/add-product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log(data);
    setLoading(false);

    if (res.ok) {
      setMessage("Product added successfully!");
      setForm({
        name: "",
        price: "",
        image: "",
        category: "",
        description: "",
      });
    } else {
      setMessage(data.error);
    }
  }

  return (
    <div className="mt-[70px] p-6 border rounded-md bg-white max-w-xl">
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>

      {message && <p className="text-green-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Product Name"
          className="w-full p-2 border rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Price"
          className="w-full p-2 border rounded"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Image URL"
          className="w-full p-2 border rounded"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        <input
          type="text"
          placeholder="Category"
          className="w-full p-2 border rounded"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        />

        <textarea
          placeholder="Description"
          className="w-full p-2 border rounded"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        {/* Show publisher */}
        <p className="text-sm text-gray-600">
          Publisher: <strong>{user?.name}</strong>
        </p>

        <button
          className="px-4 py-2 bg-black text-white rounded"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
