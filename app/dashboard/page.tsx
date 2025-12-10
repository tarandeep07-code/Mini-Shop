"use client";

import { useAuth } from "@/app/auth/AuthContext";
import { useState, ChangeEvent, FormEvent } from "react";

export default function DashboardPage() {
  const { user, setUser } = useAuth();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  if (!user) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/user/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccessMsg("Password updated successfully!");
        setPassword("");
        setConfirmPassword("");
      } else {
        alert(data.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-[75px] max-w-md mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-6">Account Details</h1>

      <div className="mb-4">
        <label className="block font-medium">Name</label>
        <p className="mt-1">{user.name}</p>
      </div>

      <div className="mb-6">
        <label className="block font-medium">Email</label>
        <p className="mt-1">{user.email}</p>
      </div>

      <h2 className="text-xl font-semibold mb-4">Change Password</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading ? "bg-gray-500" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>

        {successMsg && <p className="text-green-600 mt-2">{successMsg}</p>}
      </form>
    </div>
  );
}
