import LoginForm from "@/components/auth/LoginForm";

export const metadata = { title: "Masuk" };

export default function LoginPage() {
  return (
    <section className="mx-auto w-full max-w-md px-4 py-16 sm:px-6">
      <h1 className="text-2xl font-bold text-slate-900">Masuk ke akun</h1>
      <p className="mt-1 mb-6 text-slate-600">Selamat datang kembali.</p>
      <LoginForm />
    </section>
  );
}
