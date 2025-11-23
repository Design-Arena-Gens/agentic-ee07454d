import { products } from "@/lib/products";
import { ProductCard } from "@/components/products/ProductCard";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 to-white">
        <div className="container relative z-10 py-14 sm:py-20">
          <div className="grid items-center gap-10 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-accent">
                New arrivals
              </p>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Elevate your everyday essentials
              </h1>
              <p className="mt-3 text-gray-600">
                Minimal design, premium materials, planet?friendly. Discover pieces made to last.
              </p>
              <div className="mt-6 flex gap-3">
                <a href="#catalog" className="btn btn-primary h-11 rounded-md px-5">
                  Shop collection
                </a>
                <Link href="/#about" className="btn btn-ghost h-11 rounded-md px-5">
                  Learn more
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?q=80&w=1600&auto=format&fit=crop"
                  alt="Featured product"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-indigo-200/30 blur-3xl"
        />
      </section>

      <section id="catalog" className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-xl font-semibold">Featured products</h2>
            <p className="text-sm text-gray-600">Trending now across categories</p>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}

