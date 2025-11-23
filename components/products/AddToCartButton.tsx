"use client";
import { useCart } from "@/components/cart/CartProvider";
import type { Product } from "@/lib/products";
import { Plus } from "lucide-react";

export function AddToCartButton({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <button
      className="btn btn-primary h-10 gap-2 rounded-md px-3 text-sm"
      onClick={() => add(product, 1)}
    >
      <Plus className="h-4 w-4" />
      Add
    </button>
  );
}

