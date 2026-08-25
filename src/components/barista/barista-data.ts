// ── DATOS DEL BARISTA ─────────────────────────────────────────────

export type ProductSlug = "bourbon-rosado" | "variedad-colombia" | "blend";

export interface QuizAnswer {
  intensity: string;
  brewer:    string;
  occasion:  string;
}

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export const PRODUCTS = {
  "bourbon-rosado": {
    name: "Bourbon Rosado",
    subtitle: "Variedad Bourbon Rosado · Natural",
    sca: 92,
    accent: "#C8A84A",
    image: "/images/bourbon-main.jpg",
    notes: ["Frutos amarillos", "Panela", "Jazmín"],
    price: "$34.900",
    slug: "bourbon-rosado",
  },
  "variedad-colombia": {
    name: "Variedad Colombia",
    subtitle: "Variedad Colombia · Natural",
    sca: 87,
    accent: "#8B1A1A",
    image: "/images/colombia-main.jpg",
    notes: ["Cítrico", "Durazno", "Chocolate blanco"],
    price: "$31.900",
    slug: "variedad-colombia",
  },
  "blend": {
    name: "Blend",
    subtitle: "Castillo · Caturra · Papayo · Lavado",
    sca: 82,
    accent: "#9B2020",
    image: "/images/blend-main.jpg",
    notes: ["Caramelo", "Avellana", "Chocolate"],
    price: "$29.900",
    slug: "blend",
  },
};

export const QUIZ_STEPS = [
  {
    key: "intensity",
    question: "¿Qué tan intenso te gusta el café?",
