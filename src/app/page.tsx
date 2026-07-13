import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { TrustBar } from "@/components/home/trust-bar";
import { Collection } from "@/components/home/collection";
import { Origin } from "@/components/home/origin";
import { BaristaCTA } from "@/components/home/barista-cta";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <Collection />
        <Origin />
        <BaristaCTA />
      </main>
      <Footer />
    </>
  );
}
