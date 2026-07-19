import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/checkout", "/checkout/confirmacion", "/api/"],
      },
    ],
    sitemap: "https://maximiliencoffee.com/sitemap.xml",
    host: "https://maximiliencoffee.com",
  };
}
