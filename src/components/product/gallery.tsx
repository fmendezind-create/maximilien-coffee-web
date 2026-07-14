"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";

interface GalleryProps {
  images: { src: string; alt: string }[];
  accent: string;
  pale: string;
  sca: number;
  badge: string;
}

export function Gallery({ images, accent, pale, sca, badge }: GalleryProps) {
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const prev = useCallback(() => setActive(i => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setActive(i => (i + 1) % images.length), [images.length]);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    // Solo swipe horizontal (no vertical scroll)
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      dx < 0 ? next() : prev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  }

  return (
    <div
      className="relative h-[65vw] max-h-[500px] lg:h-[calc(100vh-64px)] lg:max-h-none overflow-hidden select-none"
      style={{ background: "#1A0A00" }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-label="Galería del producto"
    >
      {/* Imagen activa */}
      {images.map((img, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-400"
          style={{ opacity: active === i ? 1 : 0, pointerEvents: active === i ? "auto" : "none" }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-contain"
            priority={i === 0}
          />
        </div>
      ))}

      {/* Flechas — solo desktop */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Imagen anterior"
            className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 items-center justify-center text-white transition-colors"
          >
            ‹
          </button>
          <button
            onClick={next}
            aria-label="Siguiente imagen"
            className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 items-center justify-center text-white transition-colors"
          >
            ›
          </button>
        </>
      )}

      {/* SCA badge */}
      <div
        className="absolute top-4 right-4 w-14 h-14 md:w-[68px] md:h-[68px] rounded-full flex flex-col items-center justify-center border-2 border-white shadow-lg z-10"
        style={{ background: accent }}
        aria-label={`${sca} puntos SCA`}
      >
        <span className="font-display text-lg md:text-[22px] font-semibold leading-none text-ink">{sca}</span>
        <span className="text-[7px] font-semibold tracking-[0.1em] text-ink/50">SCA pts</span>
      </div>

      {/* Badge texto */}
      <div
        className="absolute top-4 left-4 px-3 py-1 text-[9px] font-semibold tracking-[0.14em] uppercase z-10"
        style={{ background: "rgba(10,7,4,0.7)", color: pale }}
      >
        {badge}
      </div>

      {/* Thumbnails + dots */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
          {/* Thumbnails — desktop */}
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Ver imagen ${i + 1}`}
              className="hidden md:block w-12 h-12 rounded-sm overflow-hidden border-[1.5px] shrink-0 transition-all hover:-translate-y-0.5"
              style={{ borderColor: active === i ? accent : "transparent" }}
            >
              <Image src={img.src} alt="" width={48} height={48} className="w-full h-full object-cover" />
            </button>
          ))}
          {/* Dots — móvil */}
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Ir a imagen ${i + 1}`}
              className="md:hidden w-2 h-2 rounded-full transition-all"
              style={{ background: active === i ? accent : "rgba(255,255,255,0.4)" }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
