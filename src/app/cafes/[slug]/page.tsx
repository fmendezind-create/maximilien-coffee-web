import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { ProductDetail } from "@/components/product/product-detail";
import { RelatedProducts } from "@/components/product/related-products";
import { PRODUCTS, getProductBySlug, getRelatedProducts } from "@/lib/products";

export function generateStaticParams() {
  return PRODUCTS.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  const title = `${product.name} — ${product.sca} pts SCA · Café de Especialidad Huila`;
  const description = `${product.name} de Santa María, Huila. ${product.sca} puntos SCA. Proceso ${product.process.toLowerCase()}. Notas: ${product.notes.slice(0, 3).join(", ")}. ${product.altitude}. Compra directa al productor. Envío a toda Colombia.`;
  const url = `https://maximiliencoffee.com/cafes/${slug}`;

  return {
    title,
    description,
    keywords: [
      product.name.toLowerCase(),
      `${product.name.toLowerCase()} Colombia`,
      `café ${product.process.toLowerCase()} huila`,
      `café especialidad ${product.sca} puntos SCA`,
      `${product.variety.toLowerCase()} café Colombia`,
      "café santa maría huila comprar",
    ],
    alternates: { canonical: url },
    openGraph: {
      title: `${product.name} — ${product.sca} pts SCA | Maximilien Coffee`,
      description,
      url,
      type: "website",
      images: [
        {
          url: product.image,
          width: 1000,
          height: 700,
          alt: `${product.name} — Maximilien Coffee, Santa María Huila`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} — ${product.sca} pts SCA`,
      description: `${product.notes.slice(0, 3).join(" · ")} · Origen Huila`,
      images: [product.image],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(slug);
  const cheapest = product.variants[0];
  const url = `https://maximiliencoffee.com/cafes/${slug}`;

  // Schema.org JSON-LD — Google muestra precio, disponibilidad y rating en resultados
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: `${product.name} de especialidad. ${product.sca} puntos SCA. Proceso ${product.process}. Origen ${product.origin}. ${product.altitude}. Notas: ${product.notes.join(", ")}.`,
    image: [
      `https://maximiliencoffee.com${product.image}`,
      ...product.gallery.map(g => `https://maximiliencoffee.com${g}`),
    ],
    brand: {
      "@type": "Brand",
      name: "Maximilien Coffee",
    },
    offers: product.variants.map(v => ({
      "@type": "Offer",
      url,
      priceCurrency: "COP",
      price: v.price,
      priceValidUntil: "2026-12-31",
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "Maximilien Coffee" },
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      bestRating: 5,
      ratingCount: product.reviewCount,
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Puntuación SCA", value: `${product.sca} puntos` },
      { "@type": "PropertyValue", name: "Proceso", value: product.process },
      { "@type": "PropertyValue", name: "Variedad", value: product.variety },
      { "@type": "PropertyValue", name: "Origen", value: product.origin },
      { "@type": "PropertyValue", name: "Altitud", value: product.altitude },
    ],
  };

  // Schema BreadcrumbList
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://maximiliencoffee.com" },
      { "@type": "ListItem", position: 2, name: "Cafés", item: "https://maximiliencoffee.com/cafes" },
      { "@type": "ListItem", position: 3, name: product.name, item: url },
    ],
  };

  return (
    <>
      <Script
        id={`schema-product-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Script
        id={`schema-breadcrumb-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <Nav
        breadcrumb={[
          { label: "Inicio", href: "/" },
          { label: "Cafés", href: "/cafes" },
          { label: product.name },
        ]}
      />
      <main>
        <ProductDetail product={product} />
        <RelatedProducts products={related} />
      </main>
      <Footer />
    </>
  );
}
