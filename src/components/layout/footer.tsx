import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-ink-2 px-6 md:px-16 py-8 flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left">
      <div className="flex items-center gap-2.5">
        <Image src="/images/logo.jpg" alt="Maximilien Coffee" width={32} height={32} className="w-8 h-8 rounded-full object-cover" />
        <div>
          <div className="font-display text-[11px] font-semibold tracking-[0.18em] text-cream">MAXIMILIEN COFFEE</div>
          <div className="font-display text-[9px] italic tracking-[0.16em] text-gold">Alma de Café</div>
        </div>
      </div>
      <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2" aria-label="Links del footer">
        {[
          { href: "/", label: "Inicio" },
          { href: "/cafes", label: "Catálogo" },
          { href: "/origen", label: "Origen" },
        { href: "/suscripcion", label: "Suscripción" },
        ].map(l => (
          <Link key={l.href} href={l.href} className="text-[11px] text-cream/30 hover:text-cream/65 transition-colors no-underline">{l.label}</Link>
        ))}
        <a href="https://wa.me/573001234567" target="_blank" rel="noopener noreferrer" className="text-[11px] text-cream/30 hover:text-cream/65 transition-colors no-underline">WhatsApp</a>
      </nav>
      <p className="text-[10px] text-cream/20">© 2025 Maximilien Coffee</p>
    </footer>
  );
}
