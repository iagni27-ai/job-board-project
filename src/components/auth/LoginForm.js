"use client";

import Link from "next/link";
import { useActionState } from "react";
import { login } from "@/app/actions/auth";
import FormField from "@/components/auth/FormField";
import PasswordField from "@/components/auth/PasswordField";
import { useFormValidation } from "@/components/auth/useFormValidation";
import { loginSchema } from "@/lib/auth/schemas";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, undefined);
  const v = useFormValidation(loginSchema, state?.errors);

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
        autoComplete="current-password"
        error={v.errorFor("password")}
      />

      <button
        type="submit"
        disabled={pending}
        className="h-11 w-full rounded-lg bg-indigo-600 font-semibold text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
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
