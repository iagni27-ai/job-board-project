import { requireRole } from "@/lib/auth/dal";

// Pengecekan role di server untuk satu area dashboard. Dipasang di layout.js
// tiap area. Karena membaca cookie (data per-request), harus dibungkus <Suspense>
// di pemanggilnya (diwajibkan oleh cacheComponents di next.config.mjs).
export default async function RoleGuard({ role, children }) {
  await requireRole(role);
  return children;
}
