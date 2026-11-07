import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/dal";
import { dashboardPathFor } from "@/lib/auth/roles";

// Untuk halaman /login dan /register: kalau user SUDAH login (dicek ke server,
// bukan hanya dari cookie), arahkan ke dashboard-nya. Harus dibungkus <Suspense>
// di pemanggilnya karena membaca cookie (diwajibkan oleh cacheComponents).
//
// Pengecekan ini sengaja TIDAK dilakukan di proxy.js. Proxy hanya melihat
// cookie, jadi cookie lama (mis. setelah server restart, saat user di memori
// sudah hilang) membuat /login -> /dashboard -> /login berputar tanpa henti.
export default async function GuestGuard({ children }) {
  const user = await getCurrentUser();
  if (user) redirect(dashboardPathFor(user.role));
  return children;
}
