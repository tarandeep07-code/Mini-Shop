"use client";

import { useEffect, createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/types/product";
import { useAuth } from "@/app/auth/AuthContext"; // use your AuthContext

interface CartItem extends Product {
  quantity: number;
}


interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  logout: () => void;
  loggedIn: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const { user } = useAuth(); // Get logged in user from AuthContext

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) setCart(JSON.parse(storedCart));
    }
  }, []);

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  // Sync cart with server whenever user logs in
  useEffect(() => {
  async function syncCart() {
    if (!user) {
      setLoggedIn(false);
      return;
    }

    setLoggedIn(true);

    try {
      const res = await fetch("/api/cart");
      const serverCartData = await res.json();
      const serverCart: CartItem[] = serverCartData.items || [];

      const localCart = JSON.parse(localStorage.getItem("cart") || "[]");

      // 🧩 CASE 1: First-time login (no cart in DB)
      if (serverCart.length === 0 && localCart.length > 0) {
        await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: localCart }),
        });

        setCart(localCart);
        localStorage.removeItem("cart"); // clear local cart after sync
      }

      // 🧩 CASE 2: Returning user (DB has cart)
      else if (serverCart.length > 0) {
        setCart(serverCart);
        localStorage.removeItem("cart"); // ignore local guest cart
      }

      // 🧩 CASE 3: Both empty — nothing to do
      else {
        setCart([]);
      }

    } catch (err) {
      console.error("Cart sync failed:", err);
    }
  }

  syncCart();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [user]);


  // Merge helper
  const mergeCarts = (local: CartItem[], server: CartItem[]) => {
    const map = new Map<number, CartItem>();
    [...local, ...server].forEach((item) => {
      if (map.has(item.id)) {
        const existing = map.get(item.id)!;
        map.set(item.id, { ...existing, quantity: existing.quantity + item.quantity });
      } else {
        map.set(item.id, item);
      }
    });
    return Array.from(map.values());
  };

  // Cart actions
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      return existing
        ? prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) =>
    setCart((prev) => prev.filter((item) => item.id !== id));

  const clearCart = () => setCart([]);

  const increaseQuantity = (id: number) =>
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );

  const decreaseQuantity = (id: number) =>
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );

  // Auto-save cart to server when it changes and user is logged in
  useEffect(() => {
    if (!loggedIn) return;

    fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart }),
    }).catch((err) => console.error("Failed to save cart:", err));
  }, [cart, loggedIn]);

  // Logout
  const logout = async () => {
    setCart([]);
    localStorage.removeItem("cart");
    setLoggedIn(false);

    try {
      await fetch("/api/logout", { method: "POST" });
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        logout,
        loggedIn,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
