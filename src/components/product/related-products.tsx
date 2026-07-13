import Link from "next/link";
import Image from "next/image";
import { Product, ACCENT_COLORS, formatCOP } from "@/lib/products";

export function RelatedProducts({ products }: { products: Product[] }) {
  return (
    <div className="border-t border-cream-3 py-[72px] max-w-[1360px] mx-auto px-16 md:px-7 md:py-14">
      <p className="text-[10px] font-medium tracking-[0.26em] uppercase text-gold mb-2.5">
        Completa tu colección
      </p>
      <h2 className="font-display text-[clamp(24px,2.5vw,36px)] font-light text-ink mb-10">
        Las otras dos <em className="italic text-brown">expresiones del Huila</em>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-cream-3 border border-cream-3">
        {products.map((p) => {
          const colors = ACCENT_COLORS[p.accent];
          return (
            <Link
              key={p.slug}
              href={`/cafes/${p.slug}`}
              className="bg-white-warm grid grid-cols-[180px_1fr] hover:bg-cream transition-colors cursor-pointer no-underline"
            >
              <div className="h-[200px] overflow-hidden relative">
                <Image src={p.image} alt={p.name} fill sizes="180px" className="object-cover transition-transform duration-500 hover:scale-105" />
              </div>
              <div className="p-6 flex flex-col justify-center">
                <p className="text-[9.5px] font-semibold tracking-[0.18em] uppercase mb-1.5" style={{ color: colors.base }}>
                  {p.badge} · {p.kicker}
                </p>
                <h3 className="font-display text-xl font-medium text-ink mb-1">{p.name}</h3>
                <p className="font-display text-xs italic text-brown-light mb-3">{p.variety}</p>
                <div className="flex flex-wrap gap-1.5 mb-3.5">
                  {p.notes.slice(0, 3).map((n) => (
                    <span key={n} className="text-[11px] px-2.5 py-0.5 border border-cream-3 text-brown">
                      {n}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-display text-lg text-ink">
                      {formatCOP(p.variants[0].price)} <span className="text-[11px] text-brown-light font-body">/{p.variants[0].weight}</span>
                    </div>
                    <div className="text-[9.5px] font-semibold tracking-[0.12em]" style={{ color: colors.base }}>
                      {p.sca} pts SCA
                    </div>
                  </div>
                  <span className="px-4 py-1.5 border border-cream-3 text-[11px] font-medium tracking-[0.1em] uppercase text-brown-light">
                    Ver
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
