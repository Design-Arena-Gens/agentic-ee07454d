import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { currency } from "@/lib/products";
import { AddToCartButton } from "./AddToCartButton";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group rounded-xl border border-gray-100 p-3 transition hover:shadow-md">
      <Link href={`/product/${product.slug}`} className="block overflow-hidden rounded-lg">
        <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            width={800}
            height={600}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="mt-3 space-y-1">
        <div className="flex items-center gap-2">
          {product.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-gray-600"
            >
              {t}
            </span>
          ))}
        </div>
        <Link href={`/product/${product.slug}`} className="block font-semibold">
          {product.name}
        </Link>
        <div className="flex items-center justify-between">
          <p className="text-brand">{currency(product.priceCents)}</p>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}

