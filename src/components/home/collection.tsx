"use client";

import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/product/product-card";
import { useReveal } from "@/lib/use-reveal";

export function Collection() {
  const titleRef = useReveal<HTMLDivElement>();
  const gridRef  = useReveal<HTMLDivElement>();

  return (
    <section aria-labelledby="collection-title" className="py-16 md:py-20">
      <div ref={titleRef} className="reveal text-center px-6 mb-12 max-w-[640px] mx-auto">
        <p className="text-[10px] font-medium tracking-[0.28em] uppercase text-gold mb-3">
          Nuestra colección
        </p>
        <h2 id="collection-title" className="font-display font-light leading-tight text-ink" style={{ fontSize: "clamp(28px,4vw,48px)" }}>
          Tres expresiones.{" "}
          <br className="hidden sm:block" />
          Un <em className="italic text-brown">solo origen</em>.
        </h2>
        <p className="text-[14px] font-light leading-[1.9] text-brown-light mt-4">
          Todo nuestro café proviene del Huila — la región con los puntajes SCA más altos de Colombia.
        </p>
      </div>

      <div
        ref={gridRef}
        className="reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-cream-3 border border-cream-3 mx-0 md:mx-8"
      >
        {PRODUCTS.map(p => <ProductCard key={p.slug} product={p} />)}
      </div>
    </section>
  );
}
