import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { ProductDetail } from "@/components/product/product-detail";
import { RelatedProducts } from "@/components/product/related-products";
import { PRODUCTS, getProductBySlug, getRelatedProducts } from "@/lib/products";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return {
    title: `${product.name} — ${product.sca} pts SCA`,
    description: `${product.name}, ${product.origin}. ${product.sca} puntos SCA. Proceso ${product.process.toLowerCase()}. ${product.notes.slice(0, 3).join(", ")}.`,
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

  return (
    <>
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
