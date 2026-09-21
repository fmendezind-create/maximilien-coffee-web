"use client";

import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/product/product-card";
import { useReveal } from "@/lib/use-reveal";


function ComboCard() {
  return (
    <Link href="/cafes/combo-navidad" className="group block bg-ink no-underline relative overflow-hidden min-h-[480px]">
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <Image
          src="/images/Combo_1.webp"
          alt="Combo Navidad Maximilien Coffee"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover opacity-50 transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/20" />
      </div>

      {/* Badge */}
      <div className="absolute top-4 left-4 px-3 py-1 text-[9px] font-bold tracking-[0.2em] uppercase bg-gold text-ink">
        Edicion limitada
      </div>

      {/* Contenido */}
      <div className="absolute bottom-0 left-0 right-0 px-6 pb-8">
        <p className="text-[9px] font-semibold tracking-[0.24em] uppercase text-gold mb-2">
          Combo de temporada
        </p>
        <h3 className="font-display text-[28px] font-light text-cream leading-[1.1] mb-2">
          Combo<br /><em className="italic text-gold">Navidad</em>
        </h3>
        <p className="text-[12px] font-light text-cream/60 mb-5">
          2 bolsas 250g de tu eleccion + vaso mezclador premium
        </p>
        <div className="flex items-end justify-between border-t border-cream/10 pt-4">
          <div>
            <p className="text-[9px] tracking-[2px] uppercase text-cream/40 mb-1">Precio especial</p>
            <p className="font-display text-[26px] font-light text-cream leading-none">
              $99.000
            </p>
          </div>
          <span className="text-[10px] font-semibold text-gold group-hover:gap-3 flex items-center gap-2 transition-all">
            Ver combo <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold to-gold/50 transition-transform duration-500 origin-left scale-x-0 group-hover:scale-x-100" />
    </Link>
  );
}

export function Collection() {
  const titleRef = useReveal<HTMLDivElement>();
  const gridRef  = useReveal<HTMLDivElement>();

  return (
    <section aria-labelledby="collection-title" className="py-20 md:py-28">
      <div ref={titleRef} className="reveal text-center px-6 mb-16 max-w-[640px] mx-auto">
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
        className="reveal grid grid-cols-1 md:grid-cols-2 gap-px bg-cream-3 border border-cream-3 mx-0 md:mx-6 lg:mx-12"
      >
        {PRODUCTS.map(p => <ProductCard key={p.slug} product={p} />)}
        <ComboCard />
      </div>
    </section>
  );
}
