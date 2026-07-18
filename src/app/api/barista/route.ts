import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { messages, system } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "messages requerido" }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key no configurada" },
        { status: 500 }
      );
    }

    // Anthropic requiere que los mensajes empiecen con role: "user"
    // Filtramos el primer mensaje si es "assistant" (el mensaje inicial del quiz)
    let filteredMessages = messages;
    if (filteredMessages.length > 0 && filteredMessages[0].role === "assistant") {
      filteredMessages = filteredMessages.slice(1);
    }
    // Si después del filtro no hay mensajes de usuario, añadimos uno
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

    if (!response.ok) {
      const err = await response.text();
      console.error("Anthropic error:", err);
      return NextResponse.json({ error: "Error de IA" }, { status: 502 });
    }

    const data = await response.json();
    const text = data.content?.[0]?.text ?? "";

    return NextResponse.json({ text });

  } catch (err) {
    console.error("Barista API error:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
