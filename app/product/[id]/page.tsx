"use client";

import { useParams } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { products } from "@/data/products";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-2xl font-semibold text-gray-800">Product not found 🥲</h1>
        <Link href="/" className="mt-4 text-blue-600 hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  // Picsum image
  const imgSrc = `https://picsum.photos/seed/${product.id}/400/400`;

  // Fetch 4 random products from same category, excluding current product
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50 pt-[100px] pb-20">
      <div className="container mx-auto px-6">
        {/* Main product section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid md:grid-cols-2 gap-12 bg-white p-8 rounded-3xl shadow-md"
        >
          {/* Left: Image */}
          <div className="relative w-full h-[400px] rounded-2xl overflow-hidden">
            <Image
              src={imgSrc}
              alt={product.name}
              fill
              className="object-cover rounded-2xl"
              unoptimized
            />
          </div>

          {/* Right: Details */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-gray-600">{product.category}</p>
            <p className="text-2xl font-semibold text-blue-600">
              ₹{product.price.toLocaleString("en-IN")}
            </p>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => addToCart(product)}
                className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-all"
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

            {/* Static info */}
            <p className="text-sm text-gray-500 mt-2">⭐⭐⭐⭐☆ (45 reviews)</p>
            <p className="text-sm text-gray-500">In stock: 20 items</p>
          </div>
        </motion.div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((item) => (
                <Link
                  href={`/product/${item.id}`}
                  key={item.id}
                  className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition"
                >
                  <div className="relative w-full h-36">
                    <Image
                      src={`https://picsum.photos/seed/${item.id}/400/300`}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3">
                    {/* <h3 className="text-sm font-semibold">{item.name}</h3> */}
                    <p className="text-blue-600 font-bold">₹{item.price.toLocaleString("en-IN")}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
