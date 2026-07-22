"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS, formatCOP } from "@/lib/products";

const BENEFITS = [
  { icon: "💰", title: "10% de descuento permanente", desc: "En cada entrega, siempre. Sin excepciones." },
  { icon: "🔥", title: "Tostado fresco para ti", desc: "Tu lote se tuesta el mismo día del despacho." },
  { icon: "🚚", title: "Envío gratis siempre", desc: "Sin importar el monto. Cada mes, sin costo." },
  { icon: "✏️", title: "Cambia cuando quieras", desc: "El café, el peso o la fecha de entrega." },
  { icon: "❌", title: "Cancela cuando quieras", desc: "Sin penalizaciones. Sin preguntas." },
  { icon: "🎁", title: "Acceso prioritario a lotes nuevos", desc: "Los suscriptores son los primeros en probar cada cosecha." },
];

export function SuscripcionClient() {
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [selectedWeight, setSelectedWeight] = useState(PRODUCTS[0].variants[0]);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const discountedPrice = Math.round(selectedWeight.price * 0.9);
  const savings = selectedWeight.price - discountedPrice;

  function handleProductChange(slug: string) {
    const product = PRODUCTS.find(p => p.slug === slug)!;
    setSelectedProduct(product);
    setSelectedWeight(product.variants[0]);
  }

  async function handleSubmit() {
    if (!form.name || !form.email || !form.phone) return;
    setLoading(true);

    // Registrar suscripción en el backend
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/subscriptions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: form.name,
          customer_email: form.email,
          customer_phone: form.phone,
          customer_address: form.address,
          customer_city: form.city,
          product_slug: selectedProduct.slug,
          product_name: selectedProduct.name,
          weight: selectedWeight.weight,
          price_original: selectedWeight.price,
          price_discounted: discountedPrice,
          notes: form.notes,
        }),
      });
    } catch { /* continúa aunque falle el backend */ }

    setSubmitted(true);
    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="max-w-[520px] mx-auto px-6 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-cream border-2 border-gold flex items-center justify-center text-2xl mx-auto mb-6">☕</div>
        <h1 className="font-display text-3xl font-normal text-ink mb-3">
          ¡Bienvenido al <em className="italic text-gold">club!</em>
        </h1>
        <p className="text-[14px] font-light text-brown-light leading-[1.85] mb-8">
          Recibimos tu solicitud de suscripción. Te contactamos en menos de 24 horas para confirmar los detalles y coordinar tu primer despacho.
        </p>
        <div className="bg-cream border border-cream-3 p-6 mb-8 text-left">
          <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-gold mb-3">Tu suscripción</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm"><span className="text-brown-light">Café</span><span className="text-ink font-medium">{selectedProduct.name}</span></div>
            <div className="flex justify-between text-sm"><span className="text-brown-light">Presentación</span><span className="text-ink font-medium">{selectedWeight.weight}</span></div>
            <div className="flex justify-between text-sm"><span className="text-brown-light">Precio mensual</span><span className="text-gold font-medium">{formatCOP(discountedPrice)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-brown-light">Ahorro mensual</span><span className="text-green-700 font-medium">{formatCOP(savings)}</span></div>
          </div>
        </div>
        <Link href="/" className="px-8 py-3.5 bg-ink text-cream text-[11px] font-semibold tracking-[0.14em] uppercase no-underline inline-block hover:bg-ink-2 transition-colors">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-ink-2 px-6 md:px-20 py-16 md:py-20">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[10px] font-medium tracking-[0.28em] uppercase text-gold mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-gold shrink-0"/>
              Suscripción mensual
            </p>
            <h1 className="font-display font-normal leading-[1.05] text-cream mb-5" style={{ fontSize: "clamp(32px,5vw,56px)" }}>
              Tu café favorito,<br/>
              <em className="italic text-gold-light">cada mes con 10% off</em>
            </h1>
            <p className="text-[15px] font-light text-cream/60 leading-[1.85] mb-8 max-w-[480px]">
              Tú eliges el café y el peso. Nosotros lo tostamos fresco y lo enviamos a tu puerta cada mes. Sin complicaciones, sin contratos.
            </p>
            <div className="flex flex-wrap gap-4">
              {["10% descuento", "Envío gratis", "Cancela cuando quieras"].map(b => (
                <div key={b} className="flex items-center gap-2 text-[12px] text-cream/70">
                  <span className="w-4 h-4 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold text-[10px]">✓</span>
                  {b}
                </div>
              ))}
            </div>
          </div>
          {/* Preview precio */}
          <div className="bg-white-warm/5 border border-white-warm/10 p-8">
            <div className="text-center mb-6">
              <p className="text-[10px] tracking-[0.2em] uppercase text-gold/60 mb-2">Precio mensual desde</p>
              <div className="font-display text-5xl font-light text-gold-light">
                {formatCOP(Math.round(PRODUCTS[0].variants[0].price * 0.9))}
              </div>
              <p className="text-[12px] text-cream/40 mt-1">
                <s>{formatCOP(PRODUCTS[0].variants[0].price)}</s> · Ahorra {formatCOP(PRODUCTS[0].variants[0].price - Math.round(PRODUCTS[0].variants[0].price * 0.9))} cada mes
              </p>
            </div>
            <a href="#suscribirse" className="block w-full text-center py-4 bg-gold text-ink text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-gold-light transition-colors no-underline">
              Suscribirme ahora
            </a>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-16 md:py-20 px-6 md:px-20 bg-gray-warm">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-[10px] font-medium tracking-[0.28em] uppercase text-gold mb-3">Por qué suscribirse</p>
            <h2 className="font-display font-normal text-ink" style={{ fontSize: "clamp(24px,3vw,38px)" }}>
              El café de especialidad<br/><em className="italic text-brown">sin el esfuerzo de recordar</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-cream-3 border border-cream-3">
            {BENEFITS.map(b => (
              <div key={b.title} className="bg-white-warm p-7">
                <div className="text-3xl mb-4" aria-hidden="true">{b.icon}</div>
                <h3 className="font-display text-lg font-medium text-ink mb-2">{b.title}</h3>
                <p className="text-[13px] font-light text-brown-light leading-[1.8]">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulario de suscripción */}
      <section id="suscribirse" className="py-16 md:py-20 px-6 md:px-20">
        <div className="max-w-[900px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-start">

          {/* Formulario */}
          <div>
            <p className="text-[10px] font-medium tracking-[0.28em] uppercase text-gold mb-3">Personaliza tu suscripción</p>
            <h2 className="font-display text-3xl font-normal text-ink mb-8">
              Elige tu café
            </h2>

            {/* Selector de producto */}
            <div className="mb-6">
              <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-brown-light mb-3">¿Cuál café quieres?</p>
              <div className="grid grid-cols-1 gap-3">
                {PRODUCTS.map(p => (
                  <button
                    key={p.slug}
                    onClick={() => handleProductChange(p.slug)}
                    className={`flex items-center gap-4 p-4 border text-left transition-all ${
                      selectedProduct.slug === p.slug ? "border-gold bg-cream" : "border-cream-3 bg-white-warm hover:border-gold/50"
                    }`}
                  >
                    <div className="w-14 h-14 shrink-0 relative bg-cream-2">
                      <Image src={p.image} alt={p.name} fill sizes="56px" className="object-contain p-1"/>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-display text-[15px] font-medium text-ink">{p.name}</span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gold/10 text-gold">{p.sca} SCA</span>
                      </div>
                      <p className="text-[12px] text-brown-light">{p.notes.slice(0,3).join(" · ")}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center ${
                      selectedProduct.slug === p.slug ? "border-gold bg-gold" : "border-cream-3"
                    }`}>
                      {selectedProduct.slug === p.slug && <span className="text-ink text-[10px]">✓</span>}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Selector de peso */}
            <div className="mb-8">
              <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-brown-light mb-3">¿Cuánto café al mes?</p>
              <div className="flex gap-3">
                {selectedProduct.variants.map(v => (
                  <button
                    key={v.weight}
                    onClick={() => setSelectedWeight(v)}
                    className={`flex-1 py-4 border text-center transition-all ${
                      selectedWeight.weight === v.weight ? "border-gold bg-cream" : "border-cream-3 bg-white-warm hover:border-gold/50"
                    }`}
                  >
                    <div className="font-display text-xl font-medium text-ink">{v.weight}</div>
                    <div className="text-[11px] text-gold font-medium mt-1">{formatCOP(Math.round(v.price * 0.9))}/mes</div>
                    <div className="text-[10px] text-brown-light mt-0.5"><s>{formatCOP(v.price)}</s></div>
                  </button>
                ))}
              </div>
            </div>

            {/* Datos del cliente */}
            <div className="space-y-4">
              <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-brown-light">Tus datos</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Nombre completo *" value={form.name} onChange={v => setForm({...form, name: v})} placeholder="Tu nombre"/>
                <Field label="Email *" type="email" value={form.email} onChange={v => setForm({...form, email: v})} placeholder="tu@correo.com"/>
                <Field label="WhatsApp *" type="tel" value={form.phone} onChange={v => setForm({...form, phone: v})} placeholder="+57 300 000 0000"/>
                <Field label="Ciudad" value={form.city} onChange={v => setForm({...form, city: v})} placeholder="Bogotá, Medellín..."/>
              </div>
              <Field label="Dirección de entrega" value={form.address} onChange={v => setForm({...form, address: v})} placeholder="Calle, número, apto" full/>
              <Field label="Notas adicionales" value={form.notes} onChange={v => setForm({...form, notes: v})} placeholder="Instrucciones de entrega, preferencias..." full/>
            </div>
          </div>

          {/* Resumen */}
          <div className="lg:sticky lg:top-[80px]">
            <div className="bg-cream border border-cream-3">
              <div className="px-6 py-5 border-b border-cream-3">
                <p className="font-display text-lg text-ink">Tu suscripción</p>
              </div>
              <div className="px-6 py-5 space-y-3 border-b border-cream-3">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 relative bg-cream-2 shrink-0">
                    <Image src={selectedProduct.image} alt={selectedProduct.name} fill sizes="48px" className="object-contain p-1"/>
                  </div>
                  <div>
                    <div className="font-medium text-ink text-sm">{selectedProduct.name}</div>
                    <div className="text-[12px] text-brown-light">{selectedWeight.weight} · Mensual</div>
                  </div>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-brown-light">Precio normal</span>
                  <span className="text-brown-light line-through">{formatCOP(selectedWeight.price)}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-brown-light">Descuento suscriptor</span>
                  <span className="text-green-700 font-medium">− {formatCOP(savings)}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-brown-light">Envío</span>
                  <span className="text-green-700 font-medium">Gratis</span>
                </div>
              </div>
              <div className="px-6 py-4 border-b border-cream-3 flex justify-between items-baseline">
                <span className="font-medium text-ink">Total mensual</span>
                <span className="font-display text-2xl text-gold">{formatCOP(discountedPrice)}</span>
              </div>
              <div className="px-6 py-5">
                <button
                  onClick={handleSubmit}
                  disabled={loading || !form.name || !form.email || !form.phone}
                  className="w-full py-4 bg-gold text-ink text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-gold-light transition-colors disabled:opacity-50"
                >
                  {loading ? "Enviando..." : "Confirmar suscripción"}
                </button>
                <p className="text-[10px] text-brown-light text-center mt-3 leading-[1.6]">
                  Te contactamos en 24h para coordinar el primer despacho. Sin cobro automático — cada mes te avisamos antes.
                </p>
              </div>
            </div>

            {/* Testimonial */}
            <div className="mt-4 p-5 bg-ink-2 text-center">
              <p className="font-display italic text-cream/60 text-sm leading-[1.7]">
                "Desde que me suscribí no he vuelto a quedarme sin café. Y el 10% se nota cada mes."
              </p>
              <p className="text-[10px] text-gold/50 mt-2 tracking-[0.1em]">— Suscriptor · Bogotá</p>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 px-6 md:px-20 bg-gray-warm border-t border-cream-3">
        <div className="max-w-[700px] mx-auto">
          <h2 className="font-display text-2xl font-normal text-ink mb-8 text-center">Preguntas frecuentes</h2>
          <div className="space-y-0">
            {[
              { q: "¿Cómo funciona el cobro?", a: "No hay cobro automático. Cada mes te enviamos un mensaje de WhatsApp confirmando tu pedido y pagas en ese momento a través de Wompi. Tú tienes el control siempre." },
              { q: "¿Puedo cambiar de café cada mes?", a: "Sí. Puedes cambiar el café, el peso o pausar la suscripción en cualquier momento escribiéndonos por WhatsApp." },
              { q: "¿Cuándo llega mi primer pedido?", a: "Te contactamos en menos de 24 horas para coordinar la fecha de tu primer despacho. Generalmente sale en 48 horas hábiles." },
              { q: "¿El descuento aplica para siempre?", a: "Sí. El 10% es permanente mientras mantengas la suscripción activa, sin importar si subimos los precios." },
              { q: "¿Cómo cancelo?", a: "Escríbenos por WhatsApp en cualquier momento. Sin penalizaciones, sin trámites. Cancelamos en el acto." },
            ].map((faq, i) => (
              <details key={i} className="border-b border-cream-3 group">
                <summary className="py-4 font-display text-[15px] font-medium text-ink cursor-pointer list-none flex justify-between items-center hover:text-gold transition-colors">
                  {faq.q}
                  <span className="text-gold text-lg group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="pb-4 text-[13.5px] font-light text-brown-light leading-[1.85]">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text", full }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; full?: boolean;
}) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className="block text-[11px] font-medium tracking-[0.14em] uppercase text-brown-light mb-1.5">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-3.5 py-3 border border-cream-3 outline-none focus:border-gold text-sm bg-white-warm"/>
    </div>
  );
}
