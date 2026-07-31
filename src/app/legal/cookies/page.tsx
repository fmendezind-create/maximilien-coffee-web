import type { Metadata } from "next";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Política de Cookies — Maximilien Coffee",
};

export default function CookiesPage() {
  return (
    <>
      <Nav />
      <main className="max-w-[760px] mx-auto px-6 py-16 md:py-20">
        <h1 className="font-display text-3xl font-normal text-ink mb-2">Política de Cookies</h1>
        <p className="text-[12px] text-brown-light mb-10">Última actualización: julio de 2026</p>
        <div className="space-y-8 text-[14px] font-light text-brown-light leading-[1.9]">
          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">¿Qué son las cookies?</h2>
            <p>Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Nos permiten recordar tus preferencias y mejorar tu experiencia de navegación.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">Tipos de cookies que usamos</h2>
            <div className="space-y-4">
              <div className="border border-cream-3 p-4">
                <h3 className="font-medium text-ink mb-1">Cookies técnicas (necesarias)</h3>
                <p className="text-[13px]">Esenciales para el funcionamiento del sitio: carrito de compras, sesión, preferencias de idioma. No requieren consentimiento.</p>
              </div>
              <div className="border border-cream-3 p-4">
                <h3 className="font-medium text-ink mb-1">Cookies analíticas (opcionales)</h3>
                <p className="text-[13px]">Google Analytics 4 — nos ayudan a entender cómo los usuarios interactúan con el sitio para mejorarlo. Solo se activan con tu consentimiento.</p>
              </div>
            </div>
          </section>
          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">Gestión de cookies</h2>
            <p>Puedes aceptar o rechazar las cookies analíticas mediante el banner que aparece en tu primera visita. También puedes configurar tu navegador para bloquear todas las cookies, aunque esto puede afectar el funcionamiento del sitio.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">Terceros</h2>
            <p>Utilizamos los siguientes servicios de terceros que pueden establecer sus propias cookies:</p>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>Google Analytics 4 (analítica)</li>
              <li>Wompi (procesamiento de pagos)</li>
              <li>Resend (emails transaccionales)</li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
