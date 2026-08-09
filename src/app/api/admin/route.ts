import { NextRequest, NextResponse } from "next/server";

const BACKEND = "https://web-production-aa93f.up.railway.app";

function getAdminKey(): string {
  return process.env.ADMIN_KEY || "mc-admin-2025";
}

function verifyAuth(req: NextRequest): boolean {
  // Soporta tanto header Authorization como query param (retrocompatibilidad)
  const authHeader = req.headers.get("authorization") || "";
  const keyFromHeader = authHeader.replace("Bearer ", "");
  const keyFromQuery = req.nextUrl.searchParams.get("key") || "";
  const adminKey = getAdminKey();
  return keyFromHeader === adminKey || keyFromQuery === adminKey;
}

export async function GET(req: NextRequest) {
  if (!verifyAuth(req)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const path = req.nextUrl.searchParams.get("path") || "stats";

  try {
    const res = await fetch(`${BACKEND}/admin/${path}`, {
      headers: { "X-Admin-Key": getAdminKey() },
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Error conectando al backend" }, { status: 502 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!verifyAuth(req)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const path = req.nextUrl.searchParams.get("path") || "";
  const body = await req.json();

  try {
    const res = await fetch(`${BACKEND}/admin/${path}`, {
      method: "PATCH",
      headers: { "X-Admin-Key": getAdminKey(), "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();

    // Email automático al despachar
    if (body.status === "shipped" && data.customer_email) {
      const items = typeof data.items === "string" ? JSON.parse(data.items) : data.items;
      await fetch(`${req.nextUrl.origin}/api/send-shipped`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.customer_email,
          name: data.customer_name,
          reference: data.reference,
          items,
          total: data.total,
          trackingNumber: body.tracking_number || null,
          city: data.customer_city,
        }),
      }).catch(console.error);
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Error conectando al backend" }, { status: 502 });
  }
}
