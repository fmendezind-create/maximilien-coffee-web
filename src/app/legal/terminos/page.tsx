import type { Metadata } from "next";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Términos y Condiciones — Maximilien Coffee",
};

export default function TerminosPage() {
  return (
    <>
      <Nav />
      <main className="max-w-[760px] mx-auto px-6 py-16 md:py-20">
        <h1 className="font-display text-3xl font-normal text-ink mb-2">Términos y Condiciones</h1>
        <p className="text-[12px] text-brown-light mb-10">Última actualización: julio de 2026</p>
        <div className="space-y-8 text-[14px] font-light text-brown-light leading-[1.9]">
          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">1. Uso del sitio</h2>
            <p>El acceso a maximiliencoffee.com implica la aceptación plena de estos términos. El sitio está destinado a personas mayores de edad en Colombia.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">2. Condiciones de compra</h2>
            <p>Al realizar un pedido, el cliente declara que la información proporcionada es verídica y completa. Nos reservamos el derecho de cancelar pedidos con información incorrecta.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">3. Precios y pagos</h2>
            <p>Precios en pesos colombianos (COP). Pagos procesados de forma segura a través de Wompi. No almacenamos datos de tarjetas de crédito.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">4. Envíos</h2>
            <p>Despachamos a todo Colombia. Bogotá: 1-2 días hábiles. Resto del país: 3-5 días hábiles. Envío gratis en pedidos superiores a $100.000 COP.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">5. Devoluciones</h2>
            <p>Aceptamos devoluciones dentro de los 5 días hábiles siguientes a la recepción, si el producto llegó en mal estado o diferente al solicitado y el empaque está sin abrir. Contacto: <a href="mailto:hola@maximiliencoffee.com" className="text-gold">hola@maximiliencoffee.com</a></p>
          </section>
          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">6. Responsabilidades</h2>
            <p>Maximilien Coffee no se hace responsable por demoras de transportadoras, fuerza mayor o información incorrecta del cliente.</p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
