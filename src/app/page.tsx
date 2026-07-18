import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { HeroSlider } from "@/components/home/hero-slider";
import { TrustBar } from "@/components/home/trust-bar";
import { Collection } from "@/components/home/collection";
import { Origin } from "@/components/home/origin";
import { BaristaCTA } from "@/components/home/barista-cta";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <HeroSlider />
        <TrustBar />
        <Collection />
        <Origin />
        <BaristaCTA />
      </main>
      <Footer />
    </>
  );
}
