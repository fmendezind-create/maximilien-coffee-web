import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const adminKey = req.nextUrl.searchParams.get("key");
  if (adminKey !== process.env.ADMIN_KEY) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const email = req.nextUrl.searchParams.get("email");
  if (!email) {
    return NextResponse.json({ error: "Email requerido" }, { status: 400 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    return NextResponse.json({ error: "Sin API key" }, { status: 500 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${resendKey}`,
    },
    body: JSON.stringify({
      from: "Maximilien Coffee <noreply@maximiliencoffee.com>",
      to: [email],
      subject: "✓ Test email — Maximilien Coffee",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;padding:40px;background:#FDFAF2;">
          <div style="background:#0A0704;padding:24px;text-align:center;margin-bottom:24px;">
            <p style="color:#C8A84A;font-size:11px;letter-spacing:4px;text-transform:uppercase;margin:0;">MAXIMILIEN COFFEE</p>
            <p style="color:#C8A84A;font-size:10px;font-style:italic;opacity:.6;margin:4px 0 0;">Alma de Café</p>
          </div>
          <h2 style="color:#0A0704;font-weight:300;">¡El email funciona! ✅</h2>
          <p style="color:#9B6535;line-height:1.7;">
            Este es un email de prueba de Maximilien Coffee.<br/>
            El sistema de confirmación de pedidos está funcionando correctamente.
          </p>
          <p style="color:#C8A84A;font-size:12px;margin-top:24px;">maximiliencoffee.com ☕</p>
        </div>
      `,
    }),
  });

  const data = await res.json();
  
  if (!res.ok) {
    return NextResponse.json({ error: data }, { status: 502 });
  }

  return NextResponse.json({ ok: true, message: `Email enviado a ${email}` });
}
