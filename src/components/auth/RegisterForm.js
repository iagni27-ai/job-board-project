"use client";

import Link from "next/link";
import { useActionState } from "react";
import { register } from "@/app/actions/auth";
import FormField from "@/components/auth/FormField";

export default function RegisterForm() {
  const [state, formAction, pending] = useActionState(register, undefined);
  const roleError = state?.errors?.role;

  return (
    <form action={formAction} noValidate className="space-y-4">
      {state?.message && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.message}
        </p>
      )}

      <FormField id="name" label="Nama lengkap" autoComplete="name" error={state?.errors?.name} />
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
        autoComplete="new-password"
        error={state?.errors?.password}
      />
      <FormField
        id="confirmPassword"
        label="Konfirmasi password"
        type="password"
        autoComplete="new-password"
        error={state?.errors?.confirmPassword}
      />

      <fieldset>
        <legend className="text-sm font-medium text-slate-700">Daftar sebagai</legend>
        <div className="mt-2 flex gap-6">
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input type="radio" name="role" value="pelamar" defaultChecked />
            Pelamar
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input type="radio" name="role" value="perusahaan" />
            Perusahaan
          </label>
        </div>
        {roleError && <p className="mt-1 text-sm text-red-600">{roleError}</p>}
      </fieldset>

      <button
        type="submit"
        disabled={pending}
        className="h-11 w-full rounded-lg bg-indigo-600 font-semibold text-white transition-colors hover:bg-indigo-700 disabled:opacity-60"
      >
        {pending ? "Memproses..." : "Daftar"}
      </button>

      <p className="text-center text-sm text-slate-600">
        Sudah punya akun?{" "}
        <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-700">
          Masuk
        </Link>
      </p>
    </form>
  );
}
