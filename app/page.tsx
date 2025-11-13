"use client";

import ProductCard from "@/components/ProductCard";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  // ✅ Fetch products from API (MongoDB)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Extract unique categories from fetched data
  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-[100px] pb-20">
      {/* 🌟 Hero Section */}
      <section className="text-center mb-12 px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4"
        >
          Discover Amazing Products 🛍️
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-600 text-lg max-w-2xl mx-auto"
        >
          Browse our curated collection of trendy gadgets, stylish apparel, and more.
          Find what you love and shop effortlessly.
        </motion.p>
      </section>

      {/* 🏷️ Category Filter */}
      {products.length > 0 && (
        <div className="flex flex-wrap justify-center gap-3 mb-10 px-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full border text-sm font-medium transition ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white border-blue-600 shadow-md"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* 🛒 Product Grid */}
      <div className="container mx-auto px-4">
        {loading ? (
          <p className="text-center text-gray-500 text-lg">Loading products...</p>
        ) : filteredProducts.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product._id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.02 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-center text-gray-500 text-lg">No products found.</p>
        )}
      </div>
    </main>
  );
}
