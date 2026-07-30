import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, name, reference, items, total, trackingNumber, city } = await req.json();

    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) return NextResponse.json({ error: "Sin API key" }, { status: 500 });

    const firstName = (name || "Cliente").split(" ")[0];
    const formattedTotal = "$" + (total || 0).toLocaleString("es-CO");

    const itemsHtml = (items || []).map((item: any) => `
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid #F0E8D4;font-size:13px;color:#6B4020;">
          ${item.name} · ${item.weight}${item.grind && item.grind !== "Estándar" ? ` · ${item.grind}` : ""}
        </td>
        <td style="padding:8px 0;border-bottom:1px solid #F0E8D4;font-size:13px;color:#0A0704;text-align:right;font-weight:600;">
          ×${item.quantity}
        </td>
      </tr>`).join("");

    const html = `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#F4F0E8;font-family:'Helvetica Neue',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F4F0E8;padding:40px 0;">
<tr><td align="center"><table width="560" cellpadding="0" cellspacing="0" style="background:#FDFAF2;max-width:560px;width:100%;">

  <!-- Header -->
  <tr><td style="background:#0A0704;padding:28px 40px;text-align:center;">
    <p style="margin:0;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#C8A84A;font-weight:600;">MAXIMILIEN COFFEE</p>
    <p style="margin:4px 0 0;font-size:10px;letter-spacing:3px;color:#C8A84A;opacity:.6;font-style:italic;">Alma de Café</p>
  </td></tr>
  <tr><td style="height:3px;background:linear-gradient(90deg,#A88030,#C8A84A,#A88030);"></td></tr>

  <!-- Cuerpo -->
  <tr><td style="padding:40px 40px 36px;">

    <div style="text-align:center;margin-bottom:24px;">
      <div style="display:inline-block;width:60px;height:60px;border-radius:50%;border:2px solid #C8A84A;line-height:60px;font-size:26px;">🚚</div>
    </div>

    <h1 style="margin:0 0 8px;font-size:26px;font-weight:300;color:#0A0704;text-align:center;">
      ¡Tu café va <em style="color:#C8A84A;">en camino</em>!
    </h1>
    <p style="margin:0 0 28px;font-size:14px;color:#9B6535;text-align:center;line-height:1.7;">
      Hola ${firstName}, tu pedido fue despachado hoy.<br/>
      Tostado fresco directo del origen a tu puerta.
    </p>

    <!-- Info pedido -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF4E6;border:1px solid #E4D4B0;margin-bottom:24px;">
      <tr><td style="padding:14px 20px;border-bottom:1px solid #E4D4B0;">
        <p style="margin:0 0 2px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#9B6535;">Número de pedido</p>
        <p style="margin:0;font-size:15px;font-weight:600;color:#0A0704;">#${reference}</p>
      </td></tr>
      ${itemsHtml ? `<tr><td style="padding:14px 20px;border-bottom:1px solid #E4D4B0;"><table width="100%">${itemsHtml}</table></td></tr>` : ""}
      <tr><td style="padding:14px 20px;border-bottom:1px solid #E4D4B0;">
        <table width="100%"><tr>
          <td style="font-size:13px;color:#9B6535;">Total pagado</td>
          <td align="right" style="font-size:15px;font-weight:600;color:#0A0704;">${formattedTotal}</td>
        </tr></table>
      </td></tr>
      <tr><td style="padding:14px 20px;border-bottom:1px solid #E4D4B0;">
        <table width="100%"><tr>
          <td style="font-size:13px;color:#9B6535;">Ciudad de entrega</td>
          <td align="right" style="font-size:13px;color:#0A0704;">${city || "Colombia"}</td>
        </tr></table>
      </td></tr>
      ${trackingNumber ? `
      <tr><td style="padding:14px 20px;background:#0A0704;">
        <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#C8A84A;">Número de guía</p>
        <p style="margin:0;font-size:18px;font-weight:700;color:#E8C870;letter-spacing:1px;">${trackingNumber}</p>
        <p style="margin:4px 0 0;font-size:11px;color:#C8A84A;opacity:.6;">Rastrea tu pedido en coordinadora.com.co</p>
      </td></tr>` : ""}
    </table>

    <!-- Tiempos de entrega -->
    <table width="100%" style="margin-bottom:24px;">
      <tr><td style="padding:10px 0;border-bottom:1px solid #F0E8D4;">
        <table><tr>
          <td style="font-size:18px;padding-right:12px;">📍</td>
          <td>
            <p style="margin:0 0 2px;font-size:13px;font-weight:600;color:#0A0704;">Tiempo estimado de entrega</p>
            <p style="margin:0;font-size:12px;color:#9B6535;">Bogotá: 1–2 días hábiles · Resto del país: 3–5 días hábiles</p>
          </td>
        </tr></table>
      </td></tr>
      <tr><td style="padding:10px 0;">
        <table><tr>
          <td style="font-size:18px;padding-right:12px;">💬</td>
          <td>
            <p style="margin:0 0 2px;font-size:13px;font-weight:600;color:#0A0704;">¿Alguna pregunta?</p>
            <p style="margin:0;font-size:12px;color:#9B6535;">Escríbenos por <a href="https://wa.me/573001234567" style="color:#2E7D32;font-weight:600;">WhatsApp</a> y te respondemos en minutos.</p>
          </td>
        </tr></table>
      </td></tr>
    </table>

    <!-- Mensaje impacto -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0704;margin-bottom:24px;">
      <tr><td style="padding:24px 24px 20px;">
        <p style="margin:0 0 8px;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#C8A84A;font-weight:600;">Tu compra tiene un impacto real</p>
        <p style="margin:0;font-size:13px;font-weight:300;color:#FDFAF2;line-height:1.75;">
          Este café viene directamente de las familias de Santa María, Huila. Sin intermediarios. <strong style="color:#C8A84A;">100% del precio justo llega al campo.</strong>
        </p>
      </td></tr>
    </table>

    <!-- CTA -->
    <div style="text-align:center;">
      <a href="https://maximiliencoffee.com/cafes" style="display:inline-block;background:#C8A84A;color:#0A0704;padding:13px 32px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;text-decoration:none;">
        Ver más cafés
      </a>
    </div>

  </td></tr>

  <!-- Footer -->
  <tr><td style="background:#0A0704;padding:20px 40px;text-align:center;">
    <p style="margin:0;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#C8A84A;opacity:.7;">MAXIMILIEN COFFEE · Alma de Café</p>
    <p style="margin:4px 0 0;font-size:10px;color:#C8A84A;opacity:.3;">maximiliencoffee.com</p>
  </td></tr>

</table></td></tr></table></body></html>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: "Maximilien Coffee <noreply@mail.maximiliencoffee.com>",
        to: [email],
        subject: `🚚 Tu pedido #${reference} va en camino — Maximilien Coffee`,
        html,
      }),
    });

    if (!res.ok) {
      console.error("Resend error:", await res.text());
      return NextResponse.json({ error: "Error enviando email" }, { status: 502 });
    }

    console.log("✅ Email de despacho enviado a:", email);
    return NextResponse.json({ ok: true });

  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
