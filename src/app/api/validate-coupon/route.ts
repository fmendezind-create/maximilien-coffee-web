import { NextRequest, NextResponse } from "next/server";

const BACKEND = "https://web-production-aa93f.up.railway.app";

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();
    if (!code) return NextResponse.json({ valid: false, discount: 0 });

    const res = await fetch(`${BACKEND}/coupons/validate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ valid: false, discount: 0 });
  }
}
