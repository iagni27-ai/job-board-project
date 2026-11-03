import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { readSession } from "@/lib/auth/session";
import { findUserById } from "@/lib/auth/users";
import { dashboardPathFor } from "@/lib/auth/roles";

// Data Access Layer: SEMUA pengecekan hak akses yang sebenarnya ada di sini
// (di server). proxy.js hanya pengecekan cepat untuk redirect.
//
// Role dibaca ulang dari database, bukan dari cookie, sehingga perubahan role
// atau akun yang dinonaktifkan admin langsung berlaku.

export const getCurrentUser = cache(async () => {
  const session = await readSession();
  if (!session) return null;

  const user = await findUserById(session.userId);
  if (!user || !user.isActive) return null;

  // Jangan pernah mengirim passwordHash ke luar file ini.
  return { id: user.id, name: user.name, email: user.email, role: user.role };
});

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

// Dipakai di layout/page/action yang hanya boleh diakses role tertentu.
// Role lain dialihkan ke dashboard miliknya sendiri.
export async function requireRole(...allowedRoles) {
  const user = await requireUser();
  if (!allowedRoles.includes(user.role)) {
    redirect(dashboardPathFor(user.role));
  }
  return user;
}
