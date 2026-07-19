import type { Metadata } from "next";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { OrigenClient } from "@/components/origen/origen-client";

export const metadata: Metadata = {
  title: "Nuestro Origen — Santa María, Huila · 2.000 m.s.n.m.",
  description:
    "Conoce Santa María, Huila: el origen exclusivo de Maximilien Coffee. A 2.000 metros sobre el nivel del mar, entre el Macizo Colombiano y el río Magdalena. El terroir que hace posible el Bourbon Rosado con 92 puntos SCA.",
  keywords: ["café santa maría huila", "origen café especialidad Huila", "terroir café Colombia", "café 2000 msnm Colombia"],
  alternates: { canonical: "https://maximiliencoffee.com/origen" },
  openGraph: {
    title: "Santa María, Huila — El origen de Maximilien Coffee",
    description: "A 2.000 m.s.n.m. entre el Macizo Colombiano y el río Magdalena. El terroir que lo hace posible.",
    url: "https://maximiliencoffee.com/origen",
    images: [{ url: "/images/colombia-1.jpg", width: 1200, height: 630 }],
  },
};

export default function OrigenPage() {
  return (
    <>
      <Nav breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Origen" }]} />
      <main>
        <OrigenClient />
      </main>
      <Footer />
    </>
  );
}
