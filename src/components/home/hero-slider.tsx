"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

const SLIDES = [
  {
    image: "/images/bourbon-main.jpg",
    eyebrow: "Origen exclusivo · Huila, Colombia",
    title: "El alma del café",
    titleEm: "colombiano",
    subtitle: "en cada taza",
    cta: { label: "Comprar ahora", href: "/cafes" },
    ctaSecondary: { label: "Bourbon Rosado — 92 pts SCA", href: "/cafes/bourbon-rosado" },
    accent: "#C8A84A",
  },
  {
    image: "/images/colombia-main.jpg",
    eyebrow: "Variedad Colombia · Proceso Honey",
    title: "Sofisticado,",
    titleEm: "complejo",
    subtitle: "87 puntos SCA · Bolsa negra",
    cta: { label: "Descubrir", href: "/cafes/variedad-colombia" },
    ctaSecondary: { label: "Ver toda la colección", href: "/cafes" },
    accent: "#8B1A1A",
  },
  {
    image: "/images/blend-main.jpg",
    eyebrow: "Blend · Proceso Lavado",
    title: "El favorito",
    titleEm: "de siempre",
    subtitle: "82 puntos SCA · Bolsa roja",
    cta: { label: "Descubrir", href: "/cafes/blend" },
    ctaSecondary: { label: "Ver toda la colección", href: "/cafes" },
    accent: "#9B2020",
  },
  {
    image: "/images/bourbon-2.jpg",
    eyebrow: "Tostado fresco",
    title: "Fresco del",
    titleEm: "origen",
    subtitle: "Santa María · 2.000 m.s.n.m.",
    cta: { label: "Comprar ahora", href: "/cafes" },
    ctaSecondary: { label: "Nuestra historia", href: "/origen" },
    accent: "#C8A84A",
  },
];

export function HeroSlider() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  const goTo = useCallback((idx: number) => {
    if (transitioning || idx === active) return;
    setTransitioning(true);
    setPrev(active);
    setActive(idx);
    setTimeout(() => { setPrev(null); setTransitioning(false); }, 800);
  }, [active, transitioning]);

  const goNext = useCallback(() => goTo((active + 1) % SLIDES.length), [active, goTo]);

  // Autoplay 6 segundos
  useEffect(() => {
    const t = setInterval(goNext, 6000);
    return () => clearInterval(t);
  }, [goNext]);

  const slide = SLIDES[active];

  return (
    <section className="relative h-[100svh] min-h-[600px] overflow-hidden" aria-label="Hero Maximilien Coffee">

      {/* Imágenes con crossfade */}
      {SLIDES.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === active ? 1 : 0, zIndex: i === active ? 1 : 0 }}
        >
          <Image
            src={s.image}
            alt={`Maximilien Coffee — ${s.titleEm}`}
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority={i === 0}
          />
          {/* Overlay gradiente */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(
                105deg,
                rgba(10,7,4,0.88) 0%,
                rgba(10,7,4,0.60) 40%,
                rgba(10,7,4,0.20) 75%,
                rgba(10,7,4,0.10) 100%
              )`
            }}
          />
        </div>
      ))}

      {/* Contenido */}
      <div className="relative z-10 h-full flex flex-col justify-end md:justify-center px-6 md:px-20 pb-24 md:pb-0 max-w-[760px]">
        <p
          key={`ey-${active}`}
          className="text-[10px] font-medium tracking-[0.3em] uppercase mb-5 flex items-center gap-3 animate-fade-in"
          style={{ color: slide.accent }}
        >
          <span className="w-8 h-px shrink-0" style={{ background: slide.accent }} />
          {slide.eyebrow}
        </p>

        <h1
          key={`h-${active}`}
          className="font-display font-normal leading-[1.05] text-cream mb-2 animate-slide-up"
          style={{ fontSize: "clamp(42px, 8vw, 96px)" }}
        >
          {slide.title}
          <br />
          <em className="italic" style={{ color: slide.accent }}>{slide.titleEm}</em>
        </h1>

        <p
          key={`sub-${active}`}
          className="font-display italic text-cream/45 tracking-[0.1em] mb-10 animate-fade-in"
          style={{ fontSize: "clamp(14px, 2vw, 20px)" }}
        >
          {slide.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Link
            href={slide.cta.href}
            className="px-9 py-4 font-body text-[11px] font-semibold tracking-[0.2em] uppercase no-underline transition-all active:scale-[0.98] hover:-translate-y-px"
            style={{ background: slide.accent, color: "#0A0704" }}
          >
            {slide.cta.label}
          </Link>
          <Link
            href={slide.ctaSecondary.href}
            className="font-display italic text-cream/50 no-underline flex items-center gap-2 hover:gap-4 hover:text-cream/80 transition-all"
            style={{ fontSize: "clamp(13px,1.5vw,16px)" }}
          >
            {slide.ctaSecondary.label} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      {/* Controles: puntos + flechas */}
      <div className="absolute bottom-8 right-6 md:right-12 z-10 flex flex-col items-end gap-4">
        {/* Flechas */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => goTo((active - 1 + SLIDES.length) % SLIDES.length)}
            aria-label="Slide anterior"
            className="w-10 h-10 rounded-full border border-cream/25 flex items-center justify-center text-cream/60 hover:border-cream/60 hover:text-cream transition-all text-lg"
          >‹</button>
          <button
            onClick={goNext}
            aria-label="Siguiente slide"
            className="w-10 h-10 rounded-full border border-cream/25 flex items-center justify-center text-cream/60 hover:border-cream/60 hover:text-cream transition-all text-lg"
          >›</button>
        </div>
        {/* Dots */}
        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Ir al slide ${i + 1}`}
              className="transition-all duration-300"
              style={{
                width:  i === active ? "28px" : "6px",
                height: "6px",
                borderRadius: "3px",
                background: i === active ? slide.accent : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-[2px] bg-cream/10">
        <div
          key={active}
          className="h-full"
          style={{
            background: slide.accent,
            animation: "progress 6s linear forwards",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to   { width: 100%; }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: none; }
        }
        .animate-fade-in  { animation: fade-in  0.6s ease forwards; }
        .animate-slide-up { animation: slide-up 0.7s ease forwards; }
      `}</style>
    </section>
  );
}
