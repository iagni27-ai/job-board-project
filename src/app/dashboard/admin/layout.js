import { Suspense } from "react";
import RoleGuard from "@/components/auth/RoleGuard";

export default function AdminDashboardLayout({ children }) {
  return (
    <Suspense fallback={<p className="p-8 text-center text-slate-500">Memuat...</p>}>
      <RoleGuard role="admin">{children}</RoleGuard>
    </Suspense>
  );
}
