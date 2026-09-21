import Link from "next/link";
import Image from "next/image";

// ── CONFIGURACION DEL COMBO DE TEMPORADA ─────────────────────────
// Cambia estos valores cada temporada sin tocar el resto del codigo

const COMBO = {
  season: "Navidad 2026",
  badge: "Edicion limitada",
  eyebrow: "Combo de temporada",
  title: "El regalo perfecto",
  titleEm: "para esta Navidad",
  description: "Dos bolsas de cafe de especialidad del Huila mas un vaso mezclador premium. El detalle que sorprende a cualquier amante del cafe.",
  includes: [
    "2 bolsas 250g de tu eleccion",
    "Vaso mezclador premium",
    "Presentacion especial de regalo",
  ],
  price: 99000,
  originalPrice: 114700,
  savings: "14%",
  cta: { label: "Pedir ahora", href: "/cafes/combo-navidad" },
  ctaSecondary: { label: "Personalizar", href: "https://wa.me/573001234567" },
  image: "/images/Combo_1.webp",
  accent: "#C8A84A",
  available: true, // cambia a false para ocultar la seccion
};

function formatCOP(n: number) {
  return "$" + Math.round(n).toLocaleString("es-CO");
}

export function ComboSeason() {
  if (!COMBO.available) return null;

  return (
    <section className="bg-ink overflow-hidden" aria-label={COMBO.season}>
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 min-h-[480px]">

        {/* Imagen */}
        <div className="relative min-h-[300px] md:min-h-auto order-2 md:order-1">
          <Image
            src={COMBO.image}
            alt={COMBO.title + " " + COMBO.titleEm}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent md:bg-gradient-to-l" />
        </div>

        {/* Contenido */}
        <div className="order-1 md:order-2 px-8 md:px-14 py-14 flex flex-col justify-center">
          {/* Badge temporada */}
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 text-[9px] font-bold tracking-[0.2em] uppercase bg-gold text-ink">
              {COMBO.badge}
            </span>
            <span className="text-[9px] tracking-[0.2em] uppercase text-gold/60 font-medium">
              {COMBO.eyebrow}
            </span>
          </div>

          {/* Titulo */}
          <h2 className="font-display font-light text-cream leading-[1.1] mb-5"
            style={{ fontSize: "clamp(28px, 4vw, 48px)" }}>
            {COMBO.title}<br />
            <em className="italic text-gold">{COMBO.titleEm}</em>
          </h2>

          {/* Descripcion */}
          <p className="text-[14px] font-light text-cream/60 leading-[1.8] mb-6 max-w-[380px]">
            {COMBO.description}
          </p>

          {/* Incluye */}
          <div className="mb-8 space-y-2">
            {COMBO.includes.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-1 h-1 rounded-full bg-gold shrink-0" />
                <span className="text-[12px] text-cream/50">{item}</span>
              </div>
            ))}
          </div>

          {/* Precio */}
          <div className="flex items-end gap-4 mb-8">
            <div>
              <p className="text-[9px] tracking-[2px] uppercase text-gold/60 mb-1">Precio especial</p>
              <p className="font-display text-[36px] font-light text-cream leading-none">
                {formatCOP(COMBO.price)}
              </p>
            </div>
            <div className="mb-1">
              <p className="text-[11px] text-cream/30 line-through">{formatCOP(COMBO.originalPrice)}</p>
              <p className="text-[10px] text-gold font-semibold">Ahorras {COMBO.savings}</p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Link href={COMBO.cta.href}
              className="px-8 py-3.5 bg-gold text-ink text-[11px] font-bold tracking-[0.18em] uppercase no-underline hover:bg-gold/90 transition-colors">
              {COMBO.cta.label}
            </Link>
            <a href={COMBO.ctaSecondary.href} target="_blank" rel="noopener noreferrer"
              className="px-8 py-3.5 border border-cream/20 text-cream text-[11px] font-medium tracking-[0.1em] uppercase no-underline hover:border-gold hover:text-gold transition-colors">
              {COMBO.ctaSecondary.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
