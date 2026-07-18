"use client";

import Image from "next/image";
import Link from "next/link";
import { useReveal } from "@/lib/use-reveal";

const STATS = [
  { num: "2.000", unit: "m.s.n.m.", label: "Altitud promedio de cultivo" },
  { num: "92",    unit: "pts SCA",  label: "Máxima puntuación alcanzada" },
  { num: "100%",  unit: "directo",  label: "Compra directa al productor" },
  { num: "3",     unit: "lotes",    label: "Referencias de origen único" },
];

const TERROIR = [
  { icon: "🌡️", title: "Clima bifásico", body: "Dos épocas lluviosas al año crean condiciones únicas de maduración lenta. Las noches frías — entre 14 y 18°C — concentran los azúcares en el grano y construyen la complejidad aromática." },
  { icon: "⛰️", title: "Suelos volcánicos", body: "El Macizo Colombiano aporta suelos ricos en materia orgánica y minerales volcánicos. Esta composición única es la que da al Bourbon Rosado sus notas florales imposibles de replicar en otras regiones." },
  { icon: "🌊", title: "Cañón del Magdalena", body: "La influencia del río Magdalena regula la humedad y crea corrientes de aire que protegen las plantas durante las épocas críticas de floración. El resultado es una cosecha más consistente y concentrada." },
  { icon: "☀️", title: "Brillo solar óptimo", body: "Santa María recibe entre 1.800 y 2.000 horas de luz solar al año — exactamente lo que el café de especialidad necesita para desarrollar sus mejores atributos sin estrés hídrico." },
];

const PROCESO = [
  { num: "01", title: "Cosecha selectiva", body: "Solo cerezas en su punto óptimo de madurez. Un proceso manual que puede tomar 3 veces más tiempo que la cosecha mecanizada — pero es lo que diferencia 92 puntos de 80." },
  { num: "02", title: "Procesamiento en finca", body: "Cada lote se procesa con el método definido para esa variedad: natural para el Bourbon Rosado, honey para la Variedad Colombia, lavado para el Blend. El proceso comienza máximo 6 horas después de la cosecha." },
  { num: "03", title: "Secado controlado", body: "Camas africanas elevadas permiten una circulación de aire uniforme. El secado toma entre 25 y 40 días dependiendo del proceso. Volteo manual cada 2 horas durante el día para una fermentación homogénea." },
  { num: "04", title: "Tostión en Bogotá", body: "Lotes de máximo 5 kg. Perfil de tueste diseñado específicamente para cada variedad para resaltar sus notas características. Despachamos dentro de los 7 días post tostión para garantizar frescura máxima." },
];

