import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const { reference, amountInCents, currency } = await req.json();

    if (!reference || !amountInCents || !currency) {
      return NextResponse.json({ error: "Parámetros requeridos" }, { status: 400 });
    }

    const integrityKey = process.env.WOMPI_INTEGRITY_KEY;
    if (!integrityKey) {
      return NextResponse.json({ error: "Integrity key no configurada" }, { status: 500 });
    }

    // Fórmula oficial de Wompi:
    // SHA256(reference + amountInCents + currency + integrityKey)
    const rawSignature = `${reference}${amountInCents}${currency}${integrityKey}`;
    const signature = crypto
      .createHash("sha256")
      .update(rawSignature)
      .digest("hex");

    return NextResponse.json({ signature });
  } catch (err) {
    console.error("Wompi signature error:", err);
    return NextResponse.json({ error: "Error generando firma" }, { status: 500 });
  }
}
