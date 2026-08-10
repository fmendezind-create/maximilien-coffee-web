import { NextRequest, NextResponse } from "next/server";

const BACKEND = "https://web-production-aa93f.up.railway.app";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    const res = await fetch(`${BACKEND}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("Error registrando pedido:", err);
    return NextResponse.json({ error: "Error registrando pedido" }, { status: 502 });
  }
}
