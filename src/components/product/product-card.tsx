"use client";

import Link from "next/link";
import Image from "next/image";
import { Product, ACCENT_COLORS, formatCOP } from "@/lib/products";
import { useCart } from "@/lib/cart-context";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const colors = ACCENT_COLORS[product.accent];
  const cheapest = product.variants[0];

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault(); e.stopPropagation();
    addItem({
      id: `${product.slug}-${cheapest.weight}-filtro`,
      slug: product.slug, name: product.name, accent: product.accent,
      image: product.image, weight: cheapest.weight, grind: "Filtro",
      unitPrice: cheapest.price,
    });
  }

  return (
    <Link href={`/cafes/${product.slug}`} className="group block bg-white-warm no-underline relative overflow-hidden">

      {/* Accent top line — más fina y elegante */}
      <div className="h-[2px] w-full" style={{ background: `linear-gradient(90deg, transparent, ${colors.base}, transparent)` }} aria-hidden="true" />

      {/* Image container — más altura, más protagonismo */}
      <div
        className="relative overflow-hidden"
        style={{
          height: "clamp(280px, 36vw, 420px)",
          background: product.accent === "bourbon"
            ? "linear-gradient(160deg, #F0E4C0 0%, #E0C880 100%)"
            : product.accent === "colombia"
            ? "linear-gradient(160deg, #1A0A0A 0%, #0A0404 100%)"
            : "linear-gradient(160deg, #2A0808 0%, #140404 100%)",
        }}
      >
        <Image
          src={product.image}
          alt={`${product.name} — Maximilien Coffee`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          style={{ filter: product.accent !== "bourbon" ? "brightness(0.9)" : undefined }}
        />

        {/* SCA badge — más elegante */}
        <div
          className="absolute top-4 right-4 w-[50px] h-[50px] rounded-full flex flex-col items-center justify-center"
          style={{
            background: colors.base,
            boxShadow: `0 0 0 1px ${colors.dark}40, 0 4px 12px ${colors.base}40`
          }}
          aria-label={`${product.sca} puntos SCA`}
        >
          <span className="font-display text-[15px] font-semibold leading-none"
            style={{ color: product.accent === "bourbon" ? "#0A0704" : "#FDFAF2" }}>
            {product.sca}
          </span>
          <span className="text-[6px] font-bold tracking-[0.15em] mt-0.5"
            style={{ color: product.accent === "bourbon" ? "rgba(10,7,4,.45)" : "rgba(255,255,255,.55)" }}>
            SCA
          </span>
        </div>

        {/* Badge — más refinado */}
        <div
          className="absolute top-4 left-4 px-3 py-1 text-[9px] font-bold tracking-[0.18em] uppercase"
          style={{
            background: product.accent === "bourbon" ? "rgba(10,7,4,0.85)" : "rgba(10,7,4,0.70)",
            color: colors.pale,
            backdropFilter: "blur(4px)",
          }}>
          {product.badge}
        </div>
      </div>

      {/* Info — más aire y jerarquía */}
      <div className="px-6 pt-6 pb-8">

        {/* Kicker */}
        <p className="text-[9px] font-bold tracking-[0.24em] uppercase mb-2" style={{ color: colors.base }}>
          {product.kicker}
        </p>

        {/* Nombre */}
        <h3 className="font-display text-[22px] md:text-[26px] font-medium text-ink leading-[1.1] mb-1.5">
          {product.name}
        </h3>

        {/* Variedad y proceso */}
        <p className="font-display text-[12px] italic text-brown-light mb-5">
          {product.variety} · Proceso {product.process}
        </p>

        {/* Notas sensoriales — chips más premium */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {product.notes.slice(0, 3).map(n => (
            <span key={n}
              className="px-2.5 py-1 text-[10px] font-medium text-brown border transition-colors duration-300 group-hover:border-current"
              style={{ borderColor: "#E4D4B0", background: "#FAF4E6" }}>
              {n}
            </span>
          ))}
          {product.notes.length > 3 && (
            <span className="px-2.5 py-1 text-[10px] font-medium text-brown-light border border-cream-3 bg-cream">
              +{product.notes.length - 3}
            </span>
          )}
        </div>

        {/* Precio y CTA */}
        <div className="flex items-end justify-between pt-5 border-t border-cream-3">
          <div>
            <p className="text-[9px] tracking-[2px] uppercase text-brown-light mb-1">Desde</p>
            <div className="font-display text-[26px] font-light text-ink leading-none">
              {formatCOP(cheapest.price)}
              <span className="text-[11px] text-brown-light font-body ml-1">/ {cheapest.weight}</span>
            </div>
          </div>
          <button
            onClick={handleAdd}
            aria-label={`Añadir ${product.name} al carrito`}
            className="flex items-center gap-2 px-4 py-2.5 text-[10px] font-bold tracking-[0.18em] uppercase transition-all duration-300 active:scale-95"
            style={{ background: colors.base, color: product.accent === "bourbon" ? "#0A0704" : "#FDFAF2" }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = colors.dark;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = colors.base;
            }}
          >
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M8 3v10M3 8h10"/>
            </svg>
            Añadir
          </button>
        </div>
      </div>

      {/* Bottom accent line on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] transition-transform duration-500 origin-left scale-x-0 group-hover:scale-x-100"
        style={{ background: `linear-gradient(90deg, ${colors.base}, ${colors.dark})` }}
        aria-hidden="true"
      />
    </Link>
  );
}
