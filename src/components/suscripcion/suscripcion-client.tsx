"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS, formatCOP } from "@/lib/products";

const PLANS = [
  {
    id: "tres",
    name: "Los Tres",
    subtitle: "3 cafés de 250g al mes",
    price: 84900,
    originalPrice: 104700,
    savings: 19800,
    savingsPct: "19%",
    qty: 3,
    weight: "250g",
    badge: "Más popular",
    badgeColor: "#C8A84A",
    description: "Ideal para explorar los tres orígenes o tener siempre variedad en casa.",
    perBag: Math.round(84900 / 3),
  },
  {
    id: "doble",
    name: "El Doble",
    subtitle: "2 cafés de 454g al mes",
    price: 97900,
    originalPrice: 119800,
    savings: 21900,
    savingsPct: "18%",
    qty: 2,
    weight: "454g",
    badge: "Mayor ahorro",
    badgeColor: "#0A0704",
    description: "Para el café diario en familia o si consumes más de una bolsa al mes.",
    perBag: Math.round(97900 / 2),
  },
];

const BENEFITS = [
  { icon: "🔥", title: "Tostado fresco para ti", desc: "Tu lote se tuesta el día del despacho." },
  { icon: "🚚", title: "Envío gratis siempre", desc: "Incluido en el precio, cada mes." },
  { icon: "✏️", title: "Cambia los cafés", desc: "Cada mes puedes elegir combinaciones diferentes." },
  { icon: "🎁", title: "Acceso prioritario", desc: "Los suscriptores prueban primero cada cosecha nueva." },
];

