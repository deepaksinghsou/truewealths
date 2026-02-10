import { NextResponse } from "next/server";
import { loginAdmin } from "@/lib/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const ok = await loginAdmin(email, password);

  if (!ok) {
    return NextResponse.json({ ok: false, message: "Invalid credentials" }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}
