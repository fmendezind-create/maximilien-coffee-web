"use client";

import Link from "next/link";
import { useReveal } from "@/lib/use-reveal";

export function Hero() {
  const r1 = useReveal<HTMLParagraphElement>();
  const r2 = useReveal<HTMLHeadingElement>();
  const r3 = useReveal<HTMLDivElement>();

  return (
    <section
      className="relative min-h-[100svh] overflow-hidden flex items-end md:items-center"
      aria-label="Portada Maximilien Coffee"
    >
      {/* Fondo */}
      <div
        className="absolute inset-0 bg-cover bg-[center_30%]"
        style={{ backgroundImage: "url(/images/hero-bg.svg)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(10,7,4,0.3) 0%, rgba(10,7,4,0.82) 60%, rgba(10,7,4,0.92) 100%)" }}
        aria-hidden="true"
      />

      {/* Contenido */}
      <div className="relative z-10 px-6 pb-16 pt-24 md:px-20 md:pb-0 md:pt-0 max-w-[720px] w-full">
        <p
          ref={r1}
          className="reveal flex items-center gap-3 text-[10px] font-medium tracking-[0.28em] uppercase text-gold mb-6"
        >
          <span className="w-7 h-px bg-gold shrink-0" aria-hidden="true" />
          Café de especialidad · Origen Huila · Colombia
        </p>

        <h1
          ref={r2}
          className="reveal font-display font-light leading-[1.05] text-cream mb-3"
          style={{ fontSize: "clamp(38px, 8vw, 88px)" }}
        >
          El alma del
          <br />
          café colombiano
          <br />
          <em className="italic text-gold-light">en cada taza</em>
        </h1>

        <p className="font-display text-base italic text-cream/40 tracking-[0.14em] mb-10">
          — Alma de Café —
        </p>

        <div ref={r3} className="reveal flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Link
            href="/cafes"
            className="w-full sm:w-auto text-center px-8 py-4 bg-gold text-ink font-body text-[11px] font-semibold tracking-[0.18em] uppercase no-underline hover:bg-gold-light transition-all active:scale-[0.98]"
          >
            Comprar ahora
          </Link>
          <Link
            href="/origen"
            className="font-display text-base italic text-cream/50 no-underline flex items-center gap-2 hover:text-gold-light transition-colors px-1"
          >
            Nuestra historia
            <span className="text-lg" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-2" aria-hidden="true">
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-gold" />
        <span className="text-[9px] tracking-[0.22em] uppercase text-cream/30">Scroll</span>
      </div>
    </section>
  );
}
