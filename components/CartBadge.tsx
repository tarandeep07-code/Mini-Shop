"use client";

import { useCart } from "@/app/context/CartContext";

export default function CartBadge() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <button className="relative flex items-center space-x-2">
      <span className="text-xl">🛒</span>
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
          {totalItems}
        </span>
      )}
    </button>
  );
}
