"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";

interface NavProps {
  breadcrumb?: { label: string; href?: string }[];
}

export function Nav({ breadcrumb }: NavProps) {
  const { itemCount, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav className="sticky top-0 z-[200] bg-white-warm/95 backdrop-blur-md border-b border-cream-3">
        <div className="flex items-center justify-between px-5 md:px-12 h-16 max-w-[1360px] mx-auto">

          <Link href="/" className="flex items-center gap-2.5 no-underline shrink-0" aria-label="Maximilien Coffee">
            <Image src="/images/logo.jpg" alt="" width={50} height={50} className="w-12 h-12 rounded-full object-cover border border-gold/30" />
            <div>
              <div className="font-display text-[13px] font-semibold tracking-[0.2em] text-ink">Maximilien Coffee</div>
              <div className="font-display text-[9px] italic tracking-[0.18em] text-gold">Alma de Café</div>
            </div>
          </Link>

          {breadcrumb && (
            <div className="hidden md:flex items-center gap-2 text-[11px] text-brown-light">
              {breadcrumb.map((b, i) => (
                <span key={i} className="flex items-center gap-2">
                  {i > 0 && <span className="text-cream-3">/</span>}
                  {b.href
                    ? <Link href={b.href} className="text-brown-light hover:text-gold transition-colors no-underline">{b.label}</Link>
                    : <span className="text-ink font-medium">{b.label}</span>}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-1">
            <div className="hidden md:flex items-center gap-6 mr-4">
              <Link href="/" className="text-[11px] font-medium tracking-[0.12em] uppercase text-brown-light hover:text-gold transition-colors no-underline">Inicio</Link>
              <Link href="/cafes" className="text-[11px] font-medium tracking-[0.12em] uppercase text-brown-light hover:text-gold transition-colors no-underline">Cafés</Link>
            </div>

            <button onClick={openCart} aria-label="Abrir carrito" className="w-10 h-10 flex items-center justify-center text-brown hover:text-gold transition-colors relative">
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-current fill-none stroke-[1.5]">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {itemCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-gold text-ink text-[9px] font-bold flex items-center justify-center">{itemCount}</span>
              )}
            </button>

            <button
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px]"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              <span className={`block w-5 h-[1.5px] bg-ink transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
              <span className={`block w-5 h-[1.5px] bg-ink transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-[1.5px] bg-ink transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Menú móvil fullscreen */}
      <div className={`fixed inset-0 z-[300] bg-white-warm flex flex-col md:hidden transition-opacity duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="flex items-center justify-between px-5 h-16 border-b border-cream-3 shrink-0">
          <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5 no-underline">
            <Image src="/images/logo.jpg" alt="" width={36} height={36} className="w-9 h-9 rounded-full object-cover" />
            <div>
              <div className="font-display text-[13px] font-semibold tracking-[0.2em] text-ink">Maximilien Coffee</div>
              <div className="font-display text-[9px] italic tracking-[0.18em] text-gold">Alma de Café</div>
            </div>
          </Link>
          <button onClick={() => setMenuOpen(false)} aria-label="Cerrar menú" className="w-10 h-10 flex items-center justify-center text-2xl text-brown-light">×</button>
        </div>

        <div className="flex flex-col px-6 pt-8 overflow-y-auto">
          {[
            { href: "/", label: "Inicio", sub: false },
            { href: "/cafes", label: "Cafés", sub: false },
            { href: "/cafes/bourbon-rosado", label: "Bourbon Rosado", sub: true },
            { href: "/cafes/variedad-colombia", label: "Variedad Colombia", sub: true },
            { href: "/cafes/blend", label: "Blend", sub: true },
            { href: "/origen", label: "Origen", sub: false },
            { href: "/barista", label: "Barista IA ✦", sub: false },
            { href: "/blog", label: "Blog", sub: false },
            { href: "/suscripcion", label: "Suscripción", sub: false },
          ].map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`py-4 border-b border-cream-3 no-underline transition-colors ${
                link.sub
                  ? "pl-5 text-sm text-brown-light hover:text-gold"
                  : "font-display text-[22px] font-light text-ink hover:text-gold"
              }`}
            >
              {link.sub ? `· ${link.label}` : link.label}
            </Link>
          ))}
        </div>

        <div className="mt-auto px-6 pb-10">
          <a href="https://wa.me/573001234567" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 py-4 border-t border-cream-3 no-underline text-brown-light">
            <span className="text-xl">💬</span>
            <span className="text-sm">WhatsApp · Escríbenos</span>
          </a>
        </div>
      </div>
    </>
  );
}
