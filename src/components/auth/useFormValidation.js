"use client";

import { useState } from "react";
import { toFieldErrors } from "@/lib/auth/schemas";

// Validasi Lapisan 1 (frontend) memakai skema Zod yang SAMA dengan server
// (src/lib/auth/schemas.js), jadi aturan dan pesan error tidak bisa berbeda.
// Validasi server tetap berjalan; ini hanya memberi umpan balik lebih cepat.
//
// Cara pakai:
//   const v = useFormValidation(loginSchema, state?.errors);
//   <form onSubmit={v.onSubmit} onBlur={v.onBlur} onInput={v.onInput} ...>
//   <FormField error={v.errorFor("email")} />
export function useFormValidation(schema, serverErrors) {
  const [clientErrors, setClientErrors] = useState({});

  const readValues = (form) => Object.fromEntries(new FormData(form).entries());

  // Error milik field: hasil validasi client menang atas error server
  // (key yang ada tapi undefined berarti "sudah diedit, hapus errornya").
  function errorFor(name) {
    return name in clientErrors ? clientErrors[name] : serverErrors?.[name];
  }

  function onSubmit(event) {
    const form = event.currentTarget;
    const result = schema.safeParse(readValues(form));

    if (result.success) {
      setClientErrors({});
      return; // lanjut ke Server Action
    }

    // Batalkan pengiriman: Server Action tidak dipanggil.
    event.preventDefault();
    const errors = toFieldErrors(result.error);
    setClientErrors(errors);

    // Pindahkan fokus ke field pertama yang salah (bantu pengguna keyboard/screen reader).
    const firstField = Object.keys(errors)[0];
    const element = form.elements.namedItem(firstField);
    const target = element instanceof RadioNodeList ? element[0] : element;
    target?.focus?.();
  }

  // Validasi satu field saat ditinggalkan (blur), supaya error muncul lebih awal.
  function onBlur(event) {
    const name = event.target.name;
    if (!name || event.target.value === "") return; // jangan marah sebelum user mengetik
    const result = schema.safeParse(readValues(event.currentTarget));
    const errors = result.success ? {} : toFieldErrors(result.error);
    setClientErrors((prev) => ({ ...prev, [name]: errors[name] }));
  }

  // Begitu field diedit, error lamanya (client maupun server) dihapus.
  function onInput(event) {
    const name = event.target.name;
    if (!name) return;
    setClientErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  return { errorFor, onSubmit, onBlur, onInput };
}
