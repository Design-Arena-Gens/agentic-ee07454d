"use client";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { useCart } from "./CartProvider";
import { currency } from "@/lib/products";

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, update, remove, totalCents } = useCart();

  return (
    <div
      className={`fixed inset-0 z-40 transition ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button className="btn btn-ghost p-2" onClick={onClose} aria-label="Close cart">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex h-[calc(100%-8rem)] flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <p className="text-sm text-gray-500">Your cart is empty.</p>
            ) : (
              <ul className="space-y-4">
                {items.map(({ product, quantity }) => (
                  <li key={product.id} className="flex gap-3">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={80}
                        height={80}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 items-start justify-between gap-2">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500">{currency(product.priceCents)}</p>
                        <div className="mt-2">
                          <label className="mr-2 text-xs text-gray-500">Qty</label>
                          <input
                            className="w-16 rounded border px-2 py-1 text-sm"
                            type="number"
                            min={1}
                            value={quantity}
                            onChange={(e) => update(product.id, Math.max(1, Number(e.target.value)))}
                          />
                          <button
                            className="ml-3 text-sm text-red-600 hover:underline"
                            onClick={() => remove(product.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="text-sm font-semibold">
                        {currency(product.priceCents * quantity)}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="border-t px-6 py-4">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">{currency(totalCents)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={onClose}
              className="btn btn-primary h-11 w-full rounded-md"
            >
              Checkout
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}

