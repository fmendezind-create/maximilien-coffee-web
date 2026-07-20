"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

interface Props {
  params: { order?: string; id?: string; status?: string };
}

export function ConfirmacionClient({ params }: Props) {
  const { items, subtotal } = useCart();
  const emailSent = useRef(false);

  const orderNum = params.order ?? "MC-" + Date.now();
  const status   = params.status;
  const isDeclined = status === "DECLINED";
  const isPending  = status === "PENDING";
  const isApproved = !isDeclined && !isPending;

  useEffect(() => {
    // Enviar email de confirmación una sola vez cuando el pago es aprobado
    if (!isApproved || emailSent.current) return;
    emailSent.current = true;

    // Recuperar datos del cliente del sessionStorage
    const customerData = sessionStorage.getItem("mc_customer");
    if (!customerData) return;

    const customer = JSON.parse(customerData);

    fetch("/api/send-confirmation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: customer.email,
        name: customer.name,
        reference: orderNum,
        amount: customer.total,
        items: customer.items,
      }),
    }).then(r => r.json())
      .then(() => {
        sessionStorage.removeItem("mc_customer");
      })
      .catch(console.error);
  }, }, [isApproved, orderNum]);

  return (
    <div className="max-w-[520px] mx-auto px-6 py-20 text-center">
      {isDeclined ? (
        <>
          <div className="w-[68px] h-[68px] rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-[26px] mx-auto mb-6">✗</div>
          <h1 className="font-display text-4xl font-light text-ink mb-3">Pago <em className="italic text-red-600">no aprobado</em></h1>
          <p className="text-sm font-light text-brown-light mb-8">Tu pago no fue procesado. Puedes intentarlo de nuevo.</p>
          <Link href="/checkout" className="px-8 py-3.5 bg-gold text-ink text-[11px] font-semibold tracking-[0.14em] uppercase no-underline inline-block hover:bg-gold-light transition-colors">
            Intentar de nuevo
          </Link>
        </>
      ) : isPending ? (
        <>
          <div className="w-[68px] h-[68px] rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-[26px] mx-auto mb-6">⏳</div>
          <h1 className="font-display text-4xl font-light text-ink mb-3">Pago <em className="italic text-gold">en proceso</em></h1>
          <p className="text-sm font-light text-brown-light mb-6">Tu pago está siendo procesado. Te notificaremos por WhatsApp cuando sea confirmado.</p>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-cream border border-cream-3 text-xs text-brown mb-8">
            Referencia <strong className="text-ink font-medium ml-1">{orderNum}</strong>
          </div>
        </>
      ) : (
        <>
          <div className="w-[68px] h-[68px] rounded-full bg-cream border border-gold flex items-center justify-center text-[26px] mx-auto mb-6" aria-hidden="true">☕</div>
          <h1 className="font-display text-4xl font-light text-ink mb-3">
            ¡Pedido <em className="italic text-gold">confirmado</em>!
          </h1>
          <p className="text-sm font-light leading-[1.8] text-brown-light mb-6">
            Gracias por tu compra. Recibirás un email de confirmación y un mensaje de WhatsApp con el número de guía cuando despachemos.
          </p>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-cream border border-cream-3 text-xs text-brown mb-8">
            Pedido <strong className="text-ink font-medium ml-1">#{orderNum}</strong>
          </div>
          <br />
          <Link href="/" className="px-8 py-3.5 bg-ink text-cream text-[11px] font-semibold tracking-[0.14em] uppercase no-underline inline-block hover:bg-ink-2 transition-colors">
            Volver al inicio
          </Link>
        </>
      )}
    </div>
  );
}
