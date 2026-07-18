"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { formatCOP } from "@/lib/products";

const COUPONS: Record<string, number> = { BIENVENIDO: 10, ALMA10: 10, HUILA15: 15 };

const DEPARTMENTS = [
  "Bogotá D.C.",
  "Antioquia",
  "Valle del Cauca",
  "Cundinamarca",
  "Atlántico",
  "Santander",
  "Huila",
  "Nariño",
  "Otro",
];

export function CheckoutClient() {
  const router = useRouter();
  const { items, subtotal } = useCart();

  const [payment, setPayment] = useState<"wompi" | "nequi" | "pse" | "efectivo">("wompi");
  const [coupon, setCoupon] = useState("");
  const [couponMsg, setCouponMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [discountPct, setDiscountPct] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    dept: "",
    postal: "",
    notes: "",
  });

  const discount = Math.round(subtotal * discountPct / 100);
  const total = subtotal - discount;

  function applyCoupon() {
    const code = coupon.trim().toUpperCase();
    if (COUPONS[code]) {
      setDiscountPct(COUPONS[code]);
      setCouponMsg({ type: "ok", text: `✓ Cupón "${code}" aplicado — ${COUPONS[code]}% de descuento` });
    } else {
      setCouponMsg({ type: "err", text: "Código no válido o ya expirado." });
    }
  }

  function handleSubmit() {
    // Validar campos requeridos
    const required = ["firstName", "lastName", "email", "phone", "address", "city", "dept"];
    const newErrors: Record<string, boolean> = {};
    let ok = true;
    required.forEach((field) => {
      if (!form[field as keyof typeof form].trim()) {
        newErrors[field] = true;
        ok = false;
      }
    });
    setErrors(newErrors);
    if (!ok) return;

    setSubmitting(true);

    if (payment === "wompi") {
      // ── PAGO CON WOMPI ──────────────────────────────────────────
      // Generamos referencia única para este pedido
      const orderRef = "MC-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
      
      // Wompi Widget — se inyecta el script y abre el modal de pago
      const script = document.createElement("script");
      script.src = "https://checkout.wompi.co/widget.js";
      script.setAttribute("data-render", "button");
      script.setAttribute("data-public-key", "pub_test_un2Yf64uawKbkcxNjTtB4jPIVPIlpCyk");
      script.setAttribute("data-currency", "COP");
      // Wompi recibe el monto en centavos (x100)
      script.setAttribute("data-amount-in-cents", String(total * 100));
      script.setAttribute("data-reference", orderRef);
      script.setAttribute("data-customer-data:email", form.email);
      script.setAttribute("data-customer-data:full-name", `${form.firstName} ${form.lastName}`);
      script.setAttribute("data-customer-data:phone-number", form.phone.replace(/\D/g, ""));
      script.setAttribute("data-customer-data:phone-number-prefix", "+57");
      // Redirige a confirmación después del pago exitoso
      script.setAttribute(
        "data-redirect-url",
        `${window.location.origin}/checkout/confirmacion?order=${orderRef}`
      );

      // Crear contenedor temporal invisible para el widget
      const container = document.createElement("div");
      container.id = "wompi-container";
      container.style.display = "none";
      document.body.appendChild(container);
      container.appendChild(script);

      // Esperar a que cargue el script y hacer click automático
      script.onload = () => {
        setTimeout(() => {
          const btn = container.querySelector("button");
          if (btn) {
            btn.click();
          } else {
            // Fallback: abrir directamente el checkout de Wompi
            const params = new URLSearchParams({
              "public-key": "pub_test_un2Yf64uawKbkcxNjTtB4jPIVPIlpCyk",
              currency: "COP",
              "amount-in-cents": String(total * 100),
              reference: orderRef,
              "customer-data:email": form.email,
              "customer-data:full-name": `${form.firstName} ${form.lastName}`,
              "redirect-url": `${window.location.origin}/checkout/confirmacion?order=${orderRef}`,
            });
            window.location.href = `https://checkout.wompi.co/p/?${params.toString()}`;
          }
          setSubmitting(false);
        }, 800);
      };

      script.onerror = () => {
        // Si falla cargar el script, redirigir directamente
        const params = new URLSearchParams({
          "public-key": "pub_test_un2Yf64uawKbkcxNjTtB4jPIVPIlpCyk",
          currency: "COP",
          "amount-in-cents": String(total * 100),
          reference: orderRef,
          "customer-data:email": form.email,
          "redirect-url": `${window.location.origin}/checkout/confirmacion?order=${orderRef}`,
        });
        window.location.href = `https://checkout.wompi.co/p/?${params.toString()}`;
        setSubmitting(false);
      };

    } else {
      // ── OTROS MÉTODOS (Nequi, PSE, Efectivo) ────────────────────
      // Por ahora redirigen a confirmación directa
      // TODO: integrar cada método cuando estés listo
      const orderNum = "MC-" + Date.now();
      setTimeout(() => {
        router.push(`/checkout/confirmacion?order=${orderNum}`);
      }, 1000);
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-[560px] mx-auto px-8 py-20 text-center">
        <p className="font-display text-[28px] font-light text-ink mb-3">Tu carrito está vacío</p>
        <p className="text-sm text-brown-light mb-6">Añade productos antes de continuar al pago.</p>
        <a href="/cafes" className="px-7 py-3 bg-gold text-ink text-[11px] font-semibold tracking-[0.14em] uppercase no-underline inline-block hover:bg-gold-light transition-colors">
          Ver catálogo
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-[1100px] mx-auto px-5 md:px-12 py-8 md:py-14 pb-16 md:pb-20 flex flex-col-reverse lg:grid lg:grid-cols-[1fr_400px] lg:gap-12 lg:items-start gap-8 md:px-6 md:py-9">
      {/* LEFT: FORM */}
      <div>
        {/* Steps */}
        <div className="flex items-center gap-0 mb-11" aria-label="Pasos del checkout">
          <Step num="✓" label="Carrito" state="done" />
          <div className="flex-1 h-px bg-cream-3 mx-3" aria-hidden="true" />
          <Step num="2" label="Datos" state="active" />
          <div className="flex-1 h-px bg-cream-3 mx-3" aria-hidden="true" />
          <Step num="3" label="Pago" state="pending" />
        </div>

        {/* Contacto */}
        <Section title="Información de contacto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Nombre"
              value={form.firstName}
              onChange={(v) => setForm({ ...form, firstName: v })}
              placeholder="Tu nombre"
              error={errors.firstName}
              autoComplete="given-name"
            />
            <Field
              label="Apellido"
              value={form.lastName}
              onChange={(v) => setForm({ ...form, lastName: v })}
              placeholder="Tu apellido"
              error={errors.lastName}
              autoComplete="family-name"
            />
            <Field
              label="Correo electrónico"
              type="email"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
              placeholder="tu@correo.com"
              error={errors.email}
              autoComplete="email"
            />
            <Field
              label="WhatsApp / Teléfono"
              type="tel"
              value={form.phone}
              onChange={(v) => setForm({ ...form, phone: v })}
              placeholder="+57 300 000 0000"
              error={errors.phone}
              autoComplete="tel"
            />
          </div>
        </Section>

        {/* Envío */}
        <Section title="Dirección de envío">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Dirección"
              value={form.address}
              onChange={(v) => setForm({ ...form, address: v })}
              placeholder="Calle, número, apto"
              error={errors.address}
              full
              autoComplete="street-address"
            />
            <Field
              label="Ciudad"
              value={form.city}
              onChange={(v) => setForm({ ...form, city: v })}
              placeholder="Ciudad"
              error={errors.city}
              autoComplete="address-level2"
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-medium tracking-[0.14em] uppercase text-brown-light">Departamento</label>
              <select
                value={form.dept}
                onChange={(e) => setForm({ ...form, dept: e.target.value })}
                className={`px-3.5 py-3 border outline-none focus:border-gold text-sm bg-white-warm appearance-none pr-8 ${
                  errors.dept ? "border-red-700" : "border-cream-3"
                }`}
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%239B6535' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                }}
              >
                <option value="">Seleccionar</option>
                {DEPARTMENTS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <Field
              label="Código postal (opcional)"
              value={form.postal}
              onChange={(v) => setForm({ ...form, postal: v })}
              placeholder="110111"
              autoComplete="postal-code"
            />
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-[11px] font-medium tracking-[0.14em] uppercase text-brown-light">
                Instrucciones de entrega (opcional)
              </label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                rows={2}
                placeholder="Ej: Dejar con el portero, timbre 2B..."
                className="px-3.5 py-3 border border-cream-3 outline-none focus:border-gold text-sm resize-none"
              />
            </div>
          </div>
        </Section>

        {/* Pago */}
        <Section title="Método de pago">
          <div className="flex flex-col gap-2.5" role="group" aria-label="Métodos de pago">
            <PaymentOption
              icon="💳"
              name="Tarjeta de crédito o débito"
              sub="Visa · Mastercard · American Express"
              checked={payment === "wompi"}
              onChange={() => setPayment("wompi")}
            />
            {payment === "wompi" && (
              <div className="p-4 bg-cream border border-cream-3 border-t-0 -mt-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Número de tarjeta" placeholder="0000 0000 0000 0000" full value="" onChange={() => {}} autoComplete="cc-number" />
                  <Field label="Vencimiento" placeholder="MM / AA" value="" onChange={() => {}} autoComplete="cc-exp" />
                  <Field label="CVV" placeholder="123" value="" onChange={() => {}} autoComplete="cc-csc" />
                  <Field label="Nombre en la tarjeta" placeholder="Como aparece en la tarjeta" full value="" onChange={() => {}} autoComplete="cc-name" />
                </div>
              </div>
            )}
            <PaymentOption
              icon="📱"
              name="Nequi"
              sub="Paga desde tu app Nequi"
              checked={payment === "nequi"}
              onChange={() => setPayment("nequi")}
            />
            <PaymentOption
              icon="🏦"
              name="PSE — Débito bancario"
              sub="Todos los bancos colombianos"
              checked={payment === "pse"}
              onChange={() => setPayment("pse")}
            />
            <PaymentOption
              icon="🏪"
              name="Efectivo — Bancolombia · Efecty"
              sub="Paga en puntos autorizados"
              checked={payment === "efectivo"}
              onChange={() => setPayment("efectivo")}
            />
          </div>
        </Section>

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full py-4 bg-gold text-ink text-xs font-semibold tracking-[0.16em] uppercase hover:bg-gold-light hover:-translate-y-px transition-all mt-7 disabled:opacity-60"
        >
          {submitting ? "Procesando..." : <>Confirmar pedido — {formatCOP(total)}</>}
        </button>
        <p className="flex items-center justify-center gap-1.5 text-[11px] text-brown-light mt-3.5 text-center">
          <span aria-hidden="true">🔒</span>
          Pago 100% seguro · Tus datos están cifrados
        </p>
      </div>

      {/* RIGHT: SUMMARY */}
      <aside className="bg-cream border border-cream-3 lg:sticky lg:top-[88px]" aria-label="Resumen del pedido">
        <div className="px-6 py-5 border-b border-cream-3 font-display text-lg text-ink">Resumen del pedido</div>
        <div>
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-3 px-6 py-4 border-b border-cream-3">
              <div className="w-[52px] h-16 overflow-hidden bg-cream-2 shrink-0 relative">
                <Image src={item.image} alt={item.name} width={52} height={64} className="w-full h-full object-cover" />
                <span className="absolute -top-1.5 -right-1.5 w-[18px] h-[18px] rounded-full bg-ink text-white-warm text-[10px] font-semibold flex items-center justify-center">
                  {item.quantity}
                </span>
              </div>
              <div className="flex-1">
                <div className="text-[13px] text-ink mb-0.5">{item.name}</div>
                <div className="text-[11px] text-brown-light">{item.weight} · {item.grind}</div>
              </div>
              <div className="font-display text-base text-ink shrink-0">
                {formatCOP(item.unitPrice * item.quantity)}
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 py-4 border-b border-cream-3">
          <SummaryLine label="Subtotal" value={formatCOP(subtotal)} />
          <SummaryLine label="Envío" value={<span className="text-green-700 font-medium">Gratis</span>} />
          <SummaryLine label="Descuento" value={discount > 0 ? `−${formatCOP(discount)} (${discountPct}%)` : "—"} last />
        </div>
        <div className="px-6 py-4 flex justify-between items-baseline">
          <span className="text-[13px] font-medium text-ink">Total</span>
          <span className="font-display text-[28px] text-ink">{formatCOP(total)}</span>
        </div>
        <div className="px-6 py-4 border-t border-cream-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Código de descuento"
              className="flex-1 px-3 py-2.5 border border-cream-3 text-sm outline-none focus:border-gold uppercase tracking-[0.06em] placeholder:normal-case placeholder:tracking-normal"
              aria-label="Código de cupón"
            />
            <button onClick={applyCoupon} className="px-4 py-2.5 border border-cream-3 bg-white-warm text-[11px] font-medium text-brown hover:border-gold hover:text-gold transition-colors whitespace-nowrap">
              Aplicar
            </button>
          </div>
          {couponMsg && (
            <p className={`text-[11px] mt-1.5 ${couponMsg.type === "ok" ? "text-green-700" : "text-red-700"}`}>
              {couponMsg.text}
            </p>
          )}
        </div>
      </aside>
    </div>
  );
}

function Step({ num, label, state }: { num: string; label: string; state: "done" | "active" | "pending" }) {
  const colorClass = state === "done" ? "text-gold" : state === "active" ? "text-ink" : "text-brown-light";
  return (
    <div className={`flex items-center gap-2 text-[11px] font-medium tracking-[0.1em] uppercase ${colorClass}`}>
      <span
        className="w-6 h-6 rounded-full border flex items-center justify-center text-[11px] font-semibold shrink-0"
        style={{
          borderColor: "currentColor",
          background: state === "done" ? "#C8A84A" : state === "active" ? "#0A0704" : "transparent",
          color: state === "done" ? "#0A0704" : state === "active" ? "#FDFAF2" : "currentColor",
        }}
      >
        {num}
      </span>
      <span className="hidden sm:inline">{label}</span>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-9">
      <h2 className="font-display text-xl font-normal text-ink mb-5 pb-3 border-b border-cream-3">{title}</h2>
      {children}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  full,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  error?: boolean;
  full?: boolean;
  autoComplete?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${full ? "sm:col-span-2" : ""}`}>
      <label className="text-[11px] font-medium tracking-[0.14em] uppercase text-brown-light">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`px-3.5 py-3 border outline-none focus:border-gold text-sm ${error ? "border-red-700" : "border-cream-3"}`}
      />
    </div>
  );
}

function PaymentOption({
  icon,
  name,
  sub,
  checked,
  onChange,
}: {
  icon: string;
  name: string;
  sub: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      className={`flex items-center gap-3 px-4 py-3.5 border cursor-pointer transition-colors ${
        checked ? "border-gold bg-cream" : "border-cream-3"
      }`}
    >
      <input type="radio" checked={checked} onChange={onChange} className="accent-gold w-4 h-4 shrink-0" />
      <span className="text-lg w-7 text-center" aria-hidden="true">{icon}</span>
      <div>
        <div className="text-sm text-ink">{name}</div>
        <div className="text-[11px] text-brown-light">{sub}</div>
      </div>
    </label>
  );
}

function SummaryLine({ label, value, last }: { label: string; value: React.ReactNode; last?: boolean }) {
  return (
    <div className={`flex justify-between text-[13px] text-brown-light ${last ? "" : "mb-2"}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
