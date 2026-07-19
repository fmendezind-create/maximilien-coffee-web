import type { Metadata } from "next";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { CatalogClient } from "@/components/catalog/catalog-client";

export const metadata: Metadata = {
  title: "Catálogo — Café de Especialidad Huila",
  description:
    "Compra café de especialidad colombiano online. Bourbon Rosado 92 pts, Variedad Colombia 89 pts, Blend 85 pts. Origen Santa María, Huila. Envío a toda Colombia.",
  keywords: ["comprar café especialidad Colombia", "café Huila online", "bourbon rosado comprar", "café specialty Colombia"],
  alternates: { canonical: "https://maximiliencoffee.com/cafes" },
  openGraph: {
    title: "Catálogo — Maximilien Coffee",
    description: "3 cafés de especialidad de Santa María, Huila. Desde $36.000.",
    url: "https://maximiliencoffee.com/cafes",
  },
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
