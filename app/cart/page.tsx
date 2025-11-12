"use client";

import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();
 // const imgSrc = `https://picsum.photos/seed/${item.id}/400/300`;

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] pt-[100px] bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-gray-700 text-lg font-medium mb-4">
            🛒 Your cart is empty.
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-all"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 pt-[100px] pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-black mb-10">
          🛍 Your Cart
        </h1>

        {/* Cart Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item, index) => {
              // fallback image logic
              const imgSrc = `https://picsum.photos/seed/${item.id}/400/300`;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between bg-white shadow-md p-5 rounded-2xl border border-gray-100 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 relative flex-shrink-0">
                      <Image
                        src={imgSrc}
                        alt={item.name}
                        fill
                        className="object-cover rounded-xl border border-gray-200"
                        unoptimized
                        // onError={() =>
                        //   setImgSrc(`https://picsum.photos/seed/${item.id}/200/200`)
                        // }
                      />
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold text-black">
                        {item.name}
                      </h2>
                      <p className="text-gray-500 text-sm mb-2">
                        ₹{item.price.toLocaleString("en-IN")}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden w-fit">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="px-3 py-1 text-black hover:bg-gray-200 transition"
                        >
                          -
                        </button>
                        <span className="px-4 text-black font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="px-3 py-1 text-black hover:bg-gray-200 transition"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-black mb-2">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium transition"
                    >
                      Remove
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 sticky top-[100px] h-fit"
          >
            <h2 className="text-xl font-semibold text-black mb-6 border-b pb-3">
              Order Summary
            </h2>

            <div className="flex justify-between mb-3 text-gray-700">
              <span>Subtotal</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between mb-3 text-gray-700">
              <span>Shipping</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>
            <div className="border-t mt-4 pt-4 flex justify-between text-lg font-semibold text-black">
              <span>Total</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>

            <div className="mt-6 space-y-3">
              <button
                onClick={clearCart}
                className="w-full bg-gray-700 text-white py-2.5 rounded-lg hover:bg-gray-800 transition-all"
              >
                Clear Cart
              </button>
              <button className="w-full bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 transition-all">
                Proceed to Checkout
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
