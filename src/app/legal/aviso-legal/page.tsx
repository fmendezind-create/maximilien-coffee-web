import type { Metadata } from "next";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Aviso Legal — Maximilien Coffee",
};

export default function AvisoLegalPage() {
  return (
    <>
      <Nav />
      <main className="max-w-[760px] mx-auto px-6 py-16 md:py-20">
        <h1 className="font-display text-3xl font-normal text-ink mb-2">Aviso Legal</h1>
        <p className="text-[12px] text-brown-light mb-10">Última actualización: julio de 2026</p>
        <div className="space-y-8 text-[14px] font-light text-brown-light leading-[1.9]">
          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">Información del titular</h2>
            <ul className="space-y-2">
              <li><strong className="text-ink">Nombre comercial:</strong> Maximilien Coffee</li>
              <li><strong className="text-ink">País:</strong> Colombia</li>
              <li><strong className="text-ink">Sitio web:</strong> maximiliencoffee.com</li>
              <li><strong className="text-ink">Correo:</strong> <a href="mailto:hola@maximiliencoffee.com" className="text-gold">hola@maximiliencoffee.com</a></li>
              <li><strong className="text-ink">Instagram:</strong> @maximiliencoffee</li>
            </ul>
            <p className="mt-4 text-[12px] bg-cream border border-cream-3 p-4">NIT y registro mercantil serán actualizados al completar la formalización empresarial.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">Propiedad intelectual</h2>
            <p>Todos los contenidos (textos, imágenes, logotipos, diseño) son propiedad de Maximilien Coffee. Queda prohibida su reproducción sin autorización.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">Legislación aplicable</h2>
            <p>Este sitio se rige por la legislación colombiana.</p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
