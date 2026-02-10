import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/admin") {
    const hasSession = Boolean(req.cookies.get("tw_admin_session")?.value);
    if (!hasSession) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin"]
};
