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
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;
  const orderNum = order ?? "MC-2025-001";

  return (
    <>
      <Nav />
      <main>
        <div className="max-w-[560px] mx-auto px-8 py-20 text-center">
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
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-cream border border-cream-3 text-xs text-brown mb-9">
            <span>Pedido</span>
            <strong className="text-ink font-medium">#{orderNum}</strong>
          </div>
          <br />
          <Link
            href="/"
            className="px-8 py-3.5 bg-ink text-cream text-[11px] font-semibold tracking-[0.14em] uppercase no-underline inline-block hover:bg-ink-2 transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
