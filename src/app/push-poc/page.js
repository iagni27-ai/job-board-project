import { Suspense } from "react";
import PushPoc from "@/components/push/PushPoc";
import { requireUser } from "@/lib/auth/dal";

export const metadata = { title: "PoC Web Push" };

// Halaman uji sementara (Minggu 2). Di Minggu 4 tombol aktivasi dipindah ke
// dashboard pelamar dan halaman ini dihapus.
export default function PushPocPage() {
  return (
    <section className="mx-auto w-full max-w-xl px-4 py-16 sm:px-6">
      <h1 className="text-2xl font-bold text-slate-900">PoC Web Push</h1>
      <p className="mt-1 mb-6 text-slate-600">
        Halaman uji untuk memastikan notifikasi benar-benar sampai ke browser.
      </p>
      <Suspense fallback={<p className="text-sm text-slate-500">Memuat...</p>}>
        <PocContent />
      </Suspense>
    </section>
  );
}

// Membaca cookie (data per-request), jadi harus di dalam <Suspense> karena cacheComponents aktif.
async function PocContent() {
  const user = await requireUser();

  return (
    <>
      <p className="mb-4 text-sm text-slate-600">
        Masuk sebagai {user.name} ({user.role}). Subscription disimpan atas akun ini.
      </p>
      <PushPoc />
    </>
  );
}
