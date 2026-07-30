import { NextRequest, NextResponse } from "next/server";

const BACKEND = "https://web-production-aa93f.up.railway.app";
const ADMIN_KEY = "mc-admin-2025";

export async function GET(req: NextRequest) {
  const path = req.nextUrl.searchParams.get("path") || "stats";
  const key = req.nextUrl.searchParams.get("key") || "";

  if (key !== ADMIN_KEY) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const res = await fetch(`${BACKEND}/admin/${path}`, {
      headers: { "X-Admin-Key": ADMIN_KEY },
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Error conectando al backend" }, { status: 502 });
  }
}

export async function PATCH(req: NextRequest) {
  const path = req.nextUrl.searchParams.get("path") || "";
  const body = await req.json();

  try {
    const res = await fetch(`${BACKEND}/admin/${path}`, {
      method: "PATCH",
      headers: { "X-Admin-Key": ADMIN_KEY, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Error conectando al backend" }, { status: 502 });
  }
}
