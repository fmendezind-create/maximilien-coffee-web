import Link from "next/link";
import Image from "next/image";

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: "https://instagram.com/maximiliencoffee",
    icon: <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@maximiliencoffee",
    icon: <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 104 4V4a5 5 0 005 5"/></svg>
  },
];

export function Footer() {
  return (
    <>
      <div className="divider-gold" />
      <footer className="bg-ink text-cream">

        {/* Main footer grid */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Columna marca */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <Image src="/images/logo.jpg" alt="Maximilien Coffee" width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <div className="font-display text-[11px] font-semibold tracking-[0.2em] text-cream">MAXIMILIEN COFFEE</div>
                <div className="font-display text-[13px] italic tracking-[0.18em] text-gold mt-0.5">Alma de Café</div>
              </div>
            </div>
            <p className="text-[12px] font-light leading-[1.8] text-cream/45 mb-6">
              Café de especialidad con origen único en Santa María, Huila. Del productor a tu taza, sin intermediarios.
            </p>
            {/* Redes sociales */}
            <div>
              <p className="text-[9px] font-semibold tracking-[0.22em] uppercase text-gold/60 mb-3">Síguenos</p>
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map(s => (
                  <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
                    aria-label={s.name}
                    className="w-8 h-8 border border-cream/15 flex items-center justify-center text-cream/40 hover:border-gold/40 hover:text-gold transition-all">
                    {s.icon}
                  </a>
                ))}
                <a href="https://wa.me/573001234567" target="_blank" rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-8 h-8 border border-cream/15 flex items-center justify-center text-cream/40 hover:border-gold/40 hover:text-gold transition-all">
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Columna navegación */}
          <div>
            <p className="text-[9px] font-semibold tracking-[0.22em] uppercase text-gold/60 mb-5">Navegación</p>
            <nav className="space-y-2.5">
              {[
                { href: "/", label: "Inicio" },
                { href: "/cafes", label: "Catálogo" },
                { href: "/origen", label: "Origen" },
                { href: "/barista", label: "Barista IA" },
                { href: "/blog", label: "Blog" },
                { href: "/suscripcion", label: "Suscripción" },
              ].map(l => (
                <Link key={l.href} href={l.href}
                  className="block text-[12px] font-light text-cream/40 hover:text-cream/80 transition-colors no-underline">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Columna información */}
          <div>
            <p className="text-[9px] font-semibold tracking-[0.22em] uppercase text-gold/60 mb-5">Información</p>
            <nav className="space-y-2.5">
              {[
                { href: "/origen", label: "Nuestra historia" },
                { href: "/origen", label: "Nuestro proceso" },
                { href: "/barista", label: "Barista IA" },
                { href: "https://wa.me/573001234567", label: "Servicio al cliente", ext: true },
                { href: "https://wa.me/573001234567", label: "Contacto", ext: true },
              ].map(l => (
                l.ext
                  ? <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                      className="block text-[12px] font-light text-cream/40 hover:text-cream/80 transition-colors no-underline">
                      {l.label}
                    </a>
                  : <Link key={l.href} href={l.href}
                      className="block text-[12px] font-light text-cream/40 hover:text-cream/80 transition-colors no-underline">
                      {l.label}
                    </Link>
              ))}
            </nav>
          </div>

          {/* Columna legal */}
          <div>
            <p className="text-[9px] font-semibold tracking-[0.22em] uppercase text-gold/60 mb-5">Legal</p>
            <nav className="space-y-2.5">
              {[
                { href: "/legal/privacidad", label: "Política de Privacidad" },
                { href: "/legal/terminos", label: "Términos y Condiciones" },
                { href: "/legal/cookies", label: "Política de Cookies" },
                { href: "/legal/aviso-legal", label: "Aviso Legal" },
                { href: "/legal/terminos", label: "Política de Envíos" },
              ].map(l => (
                <Link key={l.label} href={l.href}
                  className="block text-[12px] font-light text-cream/40 hover:text-cream/80 transition-colors no-underline">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-cream/8">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-[10px] text-cream/20">© 2026 Maximilien Coffee · Bogotá, Colombia</p>
            <p className="text-[10px] text-cream/20 font-display italic">Santa María, Huila · 2.000 m.s.n.m.</p>
          </div>
        </div>

      </footer>
    </>
  );
}
