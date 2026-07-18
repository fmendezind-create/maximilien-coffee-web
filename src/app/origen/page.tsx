import type { Metadata } from "next";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { OrigenClient } from "@/components/origen/origen-client";

export const metadata: Metadata = {
  title: "Nuestro Origen",
  description: "Santa María, Huila. A 2.000 metros sobre el nivel del mar, entre el Macizo Colombiano y el río Magdalena. El terroir que hace posible el Bourbon Rosado con 92 puntos SCA.",
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
