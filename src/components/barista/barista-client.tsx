"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ProductSlug, QuizAnswer, Message,
  PRODUCTS, QUIZ_STEPS,
  recommend, buildSystemPrompt
} from "./barista-data";

export function BaristaClient() {
  const [quizStep, setQuizStep] = useState(0);
  const [answers, setAnswers]   = useState<Partial<QuizAnswer>>({});
  const [recommended, setRecommended] = useState<ProductSlug | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput]       = useState("");
  const [loading, setLoading]   = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleAnswer(key: string, value: string) {
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);
    if (quizStep < QUIZ_STEPS.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      const finalAnswers = newAnswers as QuizAnswer;
      const rec = recommend(finalAnswers);
      setRecommended(rec);
      const product = PRODUCTS[rec];
      setMessages([{
        role: "assistant",
        content: `Basándome en tus respuestas, te recomiendo el ${product.name} (${product.sca} pts SCA). Con notas de ${product.notes.join(", ")}, es exactamente lo que encaja con lo que describes. ¿Tienes alguna pregunta sobre este café o quieres explorar otras opciones?`,
      }]);
    }
  }

  async function sendMessage() {
    if (!input.trim() || !recommended) return;
    const userMsg: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/barista", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          system: buildSystemPrompt(recommended, answers as QuizAnswer),
        }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, {
        role: "assistant",
        content: data.content || "No pude procesar tu mensaje. Intenta de nuevo."
      }]);
    } catch {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Hubo un error técnico. Intenta de nuevo."
      }]);
    } finally {
      setLoading(false);
    }
  }

  const product = recommended ? PRODUCTS[recommended] : null;
  const currentQuiz = QUIZ_STEPS[quizStep];

  return (
    <div className="min-h-screen bg-cream py-16 px-4">
      <div className="max-w-[640px] mx-auto">

        <div className="text-center mb-12">
          <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-gold mb-3">Barista IA</p>
          <h1 className="font-display text-[clamp(28px,5vw,44px)] font-light text-ink mb-3">
            Tu asesor de café personal
          </h1>
          <p className="text-[14px] font-light text-brown-light">
            Responde tres preguntas y te recomiendo el café ideal para ti.
          </p>
        </div>

        {!recommended && (
          <div className="bg-white-warm border border-cream-3 p-8 md:p-10">
            <div className="flex items-center gap-1.5 mb-8">
              {QUIZ_STEPS.map((_, i) => (
                <div key={i} className="h-0.5 flex-1 transition-colors duration-300"
                  style={{ background: i <= quizStep ? "#C8A84A" : "#E4D4B0" }} />
              ))}
            </div>
            <p className="font-display text-[10px] italic text-brown-light mb-2">
              Pregunta {quizStep + 1} de {QUIZ_STEPS.length}
            </p>
            <h2 className="font-display text-[22px] font-light text-ink mb-6">
              {currentQuiz.question}
            </h2>
            <div className="space-y-2.5">
              {currentQuiz.options.map(opt => (
                <button key={opt.value}
                  onClick={() => handleAnswer(currentQuiz.key, opt.value)}
                  className="w-full text-left px-5 py-4 border border-cream-3 bg-cream hover:border-gold hover:bg-white-warm transition-all group">
                  <div className="font-medium text-[13px] text-ink">{opt.label}</div>
                  <div className="text-[11px] text-brown-light mt-0.5">{opt.sub}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {recommended && product && (
          <div className="space-y-6">
            <div className="bg-white-warm border border-cream-3 overflow-hidden">
              <div className="h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${product.accent}, transparent)` }} />
              <div className="flex items-center gap-5 p-6">
                <div className="relative w-20 h-20 shrink-0 overflow-hidden rounded-sm"
                  style={{ background: product.accent === "#C8A84A" ? "#F0E4C0" : "#1A0808" }}>
                  <Image src={product.image} alt={product.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-[9px] font-semibold tracking-[0.2em] uppercase mb-1" style={{ color: product.accent }}>
                    Recomendado para ti
                  </p>
                  <h3 className="font-display text-[20px] font-medium text-ink">{product.name}</h3>
                  <p className="text-[11px] text-brown-light mt-0.5">{product.subtitle}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-[11px] font-semibold" style={{ color: product.accent }}>{product.sca} pts SCA</span>
                    <span className="text-brown-light text-[10px]">·</span>
                    <span className="text-[12px] font-semibold text-ink">Desde {product.price}</span>
                  </div>
                </div>
              </div>
              <div className="px-6 pb-5 border-t border-cream-3 pt-4 flex gap-3">
                <Link href={`/cafes/${product.slug}`}
                  className="flex-1 text-center py-2.5 bg-ink text-cream text-[11px] font-semibold tracking-[0.16em] uppercase no-underline hover:bg-ink/90 transition-colors">
                  Ver producto
                </Link>
                <button onClick={() => { setRecommended(null); setQuizStep(0); setAnswers({}); setMessages([]); }}
                  className="px-4 py-2.5 border border-cream-3 text-brown text-[11px] font-medium hover:border-gold transition-colors">
                  Volver
                </button>
              </div>
            </div>

            <div className="bg-white-warm border border-cream-3">
              <div className="px-6 py-4 border-b border-cream-3">
                <p className="text-[11px] font-semibold text-ink">Pregúntame lo que quieras</p>
                <p className="text-[10px] text-brown-light mt-0.5">Sobre preparación, envíos, otras variedades</p>
              </div>
              <div className="h-[280px] overflow-y-auto px-6 py-4 space-y-4">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] px-4 py-3 text-[13px] leading-[1.65] ${
                      msg.role === "user" ? "bg-ink text-cream" : "bg-cream border border-cream-3 text-brown"
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-cream border border-cream-3 px-4 py-3 flex gap-1">
                      {[0,1,2].map(i => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-brown-light animate-bounce"
                          style={{ animationDelay: `${i * 0.15}s` }} />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              <div className="px-4 py-4 border-t border-cream-3 flex gap-2">
                <input type="text" value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()}
                  placeholder="Escribe tu pregunta..."
                  className="flex-1 px-4 py-2.5 border border-cream-3 bg-cream text-[13px] outline-none focus:border-gold placeholder:text-brown-light/50"
                />
                <button onClick={sendMessage} disabled={loading || !input.trim()}
                  className="px-5 py-2.5 bg-gold text-ink text-[11px] font-semibold uppercase tracking-wide disabled:opacity-40 hover:bg-gold-light transition-colors">
                  Enviar
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
