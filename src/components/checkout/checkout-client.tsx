
"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { formatCOP } from "@/lib/products";

// ── DEPARTAMENTOS Y CIUDADES PRINCIPALES ─────────────────────────
const COLOMBIA: Record<string, string[]> = {
  "Bogotá D.C.": ["Bogotá"],
  "Antioquia": ["Medellín","Bello","Itagüí","Envigado","Sabaneta","Rionegro","Apartadó","Turbo","Caucasia","Copacabana"],
  "Valle del Cauca": ["Cali","Buenaventura","Palmira","Tuluá","Buga","Cartago","Jamundí","Yumbo","Candelaria","Pradera"],
  "Cundinamarca": ["Soacha","Fusagasugá","Facatativá","Zipaquirá","Chía","Mosquera","Madrid","Funza","Cajicá","La Calera"],
  "Atlántico": ["Barranquilla","Soledad","Malambo","Sabanagrande","Puerto Colombia","Galapa","Baranoa","Sabanalarga"],
  "Santander": ["Bucaramanga","Floridablanca","Girón","Piedecuesta","Barrancabermeja","Socorro","San Gil","Vélez"],
  "Bolívar": ["Cartagena","Magangué","Turbaco","Arjona","El Carmen de Bolívar","Mompós","Villanueva"],
  "Huila": ["Neiva","Pitalito","Garzón","La Plata","Campoalegre","Palermo","Santa María","Isnos","San Agustín","Acevedo"],
  "Nariño": ["Pasto","Tumaco","Ipiales","Túquerres","La Unión","El Charco","Samaniego","Barbacoas"],
  "Córdoba": ["Montería","Cereté","Sahagún","Lorica","Planeta Rica","Montelíbano","Tierralta","Ciénaga de Oro"],
  "Tolima": ["Ibagué","Espinal","Melgar","Honda","Líbano","Chaparral","Mariquita","Flandes","El Espinal"],
  "Cauca": ["Popayán","Santander de Quilichao","Puerto Tejada","Patía","Miranda","Corinto","Guapi"],
  "Norte de Santander": ["Cúcuta","Ocaña","Pamplona","Villa del Rosario","Los Patios","El Zulia","Tibú"],
  "Risaralda": ["Pereira","Dosquebradas","Santa Rosa de Cabal","La Virginia","Marsella","Belén de Umbría"],
  "Caldas": ["Manizales","La Dorada","Riosucio","Chinchiná","Villamaría","Salamina","Aguadas","Anserma"],
  "Quindío": ["Armenia","Calarcá","Montenegro","Quimbaya","La Tebaida","Circasia","Filandia","Salento"],
  "Meta": ["Villavicencio","Acacías","Granada","Cumaral","Puerto Gaitán","Restrepo","San Martín"],
  "Boyacá": ["Tunja","Duitama","Sogamoso","Chiquinquirá","Paipa","Moniquirá","Puerto Boyacá","Socha"],
  "Magdalena": ["Santa Marta","Ciénaga","Fundación","El Banco","Plato","Aracataca","Zona Bananera"],
  "Cesar": ["Valledupar","Aguachica","Agustín Codazzi","Bosconia","Chiriguaná","La Jagua de Ibirico"],
  "La Guajira": ["Riohacha","Maicao","Uribia","Manaure","San Juan del Cesar","Barrancas"],
  "Sucre": ["Sincelejo","Corozal","San Marcos","Sampués","Morroa","Ovejas","Toluviejo"],
  "Amazonas": ["Leticia","Puerto Nariño"],
  "Arauca": ["Arauca","Saravena","Tame","Fortul","Arauquita"],
  "Casanare": ["Yopal","Aguazul","Villanueva","Paz de Ariporo","Tauramena"],
  "Caquetá": ["Florencia","San Vicente del Caguán","Belén de los Andaquíes","Curillo"],
  "Chocó": ["Quibdó","Istmina","Nuquí","Bahía Solano","Tadó","Condoto"],
  "Guainía": ["Inírida"],
  "Guaviare": ["San José del Guaviare","Calamar","El Retorno"],
  "Putumayo": ["Mocoa","Puerto Asís","Orito","Valle del Guamuez","Sibundoy"],
  "San Andrés": ["San Andrés","Providencia"],
  "Vaupés": ["Mitú"],
  "Vichada": ["Puerto Carreño","La Primavera","Cumaribo"],
};

