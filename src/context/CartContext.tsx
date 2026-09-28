"use client";

import { useSyncExternalStore, useCallback, useState, createContext, useContext } from "react";

export interface CartItem {
  productId: number;
  name: string;
  price: string;
  priceNumeric: number;
  imageSrc: string;
  imageAlt: string;
  size: string;
  quantity: number;
}

export interface Product {
  id: number;
  name: string;
  price: string;
  priceNumeric: number;
  category: string;
  imageSrc: string;
  imageAlt: string;
  description: string;
  sizes: string[];
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (productId: number, size: string) => void;
  updateQuantity: (productId: number, size: string, delta: number) => void;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  toggleCart: () => void;
  closeCart: () => void;
}

const STORAGE_KEY = "elegance-cart";
const EMPTY_ITEMS: CartItem[] = [];

// External cart store, persisted to localStorage.
// Read via useSyncExternalStore so server and initial client render match:
// the server snapshot (EMPTY) is used during hydration, then the persisted
// cart is loaded on the client and React re-renders — no hydration mismatch.
let cartItems: CartItem[] = EMPTY_ITEMS;
let loaded = false;
const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((listener) => listener());
}

function loadFromStorage() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed)) cartItems = parsed;
  } catch {}
}

function persistToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  } catch {}
}

function subscribeCart(listener: () => void) {
  loadFromStorage();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getCartSnapshot() {
  return cartItems;
}

function getServerCartSnapshot() {
  return EMPTY_ITEMS;
}

function addProduct(product: Product, size: string) {
  const existing = cartItems.find((i) => i.productId === product.id && i.size === size);
  if (existing) {
    cartItems = cartItems.map((i) =>
      i.productId === product.id && i.size === size
        ? { ...i, quantity: i.quantity + 1 }
        : i
    );
  } else {
    cartItems = [
      ...cartItems,
      {
        productId: product.id,
        name: product.name,
        price: product.price,
        priceNumeric: product.priceNumeric,
        imageSrc: product.imageSrc,
        imageAlt: product.imageAlt,
        size,
        quantity: 1,
      },
    ];
  }
  persistToStorage();
  emitChange();
}

function removeItem(productId: number, size: string) {
  cartItems = cartItems.filter((i) => !(i.productId === productId && i.size === size));
  persistToStorage();
  emitChange();
}

function changeQuantity(productId: number, size: string, delta: number) {
  const item = cartItems.find((i) => i.productId === productId && i.size === size);
  if (!item) return;
  const newQty = item.quantity + delta;
  if (newQty <= 0) {
    cartItems = cartItems.filter((i) => !(i.productId === productId && i.size === size));
  } else {
    cartItems = cartItems.map((i) =>
      i.productId === productId && i.size === size
        ? { ...i, quantity: newQty }
        : i
    );
  }
  persistToStorage();
  emitChange();
}

const CartContext = createContext<CartContextType | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(subscribeCart, getCartSnapshot, getServerCartSnapshot);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = useCallback((product: Product, size: string) => {
    addProduct(product, size);
  }, []);

  const removeFromCart = useCallback((productId: number, size: string) => {
    removeItem(productId, size);
  }, []);

  const updateQuantity = useCallback((productId: number, size: string, delta: number) => {
    changeQuantity(productId, size, delta);
  }, []);

  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = items.reduce((sum, i) => sum + i.priceNumeric * i.quantity, 0);

  const toggleCart = () => setIsCartOpen((v) => !v);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, cartCount, cartTotal, isCartOpen, toggleCart, closeCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
