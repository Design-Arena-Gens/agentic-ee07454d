"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/products";

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  add: (product: Product, quantity?: number) => void;
  remove: (productId: string) => void;
  update: (productId: string, quantity: number) => void;
  clear: () => void;
  totalQuantity: number;
  totalCents: number;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "novastore.cart.v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const fromStorage = localStorage.getItem(STORAGE_KEY);
      if (fromStorage) setItems(JSON.parse(fromStorage));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const api = useMemo<CartContextValue>(() => {
    const add = (product: Product, q = 1) =>
      setItems((prev) => {
        const idx = prev.findIndex((i) => i.product.id === product.id);
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = { ...next[idx], quantity: next[idx].quantity + q };
          return next;
        }
        return [...prev, { product, quantity: q }];
      });
    const remove = (productId: string) =>
      setItems((prev) => prev.filter((i) => i.product.id !== productId));
    const update = (productId: string, quantity: number) =>
      setItems((prev) =>
        prev
          .map((i) => (i.product.id === productId ? { ...i, quantity } : i))
          .filter((i) => i.quantity > 0)
      );
    const clear = () => setItems([]);
    const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0);
    const totalCents = items.reduce((sum, i) => sum + i.quantity * i.product.priceCents, 0);
    return { items, add, remove, update, clear, totalQuantity, totalCents };
  }, [items]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

