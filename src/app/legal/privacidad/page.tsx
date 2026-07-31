import type { Metadata } from "next";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Política de Privacidad — Maximilien Coffee",
};

export default function PrivacidadPage() {
  return (
    <>
      <Nav />
      <main className="max-w-[760px] mx-auto px-6 py-16 md:py-20">
        <h1 className="font-display text-3xl font-normal text-ink mb-2">Política de Privacidad</h1>
        <p className="text-[12px] text-brown-light mb-10">Última actualización: julio de 2026</p>
        <div className="space-y-8 text-[14px] font-light text-brown-light leading-[1.9]">
          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">1. Responsable del tratamiento</h2>
            <p>Maximilien Coffee es responsable del tratamiento de los datos personales recopilados a través de <strong className="text-ink">maximiliencoffee.com</strong>. Contacto: <a href="mailto:hola@maximiliencoffee.com" className="text-gold">hola@maximiliencoffee.com</a></p>
          </section>
          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">2. Datos que recopilamos</h2>
            <ul className="list-disc ml-5 space-y-1">
              <li>Nombre completo</li>
              <li>Correo electrónico</li>
              <li>Número de teléfono / WhatsApp</li>
              <li>Dirección de envío</li>
              <li>Ciudad y departamento</li>
              <li>Datos de navegación (cookies técnicas)</li>
            </ul>
          </section>
          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">3. Finalidad del tratamiento</h2>
            <ul className="list-disc ml-5 space-y-1">
              <li>Procesar y gestionar pedidos</li>
              <li>Enviar confirmaciones y actualizaciones del pedido</li>
              <li>Coordinar el envío de productos</li>
              <li>Atender solicitudes y consultas</li>
              <li>Mejorar la experiencia en el sitio</li>
            </ul>
          </section>
          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">4. Base legal</h2>
            <p>El tratamiento se realiza con base en la Ley 1581 de 2012 y el Decreto 1377 de 2013 de Colombia.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">5. Tiempo de conservación</h2>
            <p>Los datos se conservan durante el tiempo necesario para cumplir con la finalidad y según lo exija la legislación colombiana. Los datos de pedidos se conservan mínimo 5 años.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">6. Derechos del titular</h2>
            <p>Usted tiene derecho a conocer, actualizar, rectificar y suprimir sus datos. Para ejercerlos: <a href="mailto:hola@maximiliencoffee.com" className="text-gold">hola@maximiliencoffee.com</a></p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
