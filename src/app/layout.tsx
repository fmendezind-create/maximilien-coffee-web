import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { CartDrawer } from "@/components/layout/cart-drawer";

export const metadata: Metadata = {
  metadataBase: new URL("https://maximiliencoffee.com"),
  title: {
    default: "Maximilien Coffee — Café de Especialidad del Huila, Colombia",
    template: "%s | Maximilien Coffee",
  },
  description:
    "Café colombiano de especialidad con origen único en Santa María, Huila. Bourbon Rosado 92 pts SCA, Variedad Colombia 89 pts, Blend 85 pts. Tostado esta semana. Envío a toda Colombia.",
  keywords: [
    "café de especialidad Colombia",
    "café especialidad Huila",
    "bourbon rosado café Colombia",
    "bourbon rosado 92 puntos SCA",
    "café santa maría huila",
    "comprar café especial online Colombia",
    "café origen único Huila",
    "café natural proceso natural Colombia",
    "café honey Colombia",
    "maximilien coffee",
    "alma de café",
  ],
  authors: [{ name: "Maximilien Coffee", url: "https://maximiliencoffee.com" }],
  creator: "Maximilien Coffee",
  publisher: "Maximilien Coffee",
  verification: {
    google: ["5AptonEmQ6-JPb7scjvW2m0A0V4v-H-zCxG9l_OkH44", "2KE53nMQ30hn6kJN_kXQjg_56vBhKdoqjCGapT7ghdc"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://maximiliencoffee.com",
    siteName: "Maximilien Coffee",
    title: "Maximilien Coffee — Café de Especialidad del Huila",
    description:
      "Bourbon Rosado 92 pts SCA. Origen único Santa María, Huila. Tostado esta semana. Envío a toda Colombia.",
    images: [
      {
        url: "/images/bourbon-main.jpg",
        width: 1200,
        height: 630,
        alt: "Maximilien Coffee — Bourbon Rosado 92 pts SCA, Santa María Huila",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maximilien Coffee — Café de Especialidad del Huila",
    description: "Bourbon Rosado 92 pts SCA. Origen único Santa María, Huila.",
    images: ["/images/bourbon-main.jpg"],
  },
  alternates: {
    canonical: "https://maximiliencoffee.com",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CO">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,300;1,9..144,400;1,9..144,500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300;1,9..40,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
