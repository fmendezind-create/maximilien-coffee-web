import { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";

const BLOG_SLUGS = [
  "que-es-bourbon-rosado-cafe-colombia",
  "como-preparar-cafe-v60-paso-a-paso",
  "que-significa-90-puntos-sca-cafe",
  "santa-maria-huila-origen-secreto-mejor-cafe-colombia",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://maximiliencoffee.com";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base,              lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/cafes`,   lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/origen`,  lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/barista`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog`,    lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
  ];

  const productRoutes: MetadataRoute.Sitemap = PRODUCTS.map(p => ({
    url: `${base}/cafes/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.95,
  }));

  const blogRoutes: MetadataRoute.Sitemap = BLOG_SLUGS.map(slug => ({
    url: `${base}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
