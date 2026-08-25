// -- DATOS DEL BARISTA

export type ProductSlug = "bourbon-rosado" | "variedad-colombia" | "blend";

export interface QuizAnswer {
  intensity: string;
  brewer: string;
  occasion: string;
}

export interface Message {
  role: "user" | "assistant";
  content: string; 
}

export const PRODUCTS = {
  "bourbon-rosado": {
    name: "Bourbon Rosado",
    subtitle: "Variedad Bourbon Rosado - Natural",
    sca: 92,
    accent: "#C8A84A",
    image: "/images/bourbon-main.jpg",
    notes: ["Frutos amarillos", "Panela", "Jazmin"],
    price: "$34.900",
    slug: "bourbon-rosado",
  },
  "variedad-colombia": {
    name: "Variedad Colombia",
    subtitle: "Variedad Colombia - Natural",
    sca: 87,
    accent: "#8B1A1A",
    image: "/images/colombia-main.jpg",
    notes: ["Citrico", "Durazno", "Chocolate blanco"],
    price: "$31.900",
    slug: "variedad-colombia",
  },
  blend: {
    name: "Blend",
    subtitle: "Castillo - Caturra - Papayo - Lavado",
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
    question: "Como te gusta el cafe?",
    options: [
      { value: "suave", label: "Suave y floral", sub: "Notas delicadas, acidez brillante" },
      { value: "balanceado", label: "Balanceado", sub: "Ni muy fuerte ni muy suave" },
      { value: "intenso", label: "Intenso y robusto", sub: "Cuerpo pleno, sabor profundo" },
    ],
  },
  {
    key: "brewer",
    question: "Como preparas tu cafe?",
    options: [
      { value: "v60", label: "V60 / Pour Over", sub: "Filtrado manual" },
      { value: "chemex", label: "Chemex", sub: "Filtrado limpio" },
      { value: "aeropress", label: "Aeropress", sub: "Versatil y concentrado" },
      { value: "espresso", label: "Espresso", sub: "Maquina de presion" },
      { value: "moka", label: "Moka / Greca", sub: "Cafe fuerte en estufa" },
      { value: "prensa", label: "Prensa francesa", sub: "Inmersion completa" },
    ],
  },
  {
    key: "occasion",
    question: "Para que ocasion buscas el cafe?",
    options: [
      { value: "diario", label: "Mi cafe del dia a dia", sub: "Algo confiable y consistente" },
      { value: "explorar", label: "Quiero explorar", sub: "Algo diferente a lo de siempre" },
      { value: "regalo", label: "Es un regalo", sub: "Para alguien especial" },
      { value: "sobremesa", label: "Sobremesa o momentos especiales", sub: "Para saborear con calma" },
    ],
  },
];

export function recommend(answers: QuizAnswer): ProductSlug {
  const { intensity, brewer, occasion } = answers;
  if (brewer === "espresso" && intensity === "intenso") return "blend";
  if (brewer === "moka") return "blend";
  if (intensity === "suave" && (brewer === "v60" || brewer === "chemex")) return "bourbon-rosado";
  if (occasion === "regalo" || occasion === "explorar") return "bourbon-rosado";
  if (occasion === "diario" && intensity === "balanceado") return "variedad-colombia";
  if (occasion === "diario" && intensity === "intenso") return "blend";
  return "variedad-colombia";
}

export function buildSystemPrompt(recommended: ProductSlug, answers: QuizAnswer): string {
  const p = PRODUCTS[recommended];
  return (
    "Eres Maximilien, el barista experto de Maximilien Coffee. " +
    "Marca de cafe de especialidad con origen unico en Santa Maria, Huila, Colombia.\n\n" +
    "Personalidad: conocedor apasionado, calido, directo. Hablas como un barista real. Espanol natural, segunda persona (tu).\n\n" +
    "CONTEXTO DEL USUARIO:\n" +
    "- Intensidad: " + answers.intensity + "\n" +
    "- Metodo: " + answers.brewer + "\n" +
    "- Ocasion: " + answers.occasion + "\n" +
    "- Recomendado: " + p.name + " (" + p.sca + " pts SCA)\n\n" +
    "CATALOGO:\n" +
    "1. Bourbon Rosado - 92 pts SCA - Natural - $34.900/250g - $59.900/454g\n" +
    "   Perfil: frutos amarillos, panela, jazmin, bergamota, cacao fino\n" +
    "2. Variedad Colombia - 87 pts SCA - Natural - $31.900/250g - $54.900/454g\n" +
    "   Perfil: citrico, durazno, chocolate blanco, naranja, miel\n" +
    "3. Blend - 82 pts SCA - Lavado - $29.900/250g - $49.900/454g\n" +
    "   Perfil: caramelo, avellana, chocolate, nuez, final dulce\n\n" +
    "REGLAS:\n" +
    "- Sin respuestas corporativas\n" +
    "- Da recomendaciones directas con justificacion\n" +
    "- Nunca digas contactanos - TU eres la asesoria\n" +
    "- Maximo 2-3 parrafos por respuesta"
  );
}
