import { NextRequest, NextResponse } from "next/server";

// ── RESPUESTAS PREDEFINIDAS DEMO ──────────────────────────────────
// Se usan cuando no hay créditos en la API o como fallback
const DEMO_RESPONSES: Record<string, string> = {
  default: "¡Buena pregunta! Para darte la mejor respuesta personalizada, escríbenos por WhatsApp al +57 300 123 4567 — nuestro equipo te responde en minutos.",
  v60: "Para el V60 con el Bourbon Rosado usa 15g de café molido medio-grueso, 250ml de agua a 92°C. Vierte en círculos lentos durante 3:30 minutos. El resultado: una taza brillante con todas las notas florales y frutales que caracterizan este café de 92 puntos SCA.",
  preparar: "Para el V60 con el Bourbon Rosado usa 15g de café molido medio-grueso, 250ml de agua a 92°C. Vierte en círculos lentos durante 3:30 minutos. El resultado: una taza brillante con todas las notas florales y frutales que caracterizan este café de 92 puntos SCA.",
  espresso: "En espresso usa 18g de café molido fino, extrae 36ml en 28-32 segundos a 9 bar. El Bourbon Rosado produce una crema densa con notas dulces de panela y un retrogusto floral inigualable.",
  envio: "Despachamos en 24-48 horas hábiles desde Bogotá. Bogotá y alrededores: 1-2 días. Resto del país: 3-5 días hábiles. Recibirás el número de guía por WhatsApp al momento del despacho. Envío gratis en compras superiores a $80.000.",
  diferencia: "Cada café tiene su propia identidad:\n\n🥇 Bourbon Rosado (92 pts) — El más exclusivo. Notas florales y frutales únicas. Proceso natural. Ideal para filtro.\n\n🖤 Variedad Colombia (89 pts) — Equilibrado y cítrico. Proceso honey. Versátil para cualquier método.\n\n🔴 Blend (85 pts) — El más consistente. Chocolate y caramelo. Perfecto para espresso diario.",
  suscripcion: "Próximamente lanzamos nuestro plan de suscripción mensual con 10% de descuento permanente y despacho automático. ¡Déjanos tu WhatsApp y serás el primero en enterarte!",
  precio: "Bourbon Rosado: $52.000 / 250g · $78.000 / 454g · $98.000 / 500g\nVariedad Colombia: $44.000 / 250g · $66.000 / 454g · $82.000 / 500g\nBlend: $36.000 / 250g · $54.000 / 454g · $68.000 / 500g\n\nEnvío gratis en pedidos superiores a $80.000.",
  maridaje: "El Bourbon Rosado marida perfecto con frutas frescas, chocolate blanco y queso brie. La Variedad Colombia con croissant y frutas cítricas. El Blend con chocolate negro, nueces y galletas.",
  sca: "SCA son las siglas de la Specialty Coffee Association — la organización internacional que certifica la calidad del café. La escala va de 0 a 100. Un café con 80+ puntos es considerado de especialidad. Con 85+ es excelente. Con 90+ es excepcional. Nuestro Bourbon Rosado con 92 puntos está entre los mejores del mundo.",
  pedido: "Para consultar el estado de tu pedido escríbenos por WhatsApp al +57 300 123 4567 con tu número de orden y te informamos en minutos.",
  huila: "El Huila es el departamento cafetero más premiado de Colombia. Santa María, donde cultivamos nuestros cafés, está a 2.000 metros sobre el nivel del mar entre el Macizo Colombiano y el río Magdalena. Esa altitud extrema, las noches frías y los suelos volcánicos crean condiciones únicas para el café de especialidad.",
};

function findResponse(message: string): string {
  const msg = message.toLowerCase();
  if (msg.includes("v60") || msg.includes("chemex") || msg.includes("filtro")) return DEMO_RESPONSES.v60;
  if (msg.includes("prepar") || msg.includes("brew") || msg.includes("hacer")) return DEMO_RESPONSES.preparar;
  if (msg.includes("espresso") || msg.includes("máquina") || msg.includes("cafetera")) return DEMO_RESPONSES.espresso;
  if (msg.includes("envío") || msg.includes("envio") || msg.includes("llega") || msg.includes("demora") || msg.includes("tarda")) return DEMO_RESPONSES.envio;
  if (msg.includes("diferencia") || msg.includes("mejor") || msg.includes("cuál") || msg.includes("cual")) return DEMO_RESPONSES.diferencia;
  if (msg.includes("suscri") || msg.includes("mensual") || msg.includes("plan")) return DEMO_RESPONSES.suscripcion;
  if (msg.includes("precio") || msg.includes("cuesta") || msg.includes("valor") || msg.includes("\$")) return DEMO_RESPONSES.precio;
  if (msg.includes("maridaj") || msg.includes("comida") || msg.includes("acompaña")) return DEMO_RESPONSES.maridaje;
  if (msg.includes("sca") || msg.includes("puntos") || msg.includes("puntaje") || msg.includes("calidad")) return DEMO_RESPONSES.sca;
  if (msg.includes("pedido") || msg.includes("orden") || msg.includes("compra") || msg.includes("estado")) return DEMO_RESPONSES.pedido;
  if (msg.includes("huila") || msg.includes("origen") || msg.includes("colombia") || msg.includes("santa maría")) return DEMO_RESPONSES.huila;
  return DEMO_RESPONSES.default;
}

export async function POST(req: NextRequest) {
  try {
    const { messages, system } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "messages requerido" }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;

    // Intentar con API real si hay key con créditos
    if (apiKey) {
      try {
        let filteredMessages = messages;
        if (filteredMessages.length > 0 && filteredMessages[0].role === "assistant") {
          filteredMessages = filteredMessages.slice(1);
        }
        if (filteredMessages.length === 0 || filteredMessages[0].role !== "user") {
          filteredMessages = [{ role: "user", content: "Hola" }, ...filteredMessages];
        }

        const response = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01",
          },
          body: JSON.stringify({
            model: "claude-sonnet-4-6",
            max_tokens: 1000,
            system,
            messages: filteredMessages,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const text = data.content?.[0]?.text ?? "";
          return NextResponse.json({ text });
        }

        // Si falla (sin créditos, etc.), caer al modo demo
        const errText = await response.text();
        console.log("API no disponible, usando modo demo:", errText.slice(0, 100));
      } catch (err) {
        console.log("Error API, usando modo demo:", err);
      }
    }

    // MODO DEMO — respuestas predefinidas inteligentes
    const lastUserMessage = [...messages].reverse().find(m => m.role === "user")?.content || "";
    const demoReply = findResponse(lastUserMessage);

    // Simular delay natural
    await new Promise(r => setTimeout(r, 600));

    return NextResponse.json({ text: demoReply });

  } catch (err) {
    console.error("Barista API error:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
