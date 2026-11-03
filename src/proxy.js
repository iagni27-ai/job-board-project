import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/auth/token";
import { dashboardPathFor } from "@/lib/auth/roles";

// Pengecekan CEPAT dan OPTIMIS sebelum halaman dirender (Next.js 16: proxy.js
// menggantikan middleware.js). Hanya memverifikasi tanda tangan cookie dan
// membaca role dari dalamnya. Pengecekan hak akses yang sebenarnya tetap
// dilakukan di server lewat requireRole() di src/lib/auth/dal.js.

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = await verifySession(token);

  const redirectTo = (path) => NextResponse.redirect(new URL(path, request.url));

  // Area dashboard: wajib login, dan hanya boleh masuk ke dashboard role sendiri.
  if (pathname === "/dashboard" || pathname.startsWith("/dashboard/")) {
    if (!session) return redirectTo("/login");

    const ownPath = dashboardPathFor(session.role);
    const inOwnArea = pathname === ownPath || pathname.startsWith(`${ownPath}/`);
    if (!inOwnArea) return redirectTo(ownPath);
  }

  // Sudah login: tidak perlu membuka login/register lagi.
  if ((pathname === "/login" || pathname === "/register") && session) {
    return redirectTo(dashboardPathFor(session.role));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
