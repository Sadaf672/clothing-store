"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart, type Product } from "@/context/CartContext";

export default function ProductView({ product }: { product: Product }) {
  const { addToCart, toggleCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, selectedSize);
    setAdded(true);
    toggleCart();
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
      {/* Image */}
      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-brand-light shadow-lg">
        <Image
          src={product.imageSrc}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex flex-col justify-center">
        <p className="text-brand-primary text-sm font-medium tracking-wider uppercase mb-2">
          {product.category}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-brand-dark tracking-tight mb-4">
          {product.name}
        </h1>
        <p className="text-brand-secondary font-bold text-2xl mb-6">{product.price}</p>
        <p className="text-brand-muted text-base leading-relaxed mb-8">{product.description}</p>

        {/* Sizes */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-brand-dark mb-3">Select Size</h3>
          <div className="flex flex-wrap gap-3">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                aria-pressed={selectedSize === size}
                className={`w-12 h-12 rounded-full border-2 font-medium text-sm transition-all duration-300 ${
                  selectedSize === size
                    ? "border-brand-primary bg-brand-primary text-white shadow-md"
                    : "border-brand-light text-brand-dark hover:border-brand-primary hover:text-brand-primary"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button onClick={handleAddToCart} className="btn-primary flex-1 text-center">
            {added ? "Added to Cart ✓" : "Add to Cart"}
          </button>
          <Link href="/#collection" className="btn-outline flex-1 text-center">
            Continue Shopping
          </Link>
        </div>

        {/* Extra info */}
        <div className="mt-8 pt-6 border-t border-brand-light space-y-3">
          <div className="flex items-center gap-2 text-sm text-brand-muted">
            <svg className="w-4 h-4 text-brand-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
            </svg>
            Free delivery on orders above Rs. 5,000
          </div>
          <div className="flex items-center gap-2 text-sm text-brand-muted">
            <svg className="w-4 h-4 text-brand-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Easy returns within 14 days
          </div>
        </div>
      </div>
    </div>
  );
}
