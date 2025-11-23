import Image from "next/image";
import { notFound } from "next/navigation";
import { products, currency } from "@/lib/products";
import { AddToCartButton } from "@/components/products/AddToCartButton";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return notFound();

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="overflow-hidden rounded-2xl border">
        <div className="relative aspect-[4/3] w-full bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <p className="mt-2 text-lg text-brand">{currency(product.priceCents)}</p>
        <div className="mt-4 flex items-center gap-2">
          {product.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-gray-600"
            >
              {t}
            </span>
          ))}
        </div>
        <p className="mt-6 text-gray-700">{product.description}</p>
        <div className="mt-8">
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}

