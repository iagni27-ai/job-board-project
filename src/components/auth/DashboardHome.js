import LogoutButton from "@/components/auth/LogoutButton";
import { getCurrentUser } from "@/lib/auth/dal";

// Kerangka dashboard sementara. Isi sebenarnya dikerjakan di Minggu 3.
export default async function DashboardHome({ title, description }) {
  const user = await getCurrentUser();

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          <p className="mt-1 text-slate-600">
            Halo, {user?.name} ({user?.email})
          </p>
        </div>
        <LogoutButton />
      </div>
      <p className="mt-8 rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
        {description}
      </p>
    </section>
  );
}
