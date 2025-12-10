"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface User {
  name: string;
  email: string;
  role: string;
}


interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void; // ✅ Add this
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // ✅ On mount, check if user cookie exists
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/me");
        const data = await res.json();
        if (data.loggedIn) setUser(data.user);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    }
    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      setUser(null);
      localStorage.removeItem("cart");
      
      window.location.href = "/login"; // redirect
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
