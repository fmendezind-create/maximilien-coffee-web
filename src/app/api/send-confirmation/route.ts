import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, name, reference, amount, items } = await req.json();
    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) return NextResponse.json({ error: "Sin API key" }, { status: 500 });

    const firstName = (name || "Cliente").split(" ")[0];
    const formattedAmount = "$" + (amount || 0).toLocaleString("es-CO");

    const itemsHtml = (items || []).map((item: any) => `
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid #F0E8D4;font-size:13px;color:#6B4020;">
          ${item.name} · ${item.weight}${item.grind && item.grind !== "Estándar" ? ` · ${item.grind}` : ""}
        </td>
        <td style="padding:8px 0;border-bottom:1px solid #F0E8D4;font-size:13px;color:#0A0704;text-align:right;font-weight:600;">
          ×${item.quantity} · $${(item.unit_price * item.quantity).toLocaleString("es-CO")}
        </td>
      </tr>`).join("");

    const html = `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#F4F0E8;font-family:'Helvetica Neue',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F4F0E8;padding:40px 0;">
<tr><td align="center"><table width="560" cellpadding="0" cellspacing="0" style="background:#FDFAF2;max-width:560px;width:100%;">
<tr><td style="background:#0A0704;padding:28px 40px;text-align:center;">
  <p style="margin:0;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#C8A84A;font-weight:600;">MAXIMILIEN COFFEE</p>
  <p style="margin:4px 0 0;font-size:10px;letter-spacing:3px;color:#C8A84A;opacity:.6;font-style:italic;">Alma de Café</p>
</td></tr>
<tr><td style="height:3px;background:linear-gradient(90deg,#A88030,#C8A84A,#A88030);"></td></tr>
<tr><td style="padding:40px 40px 36px;">
  <div style="text-align:center;margin-bottom:24px;"><div style="display:inline-block;width:60px;height:60px;border-radius:50%;border:2px solid #C8A84A;line-height:60px;font-size:26px;">☕</div></div>
  <h1 style="margin:0 0 8px;font-size:26px;font-weight:300;color:#0A0704;text-align:center;">¡Pedido <em style="color:#C8A84A;">confirmado</em>!</h1>
  <p style="margin:0 0 28px;font-size:14px;color:#9B6535;text-align:center;line-height:1.7;">Hola ${firstName}, tu pago fue procesado exitosamente.<br/>Pronto despachamos tu café recién tostado.</p>
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF4E6;border:1px solid #E4D4B0;margin-bottom:24px;">
    <tr><td style="padding:14px 20px;border-bottom:1px solid #E4D4B0;">
      <p style="margin:0 0 2px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#9B6535;">Número de pedido</p>
      <p style="margin:0;font-size:15px;font-weight:600;color:#0A0704;">#${reference}</p>
    </td></tr>
    ${itemsHtml ? `<tr><td style="padding:14px 20px;border-bottom:1px solid #E4D4B0;"><table width="100%">${itemsHtml}</table></td></tr>` : ""}
    <tr><td style="padding:14px 20px;">
      <table width="100%"><tr>
        <td style="font-size:13px;font-weight:600;color:#0A0704;">Total pagado</td>
        <td align="right" style="font-size:17px;font-weight:700;color:#0A0704;">${formattedAmount}</td>
      </tr></table>
    </td></tr>
  </table>
  <table width="100%" style="margin-bottom:24px;">
    <tr><td style="padding:10px 0;border-bottom:1px solid #F0E8D4;"><table><tr><td style="font-size:18px;padding-right:12px;">🔥</td><td><p style="margin:0 0 2px;font-size:13px;font-weight:600;color:#0A0704;">Tostamos tu café</p><p style="margin:0;font-size:12px;color:#9B6535;">Cada lote se tuesta fresco. Sale en máximo 48 horas.</p></td></tr></table></td></tr>
    <tr><td style="padding:10px 0;border-bottom:1px solid #F0E8D4;"><table><tr><td style="font-size:18px;padding-right:12px;">📦</td><td><p style="margin:0 0 2px;font-size:13px;font-weight:600;color:#0A0704;">Despachamos</p><p style="margin:0;font-size:12px;color:#9B6535;">Recibirás el número de guía por WhatsApp al despachar.</p></td></tr></table></td></tr>
    <tr><td style="padding:10px 0;"><table><tr><td style="font-size:18px;padding-right:12px;">🚚</td><td><p style="margin:0 0 2px;font-size:13px;font-weight:600;color:#0A0704;">Entrega estimada</p><p style="margin:0;font-size:12px;color:#9B6535;">Bogotá: 1–2 días · Resto del país: 3–5 días hábiles.</p></td></tr></table></td></tr>
  </table>
  <!-- Mensaje de impacto -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0704;margin-bottom:24px;">
    <tr><td style="padding:28px 28px 24px;">
      <p style="margin:0 0 6px;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#C8A84A;font-weight:600;">Tu compra tiene un impacto real</p>
      <p style="margin:0 0 14px;font-size:15px;font-weight:300;color:#FDFAF2;line-height:1.75;">
        Este café viene directamente de las familias productoras de Santa María, Huila. Sin intermediarios. Sin cadenas de distribución. <strong style="color:#C8A84A;font-weight:500;">100% del precio justo llega al campo.</strong>
      </p>
      <p style="margin:0;font-size:13px;font-weight:300;color:#C8A84A;opacity:.8;line-height:1.7;">
        Cuando compras Maximilien Coffee, no solo estás eligiendo el mejor café de Colombia — estás eligiendo que el agricultor que lo cultivó reciba lo que merece.
      </p>
    </td></tr>
    <tr><td style="padding:0 28px 24px;">
      <div style="border-top:1px solid rgba(200,168,74,0.2);padding-top:16px;display:flex;">
        <table width="100%"><tr>
          <td style="width:33%;text-align:center;padding:0 8px;">
            <p style="margin:0 0 4px;font-size:18px;">🌱</p>
            <p style="margin:0;font-size:10px;letter-spacing:1px;text-transform:uppercase;color:#C8A84A;opacity:.7;">Compra directa</p>
          </td>
          <td style="width:33%;text-align:center;padding:0 8px;border-left:1px solid rgba(200,168,74,0.15);border-right:1px solid rgba(200,168,74,0.15);">
            <p style="margin:0 0 4px;font-size:18px;">🏔️</p>
            <p style="margin:0;font-size:10px;letter-spacing:1px;text-transform:uppercase;color:#C8A84A;opacity:.7;">Origen único</p>
          </td>
          <td style="width:33%;text-align:center;padding:0 8px;">
            <p style="margin:0 0 4px;font-size:18px;">🤝</p>
            <p style="margin:0;font-size:10px;letter-spacing:1px;text-transform:uppercase;color:#C8A84A;opacity:.7;">Precio justo</p>
          </td>
        </tr></table>
      </td></tr>
  </table>

  <div style="text-align:center;margin-bottom:24px;"><a href="https://maximiliencoffee.com/cafes" style="display:inline-block;background:#C8A84A;color:#0A0704;padding:13px 32px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;text-decoration:none;">Ver más cafés</a></div>
  <div style="background:#F0F9F0;border:1px solid #C8E6C9;padding:14px 20px;text-align:center;">
    <p style="margin:0;font-size:13px;color:#2E7D32;">¿Preguntas? <a href="https://wa.me/573001234567" style="color:#2E7D32;font-weight:600;">Escríbenos por WhatsApp</a></p>
  </div>
</td></tr>
<tr><td style="background:#0A0704;padding:20px 40px;text-align:center;">
  <p style="margin:0;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#C8A84A;opacity:.7;">MAXIMILIEN COFFEE · Alma de Café</p>
  <p style="margin:4px 0 0;font-size:10px;color:#C8A84A;opacity:.3;">maximiliencoffee.com</p>
</td></tr>
</table></td></tr></table></body></html>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendKey}` },
      body: JSON.stringify({
        from: "Maximilien Coffee <noreply@maximiliencoffee.com>",
        to: [email],
        subject: `✓ Pedido confirmado #${reference} — Maximilien Coffee`,
        html,
      }),
    });

    if (!res.ok) {
      console.error("Resend error:", await res.text());
      return NextResponse.json({ error: "Error enviando email" }, { status: 502 });
    }

    console.log("✅ Email enviado a:", email);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