export function OrigenClient() {
  const heroRef    = useReveal<HTMLDivElement>();
  const statsRef   = useReveal<HTMLDivElement>();
  const storRef    = useReveal<HTMLDivElement>();
  const terrRef    = useReveal<HTMLDivElement>();
  const mapRef     = useReveal<HTMLDivElement>();
  const procRef    = useReveal<HTMLDivElement>();
  const ctaRef     = useReveal<HTMLDivElement>();

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative h-[70vh] min-h-[520px] overflow-hidden flex items-end" aria-labelledby="origen-hero">
        <div className="absolute inset-0 bg-cover bg-center bg-[url('/images/bourbon-1.jpg')]" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,7,4,0.2) 0%, rgba(10,7,4,0.85) 100%)" }} />
        <div ref={heroRef} className="reveal relative z-10 px-6 md:px-20 pb-16 max-w-[800px]">
          <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-gold mb-4 flex items-center gap-3">
            <span className="w-8 h-px bg-gold shrink-0" />
            Santa María · Huila · Colombia
          </p>
          <h1 id="origen-hero" className="font-display font-normal leading-[1.05] text-cream mb-4" style={{ fontSize: "clamp(38px,6vw,72px)" }}>
            El terroir que<br /><em className="italic text-gold-light">lo hace posible</em>
          </h1>
          <p className="text-[15px] font-light leading-[1.85] text-cream/60 max-w-[520px]">
            A 2.000 metros sobre el nivel del mar, entre el Macizo Colombiano y el río Magdalena, nace el café que alcanza 92 puntos SCA. No es suerte. Es terruño.
          </p>
        </div>
      </section>

      {/* ── STATS ── */}
      <div ref={statsRef} className="reveal bg-ink-2 py-12 px-6 md:px-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-[1100px] mx-auto">
          {STATS.map(s => (
            <div key={s.num} className="text-center">
              <div className="font-display font-light text-gold-light leading-none mb-1" style={{ fontSize: "clamp(32px,4vw,52px)" }}>
                {s.num} <span className="text-[14px] tracking-[0.1em]">{s.unit}</span>
              </div>
              <div className="text-[11px] tracking-[0.12em] uppercase text-cream/35 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── HISTORIA ── */}
      <section className="py-20 px-6 md:px-20 max-w-[1200px] mx-auto" aria-labelledby="historia-title">
        <div ref={storRef} className="reveal grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[10px] font-medium tracking-[0.28em] uppercase text-gold mb-3">Nuestra historia</p>
            <h2 id="historia-title" className="font-display font-normal leading-[1.1] text-ink mb-6" style={{ fontSize: "clamp(28px,3.5vw,44px)" }}>
              De la montaña<br /><em className="italic text-brown">a tu taza</em>
            </h2>
            <p className="text-[14px] font-light leading-[1.9] text-brown-light mb-5">
              Maximilien Coffee nació de una pregunta simple: ¿por qué el mejor café del mundo se exporta entero mientras Colombia consume lo que sobra?
            </p>
            <p className="text-[14px] font-light leading-[1.9] text-brown-light mb-5">
              Trabajamos directamente con las familias productoras de la vereda en Santa María, Huila — una de las zonas cafeteras más remotas y privilegiadas del país. Les pagamos por encima del precio de mercado porque sabemos que sin ellos, este café no existe.
            </p>
            <p className="text-[14px] font-light leading-[1.9] text-brown-light">
              El resultado es un café que compite con los mejores del mundo. No con el café de supermercado.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-sm">
              <Image
                src="/images/colombia-1.jpg"
                alt="Cafetal en Santa María, Huila"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {/* Badge flotante */}
            <div className="absolute -bottom-5 -left-5 bg-gold text-ink px-6 py-4 shadow-xl hidden md:block">
              <div className="font-display text-2xl font-semibold leading-none">92</div>
              <div className="text-[9px] font-semibold tracking-[0.12em] uppercase mt-0.5 opacity-60">pts SCA</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TERROIR ── */}
      <section className="bg-gray-warm py-20 px-6 md:px-20" aria-labelledby="terroir-title">
        <div className="max-w-[1200px] mx-auto">
          <div ref={terrRef} className="reveal text-center mb-14">
            <p className="text-[10px] font-medium tracking-[0.28em] uppercase text-gold mb-3">El terroir</p>
            <h2 id="terroir-title" className="font-display font-normal text-ink" style={{ fontSize: "clamp(26px,3vw,40px)" }}>
              Por qué el Huila produce<br /><em className="italic text-brown">los mejores cafés de Colombia</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-cream-3 border border-cream-3">
            {TERROIR.map(t => (
              <div key={t.title} className="bg-white-warm p-8 md:p-10">
                <div className="text-3xl mb-4" aria-hidden="true">{t.icon}</div>
                <h3 className="font-display text-xl font-medium text-ink mb-3">{t.title}</h3>
                <p className="text-[13.5px] font-light leading-[1.85] text-brown-light">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAPA ── */}
      <section className="py-20 px-6 md:px-20" aria-labelledby="mapa-title">
        <div className="max-w-[1200px] mx-auto">
          <div ref={mapRef} className="reveal grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-[10px] font-medium tracking-[0.28em] uppercase text-gold mb-3">Dónde estamos</p>
              <h2 id="mapa-title" className="font-display font-normal text-ink mb-6" style={{ fontSize: "clamp(26px,3vw,40px)" }}>
                Santa María,<br /><em className="italic text-brown">Huila · Colombia</em>
              </h2>

              {/* Datos del cafetal */}
              <div className="space-y-4 mb-8">
                {[
                  { label: "Municipio",    value: "Santa María, Huila" },
                  { label: "Altitud",      value: "1.800 – 2.100 m.s.n.m." },
                  { label: "Temperatura",  value: "14 – 22°C" },
                  { label: "Precipitación",value: "1.800 – 2.200 mm/año" },
                  { label: "Variedad top", value: "Bourbon Rosado" },
                  { label: "Proceso",      value: "Natural · Honey · Lavado" },
                  { label: "Certificación",value: "SCA Specialty Grade 85+" },
                ].map(d => (
                  <div key={d.label} className="flex items-baseline justify-between border-b border-cream-3 pb-3">
                    <span className="text-[11px] font-medium tracking-[0.12em] uppercase text-brown-light">{d.label}</span>
                    <span className="text-[13px] text-ink font-light">{d.value}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/cafes"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-ink text-[11px] font-semibold tracking-[0.16em] uppercase no-underline hover:bg-gold-light transition-colors"
              >
                Ver nuestros cafés →
              </Link>
            </div>

            {/* Mapa embed de Google Maps */}
            <div className="flex flex-col gap-4">
              <div className="w-full overflow-hidden rounded-sm border border-cream-3 shadow-sm" style={{ height: "420px" }}>
                <iframe
                  title="Santa María, Huila — Origen Maximilien Coffee"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31812.45!2d-75.9291!3d1.9694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e250d4d6b5b5b5b%3A0x1234567890abcdef!2sSanta%20Mar%C3%ADa%2C%20Huila%2C%20Colombia!5e1!3m2!1ses!2sco!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              {/* Info card sobre el mapa */}
              <div className="bg-ink-2 px-6 py-4 flex items-center gap-4">
                <span className="text-2xl" aria-hidden="true">📍</span>
                <div>
                  <div className="text-sm font-medium text-cream">Santa María · Huila · Colombia</div>
                  <div className="text-[11px] text-cream/40 mt-0.5">A 4 horas de Bogotá · Macizo Colombiano</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESO DEL CAMPO A LA TAZA ── */}
      <section className="bg-ink-2 py-20 px-6 md:px-20" aria-labelledby="proceso-title">
        <div className="max-w-[1100px] mx-auto">
          <div ref={procRef} className="reveal text-center mb-14">
            <p className="text-[10px] font-medium tracking-[0.28em] uppercase text-gold mb-3">Del árbol a tu taza</p>
            <h2 id="proceso-title" className="font-display font-normal text-cream" style={{ fontSize: "clamp(26px,3vw,40px)" }}>
              El proceso detrás<br /><em className="italic text-gold-light">de cada grano</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5">
            {PROCESO.map(p => (
              <div key={p.num} className="bg-ink-2 p-8 border border-white/5">
                <div className="font-display text-5xl font-light text-white/10 leading-none mb-4">{p.num}</div>
                <h3 className="font-display text-lg font-medium text-cream mb-3">{p.title}</h3>
                <p className="text-[12.5px] font-light leading-[1.8] text-cream/45">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6 text-center bg-white-warm" aria-labelledby="cta-title">
        <div ref={ctaRef} className="reveal max-w-[560px] mx-auto">
          <p className="text-[10px] font-medium tracking-[0.28em] uppercase text-gold mb-4">Alma de Café</p>
          <h2 id="cta-title" className="font-display font-normal text-ink mb-5" style={{ fontSize: "clamp(26px,3vw,40px)" }}>
            Prueba el café<br /><em className="italic text-brown">que lo hace posible</em>
          </h2>
          <p className="text-[14px] font-light text-brown-light leading-[1.85] mb-8">
            Tostado esta semana en Bogotá. En tu puerta en 2–5 días hábiles.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/cafes/bourbon-rosado"
              className="w-full sm:w-auto text-center px-9 py-4 bg-gold text-ink text-[11px] font-semibold tracking-[0.18em] uppercase no-underline hover:bg-gold-light transition-colors"
            >
              Bourbon Rosado — 92 pts
            </Link>
            <Link
              href="/cafes"
              className="w-full sm:w-auto text-center px-9 py-4 border border-cream-3 text-brown text-[11px] font-medium tracking-[0.14em] uppercase no-underline hover:border-gold hover:text-gold transition-colors"
            >
              Ver toda la colección
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
