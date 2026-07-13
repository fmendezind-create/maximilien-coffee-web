"use client";

import Link from "next/link";
import { useReveal } from "@/lib/use-reveal";

export function Origin() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section
      className="relative min-h-[520px] md:h-[80vh] overflow-hidden flex items-end md:items-center"
      aria-labelledby="origin-title"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/origin-bg.svg)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(10,7,4,0.35) 0%, rgba(10,7,4,0.88) 100%)" }}
        aria-hidden="true"
      />

      <div ref={ref} className="reveal relative z-10 px-6 pb-14 pt-20 md:px-20 md:py-0 max-w-[580px]">
        <p className="text-[10px] font-medium tracking-[0.28em] uppercase text-gold mb-3">
          Origen exclusivo
        </p>
        <h2
          id="origin-title"
          className="font-display font-light leading-[1.15] text-cream"
          style={{ fontSize: "clamp(28px,4vw,48px)" }}
        >
          Huila.
          <br />
          La montaña que
          <br />
          <em className="italic text-gold-light">lo hace posible</em>.
        </h2>
        <p className="text-[14px] font-light leading-[1.9] text-cream/55 mt-5 max-w-[420px]">
          A 2.000 metros sobre el nivel del mar, entre el Macizo Colombiano y el río Magdalena,
          el Huila produce los granos que hacen posible el Bourbon Rosado con 92 puntos SCA.
          No es suerte. Es terruño.
        </p>
        <Link
          href="/origen"
          className="font-display text-base italic text-gold-light no-underline flex items-center gap-2 mt-8 w-fit hover:gap-4 transition-all"
        >
          Conocer el origen <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
