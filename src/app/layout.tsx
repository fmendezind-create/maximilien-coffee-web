import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { CartDrawer } from "@/components/layout/cart-drawer";

// PRODUCCIÓN: Descomenta este bloque al desplegar en Vercel o cualquier host con internet
// import { Cormorant_Garamond, DM_Sans } from "next/font/google";
// const cormorant = Cormorant_Garamond({ variable: "--font-cormorant", subsets: ["latin"], weight: ["300","400","500","600"], style: ["normal","italic"], display: "swap" });
// const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"], weight: ["300","400","500","600"], display: "swap" });
// Y en el body: className={`${cormorant.variable} ${dmSans.variable} antialiased`}

export const metadata: Metadata = {
  title: { default: "Maximilien Coffee — Alma de Café", template: "%s · Maximilien Coffee" },
  description: "Café colombiano de especialidad. Origen exclusivo Huila. Bourbon Rosado 92 pts SCA.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap" rel="stylesheet" />
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
