export type Accent = "bourbon" | "colombia" | "blend";
export interface Variant { weight: string; price: number; }
export interface Product {
  slug: string; accent: Accent; badge: string; kicker: string;
  name: string; variety: string; process: "Natural" | "Honey" | "Lavado";
  origin: string; altitude: string; roast: string;
  intensity: "Suave — media" | "Media" | "Media — alta";
  sca: number; notes: string[]; variants: Variant[];
  reviewCount: number; rating: number;
  image: string; gallery: string[];
  storyTitle: string; storyBody: string;
  processTitle: string; processBody: string;
}
export const ACCENT_COLORS: Record<Accent, { base: string; dark: string; pale: string }> = {
  bourbon:  { base: "#C8A84A", dark: "#A88030", pale: "#F5E4A8" },
  colombia: { base: "#8B1A1A", dark: "#6B0E0E", pale: "#E8C8C8" },
  blend:    { base: "#9B2020", dark: "#7A1010", pale: "#F0D0D0" },
};
export const PRODUCTS: Product[] = [
  {
    slug: "bourbon-rosado", accent: "bourbon",
    badge: "La joya", kicker: "Bolsa dorada",
    name: "Bourbon Rosado", variety: "Bourbon Rosado", process: "Natural",
    origin: "Santa María, Huila", altitude: "2.000 m.s.n.m.",
    roast: "Media", intensity: "Suave — media", sca: 92,
    notes: ["Frutos amarillos", "Panela", "Jazmín", "Bergamota", "Cacao fino"],
    variants: [{ weight: "250g", price: 52000 }, { weight: "454g", price: 78000 }, { weight: "500g", price: 98000 }],
    reviewCount: 48, rating: 5,
    image: "/images/bourbon-main.jpg",
    gallery: ["/images/bourbon-1.jpg", "/images/bourbon-2.jpg"],
    storyTitle: "Por qué es especial",
    storyBody: "El Bourbon Rosado es una mutación genética que produce cerezas de color rosado al madurar — una de las variedades más raras del mundo. Su producción es limitada porque es más susceptible a enfermedades y da menos fruto por planta. A cambio, ofrece una complejidad aromática sin paralelo: notas florales intensas, frutosidad luminosa y una dulzura natural. Este lote alcanzó 92 puntos SCA.",
    processTitle: "Proceso natural",
    processBody: "Las cerezas se secan enteras al sol durante 25–30 días sin remover la pulpa. El azúcar de la fruta fermenta lentamente y penetra el grano — de ahí vienen las notas frutales y la dulzura característica.",
  },
  {
    slug: "variedad-colombia", accent: "colombia",
    badge: "Sofisticado", kicker: "Bolsa negra",
    name: "Variedad Colombia", variety: "Colombia", process: "Honey",
    origin: "Santa María, Huila", altitude: "1.900 m.s.n.m.",
    roast: "Media", intensity: "Media", sca: 89,
    notes: ["Cítrico", "Durazno", "Chocolate blanco", "Naranja", "Miel"],
    variants: [{ weight: "250g", price: 44000 }, { weight: "454g", price: 66000 }, { weight: "500g", price: 82000 }],
    reviewCount: 32, rating: 5,
    image: "/images/colombia-main.jpg",
    gallery: ["/images/colombia-1.jpg", "/images/colombia-2.jpg"],
    storyTitle: "Por qué es especial",
    storyBody: "La Variedad Colombia fue desarrollada por Cenicafé como una alternativa resistente a la roya que mantiene la calidad del Caturra. Bien cultivada a gran altitud y procesada en honey, produce tazas extraordinarias — ácidas, jugosas y complejas. Este lote a 1.900 m.s.n.m. en el Huila lo demuestra con 89 puntos SCA.",
    processTitle: "Proceso honey",
    processBody: "Se retira la pulpa pero se deja parte del mucílago adherido al grano durante el secado. Esa capa dulce fermenta suavemente, aportando notas de miel, fruta y caramelo.",
  },
  {
    slug: "blend", accent: "blend",
    badge: "El favorito", kicker: "Bolsa roja",
    name: "Blend", variety: "Castillo · Caturra · Papayo", process: "Lavado",
    origin: "Santa María, Huila", altitude: "1.800 m.s.n.m.",
    roast: "Media oscura", intensity: "Media — alta", sca: 85,
    notes: ["Caramelo", "Avellana", "Chocolate", "Nuez", "Dulce equilibrado"],
    variants: [{ weight: "250g", price: 36000 }, { weight: "454g", price: 54000 }, { weight: "500g", price: 68000 }],
    reviewCount: 61, rating: 5,
    image: "/images/blend-main.jpg",
    gallery: ["/images/blend-1.jpg", "/images/blend-2.jpg"],
    storyTitle: "Por qué un blend",
    storyBody: "El Blend nació para quienes quieren un café de especialidad equilibrado y consistente todos los días. Combinamos Castillo, Caturra y Papayo en proporciones que se ajustan cada cosecha para mantener el perfil de caramelo, avellana y chocolate que lo define.",
    processTitle: "Proceso lavado",
    processBody: "Se retira toda la pulpa y el mucílago antes del secado. El resultado es una taza limpia, con acidez definida y donde el carácter de la variedad se expresa con claridad.",
  },
];
export function getProductBySlug(slug: string) { return PRODUCTS.find(p => p.slug === slug); }
export function getRelatedProducts(slug: string) { return PRODUCTS.filter(p => p.slug !== slug); }
export function formatCOP(n: number) { return "$" + n.toLocaleString("es-CO"); }
