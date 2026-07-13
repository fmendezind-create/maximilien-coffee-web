import type { Metadata } from "next";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { CatalogClient } from "@/components/catalog/catalog-client";

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "Café colombiano de especialidad. Tres expresiones del Huila: Bourbon Rosado 92 pts, Variedad Colombia 89 pts, Blend 85 pts.",
};

export default function CafesPage() {
  return (
    <>
      <Nav breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Cafés" }]} />
      <main>
        <CatalogClient />
      </main>
      <Footer />
    </>
  );
}
