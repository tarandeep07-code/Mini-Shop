"use client";

import Image from "next/image";
import { Product } from "@/types/product";
import { useCart } from "@/app/context/CartContext";
import { useState } from "react";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  // Start with the provided image (e.g., from /images/products/...)
//   const [imgSrc, setImgSrc] = useState(
//     product.image && product.image.trim() !== ""
//       ? product.image
//       : "/images/placeholder.png"
//   );

  const imgSrc = `https://picsum.photos/seed/${product.id}/400/300`;

  

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4">
    <Link href={`/products/${product.id}`}>
      <Image
        key={imgSrc} // ensures re-render when src changes
        src={imgSrc}
        alt={product.name}
        width={400}
        height={300}
        className="rounded-xl object-cover w-full h-48"
        loading="lazy"
        // onError={() =>
        //     setImgSrc(`https://picsum.photos/seed/${product.id}/400/300`)
        //   }
        //   unoptimized 
         // avoids Next optimizer blocking fallback
      />
      </Link>

      <h2 className="mt-4 text-lg font-semibold">{product.name}</h2>
      <p className="text-gray-500">{product.category}</p>
  <p className="text-gray-700"> Publisher: {product.publisher?.name || "N/A"}</p>

      <p className="mt-2 font-bold text-blue-600">₹{product.price}</p>

      <button
        onClick={() => addToCart(product)}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
}
