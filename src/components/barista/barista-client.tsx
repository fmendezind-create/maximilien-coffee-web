"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// ── TIPOS ──────────────────────────────────────────────────────────
type Step = "quiz" | "result" | "chat";
type ProductSlug = "bourbon-rosado" | "variedad-colombia" | "blend";

interface QuizAnswer {
  intensity: string;
  brewer:    string;
  occasion:  string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

// ── DATOS DE PRODUCTOS ─────────────────────────────────────────────
const PRODUCTS = {
  "bourbon-rosado": {
    name: "Bourbon Rosado",
    subtitle: "Variedad Bourbon Rosado · Natural",
    sca: 92,
    accent: "#C8A84A",
    image: "/images/bourbon-main.jpg",
    notes: ["Frutos amarillos", "Panela", "Jazmín"],
    price: "$52.000",
    slug: "bourbon-rosado",
    brewers: ["V60", "Chemex", "Aeropress", "Espresso"],
    pairing: "Frutas frescas, chocolate blanco, queso brie",
  },
  "variedad-colombia": {
    name: "Variedad Colombia",
    subtitle: "Variedad Colombia · Honey",
    sca: 89,
    accent: "#8B1A1A",
    image: "/images/colombia-main.jpg",
    notes: ["Cítrico", "Durazno", "Chocolate blanco"],
    price: "$44.000",
    slug: "variedad-colombia",
    brewers: ["V60", "Prensa francesa", "Moka", "Espresso"],
    pairing: "Croissant, frutas cítricas, chocolate de leche",
  },
  "blend": {
    name: "Blend",
    subtitle: "Castillo · Caturra · Papayo · Lavado",
    sca: 85,
    accent: "#9B2020",
    image: "/images/blend-main.jpg",
    notes: ["Caramelo", "Avellana", "Chocolate"],
    price: "$36.000",
    slug: "blend",
    brewers: ["Espresso", "Moka", "Prensa francesa", "Americano"],
    pairing: "Tostadas, nueces, chocolate negro, galletas",
  },
};

// ── LÓGICA DE RECOMENDACIÓN ────────────────────────────────────────
function recommend(answers: QuizAnswer): ProductSlug {
  const { intensity, brewer, occasion } = answers;

  // Espresso + intenso → Blend
  if (brewer === "espresso" && intensity === "intenso") return "blend";
  // Moka → Blend
  if (brewer === "moka") return "blend";
  // Suave + filtro → Bourbon
  if (intensity === "suave" && (brewer === "v60" || brewer === "chemex")) return "bourbon-rosado";
  // Regalo o explorar → Bourbon
  if (occasion === "regalo" || occasion === "explorar") return "bourbon-rosado";
  // Diario + balanceado → Colombia
  if (occasion === "diario" && intensity === "balanceado") return "variedad-colombia";
  // Diario + intenso → Blend
  if (occasion === "diario" && intensity === "intenso") return "blend";
  // Default → Colombia
  return "variedad-colombia";
}

// ── SISTEMA PROMPT ─────────────────────────────────────────────────
function buildSystemPrompt(recommended: ProductSlug, answers: QuizAnswer): string {
  const p = PRODUCTS[recommended];
  return `Eres el Barista IA de Maximilien Coffee — una marca colombiana de café de especialidad con origen único en Santa María, Huila.

Tu personalidad: experto en café, cálido, directo y apasionado. Hablas en español, en segunda persona (tú). Nunca eres genérico — siempre conectas con el contexto del usuario.

CATÁLOGO COMPLETO:
1. Bourbon Rosado — 92 pts SCA — Natural — $52.000/250g
   Notas: frutos amarillos, panela, jazmín, bergamota, cacao fino
   Mejor en: V60, Chemex, Aeropress, Espresso
   Maridaje: frutas frescas, chocolate blanco, queso brie
   
2. Variedad Colombia — 89 pts SCA — Honey — $44.000/250g
   Notas: cítrico, durazno, chocolate blanco, naranja, miel
   Mejor en: V60, prensa francesa, moka, espresso
   Maridaje: croissant, frutas cítricas, chocolate de leche
   
3. Blend — 85 pts SCA — Lavado — $54.000/454g
   Notas: caramelo, avellana, chocolate, nuez
   Mejor en: espresso, moka, prensa francesa, americano
   Maridaje: tostadas, nueces, chocolate negro, galletas

EL USUARIO:
- Intensidad preferida: ${answers.intensity}
- Cafetera: ${answers.brewer}
- Ocasión: ${answers.occasion}
- Recomendación actual: ${p.name} (${p.sca} pts SCA)

COMPORTAMIENTO:
- Si preguntan por envíos: "Despachamos en 24-48h hábiles. Bogotá 1-2 días, resto del país 3-5 días. Envío gratis en compras +$80.000."
- Si preguntan por precios: dar los precios exactos del catálogo.
- Si preguntan cómo preparar: dar parámetros exactos (dosis, temperatura, tiempo, ratio).
- Si preguntan qué es SCA: "La Specialty Coffee Association es la organización internacional que certifica calidad en café. 85+ es especialidad, 90+ es excepcional."
- Si no estás seguro de algo: dilo y redirige a WhatsApp +57 300 123 4567.
- Respuestas: máximo 3 párrafos cortos. Usa formato conversacional, no listas largas.
- Siempre termina ofreciendo llevar al usuario a comprar si ya tiene suficiente info.`;
}

// ── QUIZ PREGUNTAS ─────────────────────────────────────────────────
const QUIZ = [
  {
    key: "intensity" as const,
    question: "¿Cómo te gusta el café?",
    emoji: "☕",
    options: [
      { value: "suave",      label: "Suave y frutal",      desc: "Notas florales, acidez suave" },
      { value: "balanceado", label: "Balanceado",           desc: "Entre dulce y ácido, versátil" },
      { value: "intenso",    label: "Intenso y cargado",    desc: "Cuerpo fuerte, chocolate, caramelo" },
    ],
  },
  {
    key: "brewer" as const,
    question: "¿Con qué lo preparas?",
    emoji: "🫖",
    options: [
      { value: "v60",       label: "Filtro (V60/Chemex)",   desc: "Extracción lenta, máximo aroma" },
      { value: "espresso",  label: "Espresso / Cafetera",   desc: "Presión alta, concentrado" },
      { value: "prensa",    label: "Prensa francesa",        desc: "Inmersión, cuerpo completo" },
      { value: "moka",      label: "Moka / Greca",          desc: "Clásica italiana" },
    ],
  },
  {
    key: "occasion" as const,
    question: "¿Para qué ocasión?",
    emoji: "🎯",
    options: [
      { value: "diario",    label: "Mi café de cada día",   desc: "Consistente, confiable" },
      { value: "especial",  label: "Un momento especial",   desc: "Quiero lo mejor" },
      { value: "regalo",    label: "Es un regalo",          desc: "Para impresionar" },
      { value: "explorar",  label: "Quiero explorar",       desc: "Nunca he probado especialidad" },
    ],
  },
];

// ── COMPONENTE PRINCIPAL ───────────────────────────────────────────
export function BaristaClient() {
  const [step, setStep]         = useState<Step>("quiz");
  const [quizStep, setQuizStep] = useState(0);
  const [answers, setAnswers]   = useState<Partial<QuizAnswer>>({});
  const [recommended, setRecommended] = useState<ProductSlug | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput]       = useState("");
  const [loading, setLoading]   = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function selectOption(key: keyof QuizAnswer, value: string) {
    const newAnswers = { ...answers, [key]: value } as QuizAnswer;
    setAnswers(newAnswers);

    if (quizStep < QUIZ.length - 1) {
      setQuizStep(q => q + 1);
    } else {
      // Quiz completo → generar recomendación
      const rec = recommend(newAnswers as QuizAnswer);
      setRecommended(rec);
      setStep("result");
      // Mensaje inicial del barista
      const p = PRODUCTS[rec];
      setMessages([{
        role: "assistant",
        content: `¡Perfecto! Basándome en tus preferencias, tu café ideal es el **${p.name}** con ${p.sca} puntos SCA.\n\nEs un café de origen único del Huila, con notas de ${p.notes.join(", ")}. Para tu cafetera, te recomiendo molerlo en **${p.brewers[0]}** — ahí es donde mejor expresa su carácter.\n\n¿Quieres que te cuente cómo prepararlo exactamente, o tienes alguna pregunta sobre el pedido?`
      }]);
    }
  }

