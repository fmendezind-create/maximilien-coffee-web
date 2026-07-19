import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// Verifica la firma del webhook de Wompi
function verifyWompiSignature(body: string, signature: string, secret: string): boolean {
  const hmac = crypto.createHmac("sha256", secret).update(body).digest("hex");
  return hmac === signature;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("x-event-checksum") ?? "";
    const secret = process.env.WOMPI_EVENTS_SECRET ?? "";

    // Verificar firma si hay secret configurado
    if (secret && !verifyWompiSignature(body, signature, secret)) {
      return NextResponse.json({ error: "Firma inválida" }, { status: 401 });
    }

    const event = JSON.parse(body);

    // Solo procesar transacciones aprobadas
    if (event?.event !== "transaction.updated") {
      return NextResponse.json({ ok: true });
    }

    const tx = event?.data?.transaction;
    if (!tx || tx.status !== "APPROVED") {
      return NextResponse.json({ ok: true });
    }

    // Extraer datos del pedido
    const email     = tx.customer_email ?? "";
    const name      = tx.customer_data?.full_name ?? "Cliente";
    const reference = tx.reference ?? "";
    const amount    = (tx.amount_in_cents ?? 0) / 100;
    const payMethod = tx.payment_method_type ?? "Tarjeta";

    if (email) {
      await sendConfirmationEmail({ email, name, reference, amount, payMethod });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

// ── EMAIL DE CONFIRMACIÓN ─────────────────────────────────────────
async function sendConfirmationEmail({
  email, name, reference, amount, payMethod,
}: {
  email: string; name: string; reference: string;
  amount: number; payMethod: string;
}) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.log("RESEND_API_KEY no configurada — email no enviado");
    return;
  }

  const firstName = name.split(" ")[0];
  const formattedAmount = "$" + amount.toLocaleString("es-CO");
  const formattedMethod = payMethod === "CARD" ? "Tarjeta" :
    payMethod === "NEQUI" ? "Nequi" :
    payMethod === "PSE"   ? "PSE"   :
    payMethod === "DAVIPLATA" ? "DaviPlata" : payMethod;

  const html = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Pedido confirmado — Maximilien Coffee</title>
</head>
<body style="margin:0;padding:0;background:#F4F0E8;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F4F0E8;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#FDFAF2;max-width:560px;width:100%;">

        <!-- Header dorado -->
        <tr>
          <td style="background:#0A0704;padding:32px 40px;text-align:center;">
            <p style="margin:0;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#C8A84A;font-weight:600;">
              MAXIMILIEN COFFEE
            </p>
            <p style="margin:4px 0 0;font-size:10px;letter-spacing:3px;color:#C8A84A;opacity:.6;font-style:italic;">
              Alma de Café
            </p>
          </td>
        </tr>

        <!-- Franja dorada -->
        <tr><td style="height:3px;background:linear-gradient(90deg,#A88030,#C8A84A,#A88030);"></td></tr>

        <!-- Cuerpo -->
        <tr>
          <td style="padding:48px 40px 40px;">

            <!-- Ícono check -->
            <div style="text-align:center;margin-bottom:28px;">
              <div style="display:inline-block;width:64px;height:64px;border-radius:50%;border:2px solid #C8A84A;line-height:64px;font-size:28px;">
                ☕
              </div>
            </div>

            <!-- Título -->
            <h1 style="margin:0 0 8px;font-size:28px;font-weight:300;color:#0A0704;text-align:center;letter-spacing:-0.5px;">
              ¡Pedido <em style="font-style:italic;color:#C8A84A;">confirmado</em>!
            </h1>
            <p style="margin:0 0 32px;font-size:14px;color:#9B6535;text-align:center;font-weight:300;line-height:1.7;">
              Hola ${firstName}, tu pago fue procesado exitosamente.<br/>
              Pronto despachamos tu café recién tostado.
            </p>

            <!-- Datos del pedido -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF4E6;border:1px solid #E4D4B0;margin-bottom:28px;">
              <tr>
                <td style="padding:20px 24px;border-bottom:1px solid #E4D4B0;">
                  <p style="margin:0 0 3px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#9B6535;">Número de pedido</p>
                  <p style="margin:0;font-size:16px;font-weight:600;color:#0A0704;">#${reference}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:16px 24px;border-bottom:1px solid #E4D4B0;">
                  <table width="100%">
                    <tr>
                      <td style="font-size:12px;color:#9B6535;">Total pagado</td>
                      <td align="right" style="font-size:18px;font-weight:600;color:#0A0704;">${formattedAmount}</td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding:16px 24px;">
                  <table width="100%">
                    <tr>
                      <td style="font-size:12px;color:#9B6535;">Método de pago</td>
                      <td align="right" style="font-size:13px;color:#0A0704;font-weight:500;">${formattedMethod}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Próximos pasos -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
              <tr><td style="padding-bottom:12px;">
                <p style="margin:0;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#9B6535;font-weight:600;">¿Qué sigue?</p>
              </td></tr>
              ${[
                ["🔥", "Tostamos tu café", "Cada lote se tuesta fresco. El tuyo sale en máximo 48 horas."],
                ["📦", "Despachamos", "Recibirás el número de guía por WhatsApp al momento del envío."],
                ["🚚", "Entrega estimada", "Bogotá: 1–2 días · Resto del país: 3–5 días hábiles."],
              ].map(([icon, title, desc]) => `
              <tr><td style="padding:10px 0;border-bottom:1px solid #F0E8D4;">
                <table><tr>
                  <td style="font-size:20px;padding-right:14px;vertical-align:top;">${icon}</td>
                  <td>
                    <p style="margin:0 0 2px;font-size:13px;font-weight:600;color:#0A0704;">${title}</p>
                    <p style="margin:0;font-size:12px;color:#9B6535;font-weight:300;">${desc}</p>
                  </td>
                </tr></table>
              </td></tr>`).join("")}
            </table>

            <!-- CTA -->
            <div style="text-align:center;margin-bottom:32px;">
              <a href="https://maximilien-coffee-web.vercel.app/cafes"
                style="display:inline-block;background:#C8A84A;color:#0A0704;padding:14px 36px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;text-decoration:none;">
                Ver más cafés
              </a>
            </div>

            <!-- WhatsApp -->
            <div style="background:#F0F9F0;border:1px solid #C8E6C9;padding:16px 20px;text-align:center;">
              <p style="margin:0;font-size:13px;color:#2E7D32;font-weight:300;">
                ¿Tienes alguna pregunta? Escríbenos por
                <a href="https://wa.me/573001234567" style="color:#2E7D32;font-weight:600;">WhatsApp</a>
              </p>
            </div>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#0A0704;padding:24px 40px;text-align:center;">
            <p style="margin:0 0 4px;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#C8A84A;opacity:.7;">
              MAXIMILIEN COFFEE · Alma de Café
            </p>
            <p style="margin:0;font-size:10px;color:#C8A84A;opacity:.3;">
              Santa María, Huila · Colombia
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${resendKey}`,
    },
    body: JSON.stringify({
      from: "Maximilien Coffee <onboarding@resend.dev>",
      to: [email],
      subject: `✓ Pedido confirmado #${reference} — Maximilien Coffee`,
      html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Resend error:", err);
  } else {
    console.log("Email enviado a:", email);
  }
}
