
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface Props {
  params: { order?: string; id?: string; status?: string };
}

export function ConfirmacionClient({ params }: Props) {
  const emailSent = useRef(false);
  const [emailStatus, setEmailStatus] = useState<"pending" | "sent" | "failed">("pending");

  const orderNum = params.order ?? "MC-" + Date.now();
  const wompiId  = params.id;
  const status   = params.status;
  const isDeclined = status === "DECLINED";
  const isPending  = status === "PENDING";
  const isApproved = !isDeclined && !isPending;

  useEffect(() => {
    if (!isApproved || emailSent.current) return;
    emailSent.current = true;

    async function sendEmail() {
      try {
        // Estrategia 1: Leer datos del sessionStorage (mismo tab)
        const customerData = sessionStorage.getItem("mc_customer");
        
        if (customerData) {
          const customer = JSON.parse(customerData);
          const res = await fetch("/api/send-confirmation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: customer.email,
              name: customer.name,
              reference: orderNum,
              amount: customer.total,
              items: customer.items,
            }),
          });
          if (res.ok) {
            sessionStorage.removeItem("mc_customer");
            setEmailStatus("sent");
            return;
          }
        }

        // Estrategia 2: Si hay wompiId, consultar la transacción directamente
        if (wompiId) {
          const res = await fetch("/api/send-confirmation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              reference: orderNum,
              wompiId,
              amount: 0, // Se recupera del webhook
            }),
          });
          if (res.ok) setEmailStatus("sent");
          else setEmailStatus("failed");
          return;
        }

        setEmailStatus("failed");
      } catch {
        setEmailStatus("failed");
      }
    }

    sendEmail();
  }, [isApproved, orderNum, wompiId]);

  return (
    <div className="max-w-[520px] mx-auto px-6 py-20 text-center">
      {isDeclined ? (
        <>
          <div className="w-[68px] h-[68px] rounded-full bg-red-50 border border-red-200 flex items-center justify-center mx-auto mb-6">
            <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-red-500" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
          </div>
          <h1 className="font-display text-4xl font-light text-ink mb-3">
            Pago <em className="italic text-red-600">no aprobado</em>
          </h1>
          <p className="text-sm font-light text-brown-light mb-8">
            Tu pago no fue procesado. Puedes intentarlo de nuevo.
          </p>
          <Link href="/checkout" className="px-8 py-3.5 bg-gold text-ink text-[11px] font-semibold tracking-[0.14em] uppercase no-underline inline-block hover:bg-gold-light transition-colors">
            Intentar de nuevo
          </Link>
        </>
      ) : isPending ? (
        <>
          <div className="w-[68px] h-[68px] rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto mb-6">
            <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-amber-500" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <h1 className="font-display text-4xl font-light text-ink mb-3">
            Pago <em className="italic text-gold">en proceso</em>
          </h1>
          <p className="text-sm font-light text-brown-light mb-6">
            Tu pago está siendo procesado. Te notificaremos por WhatsApp cuando sea confirmado.
          </p>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-cream border border-cream-3 text-xs text-brown">
            Referencia <strong className="text-ink font-medium ml-1">{orderNum}</strong>
          </div>
        </>
      ) : (
        <>
          <div className="w-[68px] h-[68px] rounded-full bg-cream border border-gold flex items-center justify-center mx-auto mb-6">
            <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-gold" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><path d="M6 1v3M10 1v3M14 1v3"/>
            </svg>
          </div>
          <h1 className="font-display text-4xl font-light text-ink mb-3">
            ¡Pedido <em className="italic text-gold">confirmado</em>!
          </h1>
          <p className="text-sm font-light leading-[1.8] text-brown-light mb-6">
            Gracias por tu compra. Recibirás un email de confirmación y un mensaje de WhatsApp con el número de guía cuando despachemos.
          </p>
          <div className="flex flex-col items-center gap-2 mb-8">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-cream border border-cream-3 text-xs text-brown">
              Pedido <strong className="text-ink font-medium ml-1">#{orderNum}</strong>
            </div>
            {wompiId && (
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-cream border border-cream-3 text-xs text-brown">
                Transacción <strong className="text-ink font-medium ml-1">{wompiId.slice(0, 8)}...</strong>
              </div>
            )}
          </div>
          <Link href="/" className="px-8 py-3.5 bg-ink text-cream text-[11px] font-semibold tracking-[0.14em] uppercase no-underline inline-block hover:bg-ink-2 transition-colors">
            Volver al inicio
          </Link>
        </>
      )}
    </div>
  );
}
