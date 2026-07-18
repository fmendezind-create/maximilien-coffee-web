import type { Metadata } from "next";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { BaristaClient } from "@/components/barista/barista-client";

export const metadata: Metadata = {
  title: "Barista IA — Tu guía de café",
  description: "Encuentra tu café ideal en 3 preguntas. Nuestro Barista IA te recomienda el café perfecto según tu gusto, cafetera y ocasión.",
};

export default function BaristaPage() {
  return (
    <>
      <Nav breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Barista IA" }]} />
      <main>
        <BaristaClient />
      </main>
      <Footer />
    </>
  );
}
