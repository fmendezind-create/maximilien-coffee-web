import type { Metadata } from "next";
import Script from "next/script";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { HeroSlider } from "@/components/home/hero-slider";
import { TrustBar } from "@/components/home/trust-bar";
import { Collection } from "@/components/home/collection";
import { Origin } from "@/components/home/origin";
import { BaristaCTA } from "@/components/home/barista-cta";

export const metadata: Metadata = {
  title: "Maximilien Coffee — Café de Especialidad del Huila, Colombia",
  description:
    "Café colombiano de especialidad con origen único en Santa María, Huila. Bourbon Rosado 92 pts SCA. Tostado esta semana. Compra directa al productor. Envío a toda Colombia.",
  alternates: { canonical: "https://maximiliencoffee.com" },
  openGraph: {
    title: "Maximilien Coffee — Café de Especialidad del Huila",
    description: "Bourbon Rosado 92 pts SCA. Origen único. Tostado esta semana.",
    url: "https://maximiliencoffee.com",
    images: [{ url: "/images/bourbon-main.jpg", width: 1200, height: 630 }],
  },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "OnlineStore"],
  name: "Maximilien Coffee",
  alternateName: "Alma de Café",
  url: "https://maximiliencoffee.com",
  logo: "https://maximiliencoffee.com/images/logo.jpg",
  description: "Café colombiano de especialidad. Origen único Santa María, Huila. Bourbon Rosado 92 pts SCA.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "CO",
    addressRegion: "Bogotá D.C.",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: "Spanish",
  },
  sameAs: [
    "https://www.instagram.com/maximiliencoffee",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Maximilien Coffee",
  url: "https://maximiliencoffee.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://maximiliencoffee.com/cafes?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function HomePage() {
  return (
    <>
      <Script id="schema-org" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}/>
      <Script id="schema-website" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}/>
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
