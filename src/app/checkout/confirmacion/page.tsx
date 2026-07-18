import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Pedido confirmado",
};

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string; id?: string; status?: string }>;
}) {
  const params = await searchParams;
  const orderNum = params.order ?? "MC-" + Date.now();
  const wompiId  = params.id;
  const status   = params.status; // APPROVED | DECLINED | PENDING

  // Estado del pago de Wompi
  const isDeclined = status === "DECLINED";
  const isPending  = status === "PENDING";
  const isApproved = status === "APPROVED" || (!status && !isDeclined);

  return (
    <>
      <Nav />
      <main>
        <div className="max-w-[560px] mx-auto px-6 py-20 text-center">

          {isDeclined ? (
            <>
              <div className="w-[72px] h-[72px] rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-[28px] mx-auto mb-7">
                ✗
              </div>
              <h1 className="font-display text-4xl font-light text-ink mb-3">
                Pago <em className="italic text-red-600">no aprobado</em>
              </h1>
              <p className="text-sm font-light leading-[1.8] text-brown-light mb-8">
                Tu pago no fue procesado. Puedes intentarlo de nuevo o elegir otro método de pago.
              </p>
              <Link
                href="/checkout"
                className="px-8 py-3.5 bg-gold text-ink text-[11px] font-semibold tracking-[0.14em] uppercase no-underline inline-block hover:bg-gold-light transition-colors"
              >
                Intentar de nuevo
              </Link>
            </>
          ) : isPending ? (
            <>
              <div className="w-[72px] h-[72px] rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-[28px] mx-auto mb-7">
                ⏳
              </div>
              <h1 className="font-display text-4xl font-light text-ink mb-3">
                Pago <em className="italic text-gold">en proceso</em>
              </h1>
              <p className="text-sm font-light leading-[1.8] text-brown-light mb-8">
                Tu pago está siendo procesado. Te notificaremos por WhatsApp cuando sea confirmado.
              </p>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-cream border border-cream-3 text-xs text-brown mb-8">
                <span>Referencia</span>
                <strong className="text-ink font-medium">{orderNum}</strong>
              </div>
            </>
          ) : (
            <>
              <div className="w-[72px] h-[72px] rounded-full bg-cream border border-gold flex items-center justify-center text-[28px] mx-auto mb-7" aria-hidden="true">
                ☕
              </div>
              <h1 className="font-display text-4xl font-light text-ink mb-3">
                ¡Pedido <em className="italic text-gold">confirmado</em>!
              </h1>
              <p className="text-sm font-light leading-[1.8] text-brown-light mb-8">
                Gracias por tu compra. Recibirás un mensaje de WhatsApp con el número de guía cuando tu
                pedido sea despachado — generalmente en 24–48 horas hábiles.
              </p>
              <div className="flex flex-col items-center gap-2 mb-9">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-cream border border-cream-3 text-xs text-brown">
                  <span>Pedido</span>
                  <strong className="text-ink font-medium">#{orderNum}</strong>
                </div>
                {wompiId && (
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-cream border border-cream-3 text-xs text-brown">
                    <span>Transacción Wompi</span>
                    <strong className="text-ink font-medium">{wompiId}</strong>
                  </div>
                )}
              </div>
            </>
          )}

          {isApproved && (
            <Link
              href="/"
              className="px-8 py-3.5 bg-ink text-cream text-[11px] font-semibold tracking-[0.14em] uppercase no-underline inline-block hover:bg-ink-2 transition-colors"
            >
              Volver al inicio
            </Link>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
