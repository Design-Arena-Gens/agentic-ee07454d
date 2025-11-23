"use client";
import Link from "next/link";
import { ShoppingBag, Menu } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { useState } from "react";

export function Navbar() {
  const { totalQuantity } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="border-b border-gray-100">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <button className="btn btn-ghost p-2 sm:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </button>
            <Link href="/" className="text-xl font-bold tracking-tight">
              Nova
              <span className="text-brand-accent">Store</span>
            </Link>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm">
            <Link className="hover:text-brand-accent" href="/#new">New</Link>
            <Link className="hover:text-brand-accent" href="/#apparel">Apparel</Link>
            <Link className="hover:text-brand-accent" href="/#tech">Tech</Link>
            <Link className="hover:text-brand-accent" href="/#about">About</Link>
          </nav>
          <div className="flex items-center gap-2">
            <button
              className="btn btn-ghost relative p-2"
              onClick={() => setOpen(true)}
              aria-label="Open cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {totalQuantity > 0 && (
                <span className="absolute -right-1 -top-1 rounded-full bg-brand.accent px-1.5 py-0.5 text-[10px] font-semibold text-white">
                  {totalQuantity}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}

