"use client";

import { useAuth } from "@/app/auth/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If user is null after Auth check → redirect
    if (user === null) {
      router.replace("/login");
    }
  }, [user, router]);

  // Show loader while checking auth OR redirecting
  if (user === null) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-lg">...</div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-8 w-full">{children}</main>
    </div>
  );
}
