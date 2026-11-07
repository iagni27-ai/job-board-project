"use client";

import Link from "next/link";
import { useActionState } from "react";
import { register } from "@/app/actions/auth";
import FormField from "@/components/auth/FormField";
import PasswordField from "@/components/auth/PasswordField";
import { useFormValidation } from "@/components/auth/useFormValidation";
import { registerSchema } from "@/lib/auth/schemas";

export default function RegisterForm() {
  const [state, formAction, pending] = useActionState(register, undefined);
  const v = useFormValidation(registerSchema, state?.errors);
  const roleError = v.errorFor("role");
  const selectedRole = state?.values?.role || "pelamar";

  return (
    <form
      action={formAction}
      onSubmit={v.onSubmit}
      onBlur={v.onBlur}
      onInput={v.onInput}
      noValidate
      aria-busy={pending}
      className="space-y-4"
    >
      {state?.message && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.message}
        </p>
      )}

      <FormField
        id="name"
        label="Nama lengkap"
        autoComplete="name"
        defaultValue={state?.values?.name ?? ""}
        error={v.errorFor("name")}
      />
      <FormField
        id="email"
        label="Email"
        type="email"
        autoComplete="email"
        inputMode="email"
        placeholder="nama@email.com"
        defaultValue={state?.values?.email ?? ""}
        error={v.errorFor("email")}
      />
      <PasswordField
        id="password"
        label="Password"
        autoComplete="new-password"
        hint="Minimal 8 karakter, mengandung huruf dan angka."
        error={v.errorFor("password")}
      />
      <PasswordField
        id="confirmPassword"
        label="Konfirmasi password"
        autoComplete="new-password"
        error={v.errorFor("confirmPassword")}
      />

      <fieldset aria-describedby={roleError ? "role-error" : undefined}>
        <legend className="text-sm font-medium text-slate-700">Daftar sebagai</legend>
        <div className="mt-2 flex gap-6">
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="radio"
              name="role"
              value="pelamar"
              defaultChecked={selectedRole === "pelamar"}
            />
            Pelamar
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="radio"
              name="role"
              value="perusahaan"
              defaultChecked={selectedRole === "perusahaan"}
            />
            Perusahaan
          </label>
        </div>
        {roleError && (
          <p id="role-error" role="alert" className="mt-1 text-sm text-red-600">
            {roleError}
          </p>
        )}
      </fieldset>

      <button
        type="submit"
        disabled={pending}
        className="h-11 w-full rounded-lg bg-indigo-600 font-semibold text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
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
