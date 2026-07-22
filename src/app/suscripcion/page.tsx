import type { Metadata } from "next";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { SuscripcionClient } from "@/components/suscripcion/suscripcion-client";

export const metadata: Metadata = {
  title: "Suscripción mensual — 10% de descuento permanente",
  description: "Recibe tu café de especialidad del Huila cada mes con 10% de descuento permanente. Tú eliges el café y el peso. Cancela cuando quieras.",
  alternates: { canonical: "https://maximiliencoffee.com/suscripcion" },
};

export default function SuscripcionPage() {
  return (
    <>
      <Nav breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Suscripción" }]} />
      <main>
        <SuscripcionClient />
      </main>
      <Footer />
    </>
  );
}
