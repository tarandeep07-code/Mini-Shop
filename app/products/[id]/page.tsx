"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { motion } from "framer-motion";

export default function ProductDetailClient() {
  const { addToCart } = useCart();
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      setProduct(data.product);
      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found 😢</p>;

  return (
    <motion.div className="min-h-screen bg-gray-50 pt-[100px] pb-20">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 bg-white p-8 rounded-3xl shadow-md">
        <div className="relative w-full h-[400px] rounded-2xl overflow-hidden">
          <Image
            src={`https://picsum.photos/seed/${product.id}/400/400`}
            alt={product.name}
            fill
            className="object-cover rounded-2xl"
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-gray-600">
            Category: {product.category} | Publisher: {product.publisher?.name || "N/A"}
          </p>
          <p className="text-2xl font-semibold text-blue-600">
            ₹{product.price.toLocaleString("en-IN")}
          </p>

          <div className="flex gap-4 mt-4">
            <button
              onClick={() => addToCart(product)}
              className="py-3 px-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
             >
              Add to Cart
            </button>
            <Link
              href="/"
              className="py-3 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all"
            >
              Back to Home
            </Link>
            
          </div>
        </div>
      </div>
    </motion.div>
  ); 
}
