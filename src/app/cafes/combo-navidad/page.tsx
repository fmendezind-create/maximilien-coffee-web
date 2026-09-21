import type { Metadata } from "next";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { ComboDetail } from "@/components/product/combo-detail";

export const metadata: Metadata = {
  title: "Combo Navidad — 2 cafes + vaso mezclador | Maximilien Coffee",
  description: "El regalo perfecto para esta Navidad. Dos bolsas de cafe de especialidad del Huila mas un vaso mezclador premium. Elige tus variedades favoritas.",
  alternates: { canonical: "https://maximiliencoffee.com/cafes/combo-navidad" },
};

export default function ComboPage() {
  return (
    <>
      <Nav breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Cafes", href: "/cafes" }, { label: "Combo Navidad" }]} />
      <main>
        <ComboDetail />
      </main>
      <Footer />
    </>
  );
}