  async function sendMessage(userMsg?: string) {
    const text = userMsg || input.trim();
    if (!text || loading || !recommended) return;
    setInput("");

    const newMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await fetch("/api/barista", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: buildSystemPrompt(recommended, answers as QuizAnswer),
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        console.error("API error:", response.status, errData);
        throw new Error(`HTTP ${response.status}: ${errData.error || "unknown"}`);
      }

      const data = await response.json();
      const reply = data.text || "Lo siento, hubo un problema. Escríbenos por WhatsApp al +57 300 123 4567.";

      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error("Barista chat error:", err);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Lo siento, tuve un problema técnico. Escríbenos por WhatsApp al +57 300 123 4567 y te ayudamos de inmediato."
      }]);
    } finally {
      setLoading(false);
    }
  }

  function resetQuiz() {
    setStep("quiz");
    setQuizStep(0);
    setAnswers({});
    setRecommended(null);
    setMessages([]);
    setInput("");
  }

  const currentQ = QUIZ[quizStep];
  const product  = recommended ? PRODUCTS[recommended] : null;

  return (
    <div className="min-h-screen bg-white-warm">

      {/* ── HERO HEADER ── */}
      <div className="bg-ink-2 px-6 md:px-20 py-16 text-center">
        <div className="text-4xl mb-4" aria-hidden="true">☕</div>
        <h1 className="font-display font-normal text-cream mb-3" style={{ fontSize: "clamp(28px,4vw,48px)" }}>
          Barista <em className="italic text-gold-light">IA</em>
        </h1>
        <p className="text-[14px] font-light text-cream/50 max-w-[480px] mx-auto">
          3 preguntas. Tu café ideal. Preparación perfecta para tu cafetera.
        </p>
      </div>

      <div className="max-w-[720px] mx-auto px-5 py-12">

        {/* ── QUIZ ── */}
        {step === "quiz" && (
          <div>
            {/* Progress */}
            <div className="flex items-center gap-2 mb-10 justify-center">
              {QUIZ.map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold transition-all"
                    style={{
                      background: i <= quizStep ? "#C8A84A" : "transparent",
                      border: `1.5px solid ${i <= quizStep ? "#C8A84A" : "#E4D4B0"}`,
                      color: i <= quizStep ? "#0A0704" : "#9B6535",
                    }}
                  >
                    {i < quizStep ? "✓" : i + 1}
                  </div>
                  {i < QUIZ.length - 1 && (
                    <div className="w-12 h-px" style={{ background: i < quizStep ? "#C8A84A" : "#E4D4B0" }} />
                  )}
                </div>
              ))}
            </div>

            {/* Pregunta */}
            <div className="text-center mb-8">
              <div className="text-4xl mb-4" aria-hidden="true">{currentQ.emoji}</div>
              <h2 className="font-display text-[28px] font-normal text-ink">{currentQ.question}</h2>
            </div>

            {/* Opciones */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQ.options.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => selectOption(currentQ.key, opt.value)}
                  className="text-left p-5 border border-cream-3 bg-white-warm hover:border-gold hover:bg-cream transition-all group active:scale-[0.98]"
                >
                  <div className="font-display text-lg font-medium text-ink mb-1 group-hover:text-gold transition-colors">
                    {opt.label}
                  </div>
                  <div className="text-[12px] text-brown-light font-light">{opt.desc}</div>
                </button>
              ))}
            </div>

            {quizStep > 0 && (
              <button
                onClick={() => setQuizStep(q => q - 1)}
                className="mt-6 text-[11px] text-brown-light hover:text-gold transition-colors mx-auto block"
              >
                ← Volver
              </button>
            )}
          </div>
        )}

        {/* ── RESULTADO + CHAT ── */}
        {(step === "result" || step === "chat") && product && recommended && (
          <div>
            {/* Card producto recomendado */}
            <div className="border border-cream-3 mb-8 overflow-hidden">
              <div className="h-1" style={{ background: product.accent }} />
              <div className="grid grid-cols-[140px_1fr] sm:grid-cols-[180px_1fr]">
                <div className="relative bg-cream-2" style={{ minHeight: "180px" }}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="180px"
                    className="object-contain p-2"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <p className="text-[10px] font-medium tracking-[0.2em] uppercase mb-1" style={{ color: product.accent }}>
                        Tu café ideal
                      </p>
                      <h2 className="font-display text-2xl font-medium text-ink">{product.name}</h2>
                      <p className="font-display text-[12px] italic text-brown-light mt-0.5">{product.subtitle}</p>
                    </div>
                    <div
                      className="w-12 h-12 rounded-full flex flex-col items-center justify-center shrink-0 border-2 border-white-warm"
                      style={{ background: product.accent }}
                    >
                      <span className="font-display text-base font-semibold leading-none text-ink">{product.sca}</span>
                      <span className="text-[6px] font-semibold tracking-[0.1em] text-ink/50">SCA</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {product.notes.map(n => (
                      <span key={n} className="px-2.5 py-1 border border-cream-3 bg-cream text-[11px] text-brown">{n}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xl text-ink">{product.price} <span className="text-[11px] text-brown-light font-body">/250g</span></span>
                    <Link
                      href={`/cafes/${product.slug}`}
                      className="px-5 py-2.5 text-[11px] font-semibold tracking-[0.14em] uppercase no-underline transition-colors"
                      style={{ background: product.accent, color: product.slug === "bourbon-rosado" ? "#0A0704" : "#FDFAF2" }}
                    >
                      Comprar →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Pairing */}
            <div className="flex items-start gap-3 px-5 py-4 bg-cream border border-cream-3 mb-8 text-sm text-brown-light">
              <span className="text-base shrink-0" aria-hidden="true">🍽️</span>
              <span><strong className="text-brown font-medium">Maridaje:</strong> {product.pairing}</span>
            </div>

            {/* CHAT */}
            <div className="border border-cream-3">
              {/* Header chat */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-cream-3 bg-ink-2">
                <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-base shrink-0" aria-hidden="true">☕</div>
                <div>
                  <div className="text-sm font-medium text-cream">Barista IA</div>
                  <div className="text-[11px] text-cream/40">Pregúntame lo que quieras</div>
                </div>
                <button onClick={resetQuiz} className="ml-auto text-[11px] text-cream/30 hover:text-cream/60 transition-colors">
                  Volver al quiz
                </button>
              </div>

              {/* Mensajes */}
              <div className="px-5 py-5 space-y-4 max-h-[420px] overflow-y-auto">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-3`}>
                    {msg.role === "assistant" && (
                      <div className="w-7 h-7 rounded-full bg-gold flex items-center justify-center text-sm shrink-0 mt-0.5" aria-hidden="true">☕</div>
                    )}
                    <div
                      className={`max-w-[85%] px-4 py-3 text-[13.5px] font-light leading-[1.75] rounded-sm ${
                        msg.role === "user"
                          ? "bg-ink text-cream"
                          : "bg-cream border border-cream-3 text-ink"
                      }`}
                      style={{ whiteSpace: "pre-wrap" }}
                    >
                      {msg.content.replace(/\*\*(.*?)\*\*/g, "$1")}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex gap-3">
                    <div className="w-7 h-7 rounded-full bg-gold flex items-center justify-center text-sm shrink-0" aria-hidden="true">☕</div>
                    <div className="px-4 py-3 bg-cream border border-cream-3 text-brown-light text-[13px]">
                      <span className="animate-pulse">Escribiendo...</span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Quick replies */}
              <div className="px-5 py-3 border-t border-cream-3 flex flex-wrap gap-2">
                {[
                  "¿Cómo lo preparo en V60?",
                  "¿Cuánto tarda el envío?",
                  "¿Cuál es la diferencia con los otros?",
                  "¿Tienen suscripción?",
                ].map(q => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    disabled={loading}
                    className="px-3 py-1.5 border border-cream-3 text-[11px] text-brown hover:border-gold hover:text-gold transition-colors disabled:opacity-40 bg-white-warm"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="px-5 py-4 border-t border-cream-3 flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()}
                  placeholder="Pregúntame cualquier cosa sobre el café..."
                  disabled={loading}
                  className="flex-1 px-4 py-3 border border-cream-3 text-sm outline-none focus:border-gold bg-white-warm text-ink placeholder:text-brown-light/50 disabled:opacity-60"
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={loading || !input.trim()}
                  className="px-5 py-3 bg-gold text-ink text-[11px] font-semibold tracking-[0.14em] uppercase hover:bg-gold-light transition-colors disabled:opacity-40"
                >
                  Enviar
                </button>
              </div>
            </div>

            {/* Links otros productos */}
            <div className="mt-8 pt-8 border-t border-cream-3">
              <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-brown-light mb-4">También podría gustarte</p>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(PRODUCTS)
                  .filter(([slug]) => slug !== recommended)
                  .map(([slug, p]) => (
                    <Link
                      key={slug}
                      href={`/cafes/${slug}`}
                      className="flex items-center gap-3 p-4 border border-cream-3 hover:border-gold hover:bg-cream transition-all no-underline group"
                    >
                      <div className="w-2 h-8 rounded-full shrink-0" style={{ background: p.accent }} />
                      <div>
                        <div className="text-[13px] font-medium text-ink group-hover:text-gold transition-colors">{p.name}</div>
                        <div className="text-[11px] text-brown-light">{p.sca} pts SCA · {p.price}</div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
