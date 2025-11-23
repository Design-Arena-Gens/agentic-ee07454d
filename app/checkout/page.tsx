"use client";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { currency } from "@/lib/products";

export default function CheckoutPage() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-2xl border p-6">
        <h1 className="text-xl font-semibold">Contact & Shipping</h1>
        <form className="mt-6 grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <input className="rounded-md border px-3 py-2" placeholder="First name" required />
            <input className="rounded-md border px-3 py-2" placeholder="Last name" required />
          </div>
          <input className="rounded-md border px-3 py-2" placeholder="Email" type="email" required />
          <input className="rounded-md border px-3 py-2" placeholder="Address" required />
          <div className="grid grid-cols-3 gap-4">
            <input className="rounded-md border px-3 py-2" placeholder="City" required />
            <input className="rounded-md border px-3 py-2" placeholder="State" required />
            <input className="rounded-md border px-3 py-2" placeholder="ZIP" required />
          </div>
          <button type="submit" className="btn btn-primary h-11 rounded-md px-5">
            Continue to payment
          </button>
        </form>
      </div>
      <OrderSummary />
    </div>
  );
}

function OrderSummary() {
  // Using a client stub to read cart
  return (
    <div className="rounded-2xl border p-6">
      <h2 className="text-lg font-semibold">Order summary</h2>
      <CartSummary />
      <div className="mt-6 text-sm text-gray-500">
        This is a demo storefront. No real payments are processed.
      </div>
      <Link href="/" className="mt-6 inline-block text-sm text-brand hover:underline">
        Continue shopping
      </Link>
    </div>
  );
}

function CartSummary() {
  const { items, totalCents } = useCart();
  if (items.length === 0) {
    return <p className="text-sm text-gray-500">Your cart is empty.</p>;
  }
  return (
    <div className="space-y-3 mt-4">
      <ul className="divide-y">
        {items.map(({ product, quantity }) => (
          <li key={product.id} className="flex items-center justify-between py-2 text-sm">
            <span>
              {product.name} x {quantity}
            </span>
            <span className="font-medium">
              {currency(product.priceCents * quantity)}
            </span>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between border-t pt-3 text-sm">
        <span className="text-gray-600">Total</span>
        <span className="text-base font-semibold">{currency(totalCents)}</span>
      </div>
    </div>
  );
}

// end

