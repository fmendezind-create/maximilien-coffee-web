# Maximilien Coffee — Next.js

Proyecto Next.js 14 (App Router) con TypeScript y Tailwind CSS v4.
Migración completa de los prototipos HTML a componentes React de producción.

## Instalación

```bash
npm install
npm run dev
```

Abre http://localhost:3000

## Estructura

```
src/
├── app/                      # Rutas (App Router)
│   ├── page.tsx              # Homepage
│   ├── cafes/
│   │   ├── page.tsx          # Catálogo con filtros
│   │   └── [slug]/page.tsx   # PDP dinámica (3 productos)
│   └── checkout/
│       ├── page.tsx          # Checkout
│       └── confirmacion/     # Confirmación de pedido
├── components/
│   ├── layout/                # Nav, Footer, CartDrawer
│   ├── home/                  # Hero, Collection, Origin, BaristaCTA, TrustBar
│   ├── product/                # ProductCard, ProductDetail, RelatedProducts
│   ├── catalog/                # CatalogClient (filtros + grid)
│   └── checkout/               # CheckoutClient
└── lib/
    ├── products.ts            # Modelo de datos del catálogo (fuente única)
    ├── cart-context.tsx       # Estado global del carrito
    └── use-reveal.ts           # Hook de scroll-reveal
```

## Siguiente paso: conectar al backend

Todo el modelo de datos vive en `src/lib/products.ts`. Cuando el backend
FastAPI esté listo, esta capa se reemplaza por llamadas `fetch` a la API
— los componentes no necesitan cambiar porque consumen los mismos tipos
(`Product`, `Variant`).

## Imágenes

`/public/images/` contiene placeholders SVG con la paleta de marca.
Reemplázalos por fotografía real del empaque manteniendo los mismos
nombres de archivo, o actualiza las rutas en `src/lib/products.ts`.

## Deploy

Recomendado: Vercel (despliegue nativo de Next.js, cero configuración).

```bash
npm i -g vercel
vercel
```
