"use client";

import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { useAuth } from "@/app/auth/AuthContext";
import { LogOut, User } from "lucide-react";

export default function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-blue-600">
          🛍 MiniShop
        </Link>

        {/* Right side links */}
        <div className="flex gap-6 items-center">
          <Link href="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>

          {/* Cart */}
          <Link href="/cart" className="relative text-gray-700 hover:text-blue-600 text-lg">
            🛒
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </Link>

          {/* User greeting or login */}
          {user ? (
            <div className="flex items-center gap-2 text-gray-700">
              <span className="flex gap-[6px] items-center">
                <User className="w-5 h-5" />
                Hi, {user.name.split(" ")[0]}
              </span>
              <button
                onClick={logout}
                className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