export function SuscripcionClient() {
  const [selectedPlan, setSelectedPlan] = useState(PLANS[0]);
  const [selections, setSelections] = useState<string[]>([PRODUCTS[0].slug, PRODUCTS[1].slug, PRODUCTS[2].slug]);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handlePlanChange(plan: typeof PLANS[0]) {
    setSelectedPlan(plan);
    // Reset selecciones según cantidad del plan
    if (plan.qty === 2) {
      setSelections([PRODUCTS[0].slug, PRODUCTS[1].slug]);
    } else {
      setSelections([PRODUCTS[0].slug, PRODUCTS[1].slug, PRODUCTS[2].slug]);
    }
  }

  function updateSelection(index: number, slug: string) {
    const newSelections = [...selections];
    newSelections[index] = slug;
    setSelections(newSelections);
  }

  async function handleSubmit() {
    if (!form.name || !form.email || !form.phone) return;
    setLoading(true);

    const selectedProducts = selections.map(slug => {
      const p = PRODUCTS.find(p => p.slug === slug)!;
      return { slug: p.slug, name: p.name, weight: selectedPlan.weight };
    });

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
          product_slug: selectedPlan.id,
          product_name: `${selectedPlan.name} — ${selectedProducts.map(p => p.name).join(", ")}`,
          weight: selectedPlan.weight,
          price_original: selectedPlan.originalPrice,
          price_discounted: selectedPlan.price,
          notes: form.notes,
        }),
      });
    } catch { /* continúa aunque falle el backend */ }

    setSubmitted(true);
    setLoading(false);
  }

  if (submitted) {
    const selectedProductNames = selections.map(slug => PRODUCTS.find(p => p.slug === slug)!.name);
    return (
      <div className="max-w-[520px] mx-auto px-6 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-cream border-2 border-gold flex items-center justify-center text-2xl mx-auto mb-6">☕</div>
        <h1 className="font-display text-3xl font-normal text-ink mb-3">
          ¡Bienvenido al <em className="italic text-gold">club!</em>
        </h1>
        <p className="text-[14px] font-light text-brown-light leading-[1.85] mb-8">
          Recibimos tu solicitud. Te contactamos por WhatsApp en menos de 24 horas para confirmar el cobro automático y coordinar tu primer despacho.
        </p>
        <div className="bg-cream border border-cream-3 p-6 mb-8 text-left">
          <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-gold mb-3">Tu suscripción</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm"><span className="text-brown-light">Plan</span><span className="text-ink font-medium">{selectedPlan.name}</span></div>
            <div className="flex justify-between text-sm"><span className="text-brown-light">Cafés</span><span className="text-ink font-medium text-right">{selectedProductNames.join(" · ")}</span></div>
            <div className="flex justify-between text-sm"><span className="text-brown-light">Total mensual</span><span className="text-gold font-medium">{formatCOP(selectedPlan.price)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-brown-light">Ahorro mensual</span><span className="text-green-700 font-medium">{formatCOP(selectedPlan.savings)}</span></div>
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
        <div className="max-w-[1000px] mx-auto text-center">
          <p className="text-[10px] font-medium tracking-[0.28em] uppercase text-gold mb-4 flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-gold shrink-0"/>
            Suscripción mensual
            <span className="w-8 h-px bg-gold shrink-0"/>
          </p>
          <h1 className="font-display font-normal leading-[1.05] text-cream mb-5" style={{ fontSize: "clamp(32px,5vw,60px)" }}>
            Café fresco cada mes.<br/>
            <em className="italic text-gold-light">Tú eliges. Nosotros despachamos.</em>
          </h1>
          <p className="text-[15px] font-light text-cream/60 leading-[1.85] mb-10 max-w-[560px] mx-auto">
            Arma tu combinación de cafés del Huila y recíbelos cada mes con hasta 19% de descuento. Cobro automático, sin sorpresas.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {["Hasta 19% de ahorro", "Envío gratis siempre", "Tostado el día del despacho", "Cobro automático mensual"].map(b => (
              <div key={b} className="flex items-center gap-2 text-[12px] text-cream/60">
                <span className="text-gold">✓</span> {b}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Planes */}
      <section className="py-16 px-6 md:px-20 bg-white-warm">
        <div className="max-w-[860px] mx-auto">
          <h2 className="font-display text-2xl font-normal text-ink text-center mb-10">
            Elige tu plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
            {PLANS.map(plan => (
              <button
                key={plan.id}
                onClick={() => handlePlanChange(plan)}
                className={`text-left border-2 p-6 transition-all relative ${
                  selectedPlan.id === plan.id ? "border-gold bg-cream" : "border-cream-3 bg-white-warm hover:border-gold/40"
                }`}
              >
                {/* Badge */}
                <div className="absolute -top-3 left-5 px-3 py-1 text-[10px] font-bold tracking-[0.14em] uppercase text-white"
                  style={{ background: plan.badgeColor }}>
                  {plan.badge}
                </div>

                <div className="flex items-start justify-between mb-4 mt-2">
                  <div>
                    <h3 className="font-display text-2xl font-normal text-ink">{plan.name}</h3>
                    <p className="text-[13px] text-brown-light mt-0.5">{plan.subtitle}</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center mt-1 ${
                    selectedPlan.id === plan.id ? "border-gold bg-gold" : "border-cream-3"
                  }`}>
                    {selectedPlan.id === plan.id && <span className="text-ink text-[11px]">✓</span>}
                  </div>
                </div>

                <p className="text-[13px] text-brown-light mb-5 leading-[1.7]">{plan.description}</p>

                <div className="border-t border-cream-3 pt-4">
                  <div className="flex items-end gap-2 mb-1">
                    <span className="font-display text-3xl font-light text-ink">{formatCOP(plan.price)}</span>
                    <span className="text-[12px] text-brown-light mb-1">/mes</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[12px] text-brown-light line-through">{formatCOP(plan.originalPrice)}</span>
                    <span className="text-[11px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded">
                      Ahorra {plan.savingsPct}
                    </span>
                  </div>
                  <p className="text-[11px] text-brown-light mt-2">{formatCOP(plan.perBag)}/bolsa · Envío gratis incluido</p>
                </div>
              </button>
            ))}
          </div>

          {/* Selector de cafés */}
          <div id="suscribirse" className="mb-10">
            <h3 className="font-display text-xl font-normal text-ink mb-2">
              Elige tus {selectedPlan.qty} cafés
            </h3>
            <p className="text-[13px] text-brown-light mb-6">
              Puedes repetir el mismo café o combinar los que quieras — cada mes puedes cambiarlos.
            </p>
            <div className="grid grid-cols-1 gap-3">
              {Array.from({ length: selectedPlan.qty }).map((_, index) => (
                <div key={index}>
                  <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-gold mb-2">
                    Café {index + 1} · {selectedPlan.weight}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {PRODUCTS.map(p => (
                      <button
                        key={p.slug}
                        onClick={() => updateSelection(index, p.slug)}
                        className={`flex items-center gap-3 p-3 border text-left transition-all ${
                          selections[index] === p.slug ? "border-gold bg-cream" : "border-cream-3 bg-white-warm hover:border-gold/40"
                        }`}
                      >
                        <div className="w-10 h-10 shrink-0 relative bg-cream-2">
                          <Image src={p.image} alt={p.name} fill sizes="40px" className="object-contain p-0.5"/>
                        </div>
                        <div className="min-w-0">
                          <div className="text-[12px] font-medium text-ink leading-tight">{p.name}</div>
                          <div className="text-[10px] text-gold">{p.sca} SCA</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formulario */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">
            <div>
              <h3 className="font-display text-xl font-normal text-ink mb-5">Tus datos</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Nombre completo *" value={form.name} onChange={v => setForm({...form, name: v})} placeholder="Tu nombre"/>
                <Field label="Email *" type="email" value={form.email} onChange={v => setForm({...form, email: v})} placeholder="tu@correo.com"/>
                <Field label="WhatsApp *" type="tel" value={form.phone} onChange={v => setForm({...form, phone: v})} placeholder="+57 300 000 0000"/>
                <Field label="Ciudad" value={form.city} onChange={v => setForm({...form, city: v})} placeholder="Bogotá, Medellín..."/>
                <Field label="Dirección de entrega" value={form.address} onChange={v => setForm({...form, address: v})} placeholder="Calle, número, apto" full/>
                <Field label="Notas adicionales" value={form.notes} onChange={v => setForm({...form, notes: v})} placeholder="Instrucciones especiales..." full/>
              </div>
            </div>

            {/* Resumen sticky */}
            <div className="lg:sticky lg:top-[80px]">
              <div className="bg-cream border border-cream-3">
                <div className="px-5 py-4 border-b border-cream-3">
                  <p className="font-display text-base text-ink">Resumen mensual</p>
                </div>
                <div className="px-5 py-4 space-y-2 border-b border-cream-3">
                  <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-gold mb-3">{selectedPlan.name}</div>
                  {selections.map((slug, i) => {
                    const p = PRODUCTS.find(p => p.slug === slug)!;
                    return (
                      <div key={i} className="flex items-center gap-2 text-[12px] text-brown-light">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0"/>
                        {p.name} · {selectedPlan.weight}
                      </div>
                    );
                  })}
                </div>
                <div className="px-5 py-3 border-b border-cream-3 space-y-2">
                  <div className="flex justify-between text-[12px]">
                    <span className="text-brown-light">Precio normal</span>
                    <span className="text-brown-light line-through">{formatCOP(selectedPlan.originalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-[12px]">
                    <span className="text-brown-light">Descuento</span>
                    <span className="text-green-700 font-medium">− {formatCOP(selectedPlan.savings)}</span>
                  </div>
                  <div className="flex justify-between text-[12px]">
                    <span className="text-brown-light">Envío</span>
                    <span className="text-green-700 font-medium">Gratis</span>
                  </div>
                </div>
                <div className="px-5 py-3 flex justify-between items-baseline border-b border-cream-3">
                  <span className="text-sm font-medium text-ink">Total/mes</span>
                  <span className="font-display text-2xl text-gold">{formatCOP(selectedPlan.price)}</span>
                </div>
                <div className="px-5 py-4">
                  <button
                    onClick={handleSubmit}
                    disabled={loading || !form.name || !form.email || !form.phone}
                    className="w-full py-4 bg-gold text-ink text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-gold-light transition-colors disabled:opacity-50 mb-3"
                  >
                    {loading ? "Enviando..." : `Suscribirme — ${formatCOP(selectedPlan.price)}/mes`}
                  </button>
                  <p className="text-[10px] text-brown-light text-center leading-[1.6]">
                    Te contactamos en 24h para configurar el cobro automático mensual con tu tarjeta.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-14 px-6 md:px-20 bg-gray-warm border-t border-cream-3">
        <div className="max-w-[860px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-px bg-cream-3 border border-cream-3">
          {BENEFITS.map(b => (
            <div key={b.title} className="bg-white-warm p-6 text-center">
              <div className="text-2xl mb-3">{b.icon}</div>
              <h3 className="font-display text-[14px] font-medium text-ink mb-1">{b.title}</h3>
              <p className="text-[12px] text-brown-light leading-[1.7]">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 px-6 md:px-20 border-t border-cream-3">
        <div className="max-w-[700px] mx-auto">
          <h2 className="font-display text-2xl font-normal text-ink mb-8 text-center">Preguntas frecuentes</h2>
          <div>
            {[
              { q: "¿Cómo funciona el cobro automático?", a: "Cuando te suscribes, te contactamos por WhatsApp para vincular tu tarjeta de crédito o débito. A partir del segundo mes el cobro es automático el mismo día de cada mes. Siempre recibes una notificación antes." },
              { q: "¿Puedo cambiar los cafés cada mes?", a: "Sí. Escríbenos por WhatsApp antes del día 20 de cada mes y cambiamos tu combinación para el siguiente despacho sin costo adicional." },
              { q: "¿Cuándo llega mi primer pedido?", a: "Te contactamos en menos de 24 horas para confirmar los datos y coordinar tu primer despacho. Generalmente sale en 48 horas hábiles." },
              { q: "¿Cómo cancelo la suscripción?", a: "Escríbenos por WhatsApp antes del día 20 del mes y cancelamos sin penalizaciones. El último cobro ya realizado no se reembolsa pero sí recibes ese último pedido." },
              { q: "¿El precio cambia si suben los precios?", a: "Tu precio queda fijo al momento de suscribirte. Si ajustamos precios, te avisamos con 30 días de anticipación y decides si continúas o cancelas." },
            ].map((faq, i) => (
              <details key={i} className="border-b border-cream-3 group">
                <summary className="py-4 font-display text-[15px] font-medium text-ink cursor-pointer list-none flex justify-between items-center hover:text-gold transition-colors">
                  {faq.q}
                  <span className="text-gold text-lg group-open:rotate-45 transition-transform shrink-0 ml-3">+</span>
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
