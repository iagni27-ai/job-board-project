import { Suspense } from "react";
import GuestGuard from "@/components/auth/GuestGuard";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata = { title: "Daftar" };

export default function RegisterPage() {
  return (
    <section className="mx-auto w-full max-w-md px-4 py-16 sm:px-6">
      <h1 className="text-2xl font-bold text-slate-900">Buat akun baru</h1>
      <p className="mt-1 mb-6 text-slate-600">Daftar sebagai pelamar atau perusahaan.</p>
      <Suspense fallback={<p className="text-sm text-slate-500">Memuat...</p>}>
        <GuestGuard>
          <RegisterForm />
        </GuestGuard>
      </Suspense>
    </section>
  );
}
