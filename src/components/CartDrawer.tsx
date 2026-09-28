"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function CartDrawer() {
  const { items, isCartOpen, closeCart, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
          onClick={closeCart}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-brand-light">
          <h2 className="text-xl font-bold text-brand-dark">
            Your Cart ({items.reduce((s, i) => s + i.quantity, 0)})
          </h2>
          <button
            onClick={closeCart}
            className="w-10 h-10 rounded-full bg-brand-light flex items-center justify-center hover:bg-brand-accent transition-colors"
            aria-label="Close cart"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <svg className="w-16 h-16 text-brand-light mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-brand-muted text-lg font-medium">Your cart is empty</p>
              <p className="text-brand-muted/70 text-sm mt-1">Browse our collection and add items</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.productId}-${item.size}`} className="flex gap-4 bg-brand-bg rounded-xl p-4">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-brand-light flex-shrink-0">
                  <Image src={item.imageSrc} alt={item.imageAlt} className="w-full h-full object-cover" fill sizes="80px" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-brand-dark text-sm truncate">{item.name}</p>
                  <p className="text-brand-muted text-xs mt-0.5">Size: {item.size}</p>
                  <p className="text-brand-primary font-bold text-sm mt-1">{item.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.productId, item.size, -1)}
                      className="w-7 h-7 rounded-full border border-brand-light flex items-center justify-center hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all text-brand-dark"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="w-8 text-center font-medium text-brand-dark">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.size, 1)}
                      className="w-7 h-7 rounded-full border border-brand-light flex items-center justify-center hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all text-brand-dark"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                    <button
                      onClick={() => removeFromCart(item.productId, item.size)}
                      className="ml-auto text-brand-muted hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-brand-light p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-brand-muted font-medium">Subtotal</span>
              <span className="text-brand-dark font-bold text-lg">Rs. {cartTotal.toLocaleString()}</span>
            </div>
            <Link
              href="/contact"
              onClick={closeCart}
              className="btn-primary block text-center"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
