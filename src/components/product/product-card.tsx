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
    <Link href={`/cafes/${product.slug}`} className="group block bg-white-warm hover:bg-cream transition-colors no-underline">
      {/* Accent top strip */}
      <div className="h-1" style={{ background: `linear-gradient(90deg,${colors.dark},${colors.base},${colors.dark})` }} aria-hidden="true" />

      {/* Image */}
      <div
        className="relative h-[260px] sm:h-[300px] md:h-[340px] overflow-hidden"
        style={{ background: product.accent === "bourbon" ? "#F2E8D0" : product.accent === "colombia" ? "#1A0808" : "#120404" }}
      >
        <Image
          src={product.image} alt={`${product.name} — Maximilien Coffee`}
          fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          style={{ filter: product.accent !== "bourbon" ? "brightness(0.86)" : undefined }}
        />
        {/* SCA */}
        <div
          className="absolute top-3 right-3 md:top-4 md:right-4 w-12 h-12 md:w-[52px] md:h-[52px] rounded-full flex flex-col items-center justify-center border-2 border-white-warm shadow"
          style={{ background: colors.base }}
          aria-label={`${product.sca} puntos SCA`}
        >
          <span className="font-display text-sm md:text-base font-semibold leading-none" style={{ color: product.accent === "bourbon" ? "#0A0704" : "#FDFAF2" }}>
            {product.sca}
          </span>
          <span className="text-[6px] font-semibold tracking-[0.1em]" style={{ color: product.accent === "bourbon" ? "rgba(10,7,4,.5)" : "rgba(255,255,255,.6)" }}>SCA</span>
        </div>
        {/* Badge */}
        <div className="absolute top-3 left-3 md:top-4 md:left-4 px-2.5 py-1 text-[9px] font-semibold tracking-[0.12em] uppercase"
          style={{ background: product.accent === "bourbon" ? "#0A0704" : "rgba(10,7,4,0.75)", color: colors.pale }}>
          {product.badge}
        </div>
        {/* Wishlist */}
        <button
          onClick={e => { e.preventDefault(); e.stopPropagation(); }}
          aria-label={`Guardar ${product.name} en favoritos`}
          className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white-warm/85 flex items-center justify-center text-brown-light opacity-0 group-hover:opacity-100 md:opacity-0 transition-opacity"
        >♡</button>
      </div>

      {/* Info */}
      <div className="p-4 md:p-6 pb-5 md:pb-7">
        <p className="text-[9.5px] font-semibold tracking-[0.18em] uppercase mb-1.5" style={{ color: colors.base }}>
          {product.kicker}
        </p>
        <h3 className="font-display text-xl md:text-2xl font-medium text-ink leading-tight mb-1">
          {product.name}
        </h3>
        <p className="font-display text-[12px] italic font-light text-brown-light mb-3 md:mb-4">
          {product.variety} · {product.process}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-4 md:mb-5">
          {product.notes.slice(0, 3).map(n => (
            <span key={n} className="px-2.5 py-1 border border-cream-3 bg-cream text-[10.5px] text-brown">{n}</span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="font-display text-xl md:text-[22px] text-ink">
            {formatCOP(cheapest.price)}{" "}
            <span className="text-[10px] text-brown-light font-body">/ {cheapest.weight}</span>
          </div>
          <button
            onClick={handleAdd}
            aria-label={`Añadir ${product.name} al carrito`}
            className="w-10 h-10 border border-cream-3 text-xl text-brown-light flex items-center justify-center hover:text-ink transition-colors active:scale-90"
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = colors.base;
              (e.currentTarget as HTMLButtonElement).style.borderColor = colors.base;
              (e.currentTarget as HTMLButtonElement).style.color = product.accent === "bourbon" ? "#0A0704" : "#FDFAF2";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "";
              (e.currentTarget as HTMLButtonElement).style.color = "";
            }}
          >+</button>
        </div>
      </div>
    </Link>
  );
}
