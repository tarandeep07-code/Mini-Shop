"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/app/auth/AuthContext";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });
  const [message, setMessage] = useState("");


const { setUser } = useAuth();
const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Registering...");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setMessage(data.error || data.message);

    setUser(data.user);

// ✅ redirect
router.push("/");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-96"
      >
        <h1 className="text-2xl font-semibold mb-4 text-center">Register</h1>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="border w-full p-2 mb-3 rounded"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="border w-full p-2 mb-3 rounded"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="border w-full p-2 mb-3 rounded"
          required
        />

        <select
          name="role"
          onChange={handleChange}
          className="border w-full p-2 mb-3 rounded"
        >
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Register
        </button>
        <p className="text-center mt-2">Already Have account<Link className="text-blue-600 ml-2" href="/login">Login</Link></p>

        {message && <p className="text-center mt-3 text-sm">{message}</p>}
      </form>
    </div>
  );
}
