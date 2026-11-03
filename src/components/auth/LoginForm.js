"use client";

import Link from "next/link";
import { useActionState } from "react";
import { login } from "@/app/actions/auth";
import FormField from "@/components/auth/FormField";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, undefined);

  return (
    <form action={formAction} noValidate className="space-y-4">
      {state?.message && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.message}
        </p>
      )}

      <FormField
        id="email"
        label="Email"
        type="email"
        autoComplete="email"
        error={state?.errors?.email}
      />
      <FormField
        id="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        error={state?.errors?.password}
      />

      <button
        type="submit"
        disabled={pending}
        className="h-11 w-full rounded-lg bg-indigo-600 font-semibold text-white transition-colors hover:bg-indigo-700 disabled:opacity-60"
      >
        {pending ? "Memproses..." : "Masuk"}
      </button>

      <p className="text-center text-sm text-slate-600">
        Belum punya akun?{" "}
        <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-700">
          Daftar
        </Link>
      </p>
    </form>
  );
}