const COUPONS: Record<string, number> = { BIENVENIDO: 10, ALMA10: 10, HUILA15: 15 };

export function CheckoutClient() {
  const { items, subtotal } = useCart();
  const [coupon, setCoupon] = useState("");
  const [couponMsg, setCouponMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [discountPct, setDiscountPct] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", dept: "", notes: "",
  });
  const cities = form.dept ? (COLOMBIA[form.dept] || []) : [];

  const discount = Math.round(subtotal * discountPct / 100);
  const shipping = (subtotal - discount) >= 80000 ? 0 : 5000;
  const total = subtotal - discount + shipping;

  function applyCoupon() {
    const code = coupon.trim().toUpperCase();
    if (COUPONS[code]) {
      setDiscountPct(COUPONS[code]);
      setCouponMsg({ type: "ok", text: `✓ Cupón aplicado — ${COUPONS[code]}% de descuento` });
    } else {
      setCouponMsg({ type: "err", text: "Código no válido." });
    }
  }

  async function handlePay() {
    const required = ["firstName", "lastName", "email", "phone"];
    const newErrors: Record<string, boolean> = {};
    let ok = true;
    required.forEach(f => {
      if (!form[f as keyof typeof form].trim()) { newErrors[f] = true; ok = false; }
    });
    setErrors(newErrors);
    if (!ok) return;

    setSubmitting(true);

    const orderRef = "MC-" + Date.now();
    const amountInCents = total * 100;
    const currency = "COP";
    const redirectUrl = `${window.location.origin}/checkout/confirmacion?order=${orderRef}`;

    // 1. Registrar pedido en el backend
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reference: orderRef,
          customer_name: `${form.firstName} ${form.lastName}`,
          customer_email: form.email,
          customer_phone: form.phone,
          customer_address: form.address,
          customer_city: form.city,
          customer_dept: form.dept,
          items: items.map(i => ({
            slug: i.slug,
            name: i.name,
            weight: i.weight,
            grind: i.grind,
            quantity: i.quantity,
            unit_price: i.unitPrice,
          })),
          subtotal,
          discount,
          total,
          notes: form.notes,
        }),
      });
    } catch {
      console.error("Error registrando pedido en backend");
    }

    // 2. Generar firma de integridad via API route
    let signature = "";
    try {
      const res = await fetch("/api/wompi-signature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference: orderRef, amountInCents, currency }),
      });
      const data = await res.json();
      signature = data.signature ?? "";
    } catch {
      console.error("Error generando firma");
    }

    const params = new URLSearchParams({
      "public-key": "pub_test_un2Yf64uawKbkcxNjTtB4jPIVPIlpCyk",
      currency,
      "amount-in-cents": String(amountInCents),
      reference: orderRef,
      "signature:integrity": signature,
      "customer-data:email": form.email,
      "customer-data:full-name": `${form.firstName} ${form.lastName}`,
      "customer-data:phone-number": form.phone.replace(/[^0-9]/g, ""),
      "customer-data:phone-number-prefix": "+57",
      "redirect-url": redirectUrl,
    });
    window.location.href = `https://checkout.wompi.co/p/?${params.toString()}`;
  }

  if (items.length === 0) {
    return (
      <div className="max-w-[480px] mx-auto px-6 py-20 text-center">
        <p className="font-display text-2xl font-light text-ink mb-3">Tu carrito está vacío</p>
        <a href="/cafes" className="px-7 py-3 bg-gold text-ink text-[11px] font-semibold tracking-[0.14em] uppercase no-underline inline-block hover:bg-gold-light transition-colors">
          Ver catálogo
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-[960px] mx-auto px-5 md:px-12 py-10 pb-20">
      
      {/* Título */}
      <div className="mb-8">
        <p className="text-[10px] font-medium tracking-[0.28em] uppercase text-gold mb-1">Finalizar compra</p>
        <h1 className="font-display text-3xl font-normal text-ink">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
        
        {/* FORMULARIO — solo datos esenciales */}
        <div>
          <h2 className="font-display text-xl font-normal text-ink mb-5 pb-3 border-b border-cream-3">
            Información de contacto
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <Field label="Nombre *" value={form.firstName} onChange={v => setForm({...form, firstName: v})}
              placeholder="Tu nombre" error={errors.firstName} autoComplete="given-name"/>
            <Field label="Apellido *" value={form.lastName} onChange={v => setForm({...form, lastName: v})}
              placeholder="Tu apellido" error={errors.lastName} autoComplete="family-name"/>
            <Field label="Email *" type="email" value={form.email} onChange={v => setForm({...form, email: v})}
              placeholder="tu@correo.com" error={errors.email} autoComplete="email"/>
            <Field label="WhatsApp *" type="tel" value={form.phone} onChange={v => setForm({...form, phone: v})}
              placeholder="+57 300 000 0000" error={errors.phone} autoComplete="tel"/>
          </div>

          <h2 className="font-display text-xl font-normal text-ink mb-5 pb-3 border-b border-cream-3">
            Dirección de envío <span className="text-sm font-light text-brown-light">(opcional)</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <Field label="Dirección" value={form.address} onChange={v => setForm({...form, address: v})}
              placeholder="Calle, número, apto" full autoComplete="street-address"/>
            {/* Departamento primero */}
            <div>
              <label className="block text-[11px] font-medium tracking-[0.14em] uppercase text-brown-light mb-1.5">
                Departamento
              </label>
              <select
                value={form.dept}
                onChange={e => setForm({...form, dept: e.target.value, city: ""})}
                className="w-full px-3.5 py-3 border border-cream-3 outline-none focus:border-gold text-sm bg-white-warm appearance-none"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%239B6535' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", paddingRight: "32px" }}
              >
                <option value="">Seleccionar departamento</option>
                {Object.keys(COLOMBIA).sort().map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            {/* Ciudad — se autocompleta según departamento */}
            <div>
              <label className="block text-[11px] font-medium tracking-[0.14em] uppercase text-brown-light mb-1.5">
                Ciudad / Municipio
              </label>
              {cities.length > 0 ? (
                <select
                  value={form.city}
                  onChange={e => setForm({...form, city: e.target.value})}
                  className="w-full px-3.5 py-3 border border-cream-3 outline-none focus:border-gold text-sm bg-white-warm appearance-none"
                  style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%239B6535' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", paddingRight: "32px" }}
                >
                  <option value="">Seleccionar ciudad</option>
                  {cities.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={form.city}
                  onChange={e => setForm({...form, city: e.target.value})}
                  placeholder="Selecciona primero el departamento"
                  disabled={!form.dept}
                  className="w-full px-3.5 py-3 border border-cream-3 outline-none focus:border-gold text-sm disabled:opacity-40 disabled:bg-cream"
                />
              )}
            </div>
            <Field label="Nota de entrega" value={form.notes} onChange={v => setForm({...form, notes: v})}
              placeholder="Instrucciones opcionales"/>
          </div>

          {/* Trust */}
          <div className="flex flex-wrap gap-5 text-[11.5px] text-brown-light border-t border-cream-3 pt-5">
            <span>🔒 Pago 100% seguro vía Wompi</span>
            <span>🚚 Envío gratis +$80.000</span>
            <span>↩️ Garantía de satisfacción</span>
          </div>
        </div>

        {/* RESUMEN */}
        <div className="bg-cream border border-cream-3">
          <div className="px-6 py-5 border-b border-cream-3 font-display text-lg text-ink">
            Resumen del pedido
          </div>

          {/* Items */}
          <div>
            {items.map(item => (
              <div key={item.id} className="flex items-center gap-3 px-6 py-4 border-b border-cream-3">
                <div className="w-14 h-16 bg-cream-2 shrink-0 relative overflow-hidden">
                  <Image src={item.image} alt={item.name} fill sizes="56px" className="object-contain p-1"/>
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-ink text-cream text-[10px] font-bold flex items-center justify-center">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-ink truncate">{item.name}</div>
                  <div className="text-[11px] text-brown-light">{item.weight} · {item.grind}</div>
                </div>
                <div className="font-display text-base text-ink shrink-0">
                  {formatCOP(item.unitPrice * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          {/* Cupón */}
          <div className="px-6 py-4 border-b border-cream-3">
            <div className="flex gap-2">
              <input type="text" value={coupon} onChange={e => setCoupon(e.target.value)}
                placeholder="Código de descuento"
                className="flex-1 px-3 py-2.5 border border-cream-3 text-sm outline-none focus:border-gold bg-white-warm uppercase tracking-[0.06em] placeholder:normal-case placeholder:tracking-normal"/>
              <button onClick={applyCoupon}
                className="px-4 py-2.5 border border-cream-3 bg-white-warm text-[11px] font-medium text-brown hover:border-gold hover:text-gold transition-colors whitespace-nowrap">
                Aplicar
              </button>
            </div>
            {couponMsg && (
              <p className={`text-[11px] mt-1.5 ${couponMsg.type === "ok" ? "text-green-700" : "text-red-700"}`}>
                {couponMsg.text}
              </p>
            )}
          </div>

          {/* Totales */}
          <div className="px-6 py-4 border-b border-cream-3 space-y-2">
            <div className="flex justify-between text-[13px] text-brown-light">
              <span>Subtotal</span><span>{formatCOP(subtotal)}</span>
            </div>
            <div className="flex justify-between text-[13px] text-brown-light">
              <span>Envío</span>
              <span className={subtotal >= 80000 ? "text-green-700 font-medium" : ""}>
                {shipping === 0 ? "Gratis" : "$5.000"}
              </span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-[13px] text-brown-light">
                <span>Descuento</span><span className="text-green-700">−{formatCOP(discount)}</span>
              </div>
            )}
          </div>
          <div className="px-6 py-4 flex justify-between items-baseline border-b border-cream-3">
            <span className="text-[13px] font-medium text-ink">Total</span>
            <span className="font-display text-2xl text-ink">{formatCOP(total)}</span>
          </div>

          {/* BOTÓN PAGO — directo a Wompi */}
          <div className="px-6 py-5">
            <button
              onClick={handlePay}
              disabled={submitting}
              className="w-full py-4 bg-gold text-ink text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-gold-light transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {submitting ? (
                <span className="animate-pulse">Redirigiendo a Wompi...</span>
              ) : (
                <>Pagar {formatCOP(total)} con Wompi</>
              )}
            </button>
            <p className="text-[10px] text-brown-light text-center mt-3">
              Tarjeta · Nequi · DaviPlata · PSE · Efectivo
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

// ── Componente Field ─────────────────────────────────────────────
function Field({ label, value, onChange, placeholder, type = "text", error, full, autoComplete }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; error?: boolean; full?: boolean; autoComplete?: string;
}) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className="block text-[11px] font-medium tracking-[0.14em] uppercase text-brown-light mb-1.5">
        {label}
      </label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder} autoComplete={autoComplete}
        className={`w-full px-3.5 py-3 border outline-none focus:border-gold text-sm ${
          error ? "border-red-400" : "border-cream-3"
        }`}/>
    </div>
  );
}
