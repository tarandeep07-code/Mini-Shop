"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    { name: "Account Details", path: "/dashboard" },
    { name: "Orders", path: "/dashboard/orders" },
    { name: "Add Product", path: "/dashboard/add-product" },
  ];

  return (
    <aside className=" mt-[75px] w-64 h-screen bg-white border-r p-6 fixed left-0 top-0">
      <h2 className="text-2xl font-bold mb-10">Dashboard</h2>

      <nav className="space-y-3">
        {menu.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`
                block px-4 py-2 rounded-lg transition
                ${isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"}
              `}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
