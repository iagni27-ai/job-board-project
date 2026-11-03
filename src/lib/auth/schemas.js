// Validasi Lapisan 1 (frontend/server action) memakai Zod.
// Validasi backend dan constraint database tetap dikerjakan terpisah (Zahra).

import { z } from "zod";
import { REGISTERABLE_ROLES } from "@/lib/auth/roles";

const emailField = z
  .string({ error: "Email wajib diisi" })
  .trim()
  .toLowerCase()
  .min(1, "Email wajib diisi")
  .max(254, "Email terlalu panjang")
  .email("Format email tidak valid");

export const registerSchema = z
  .object({
    name: z
      .string({ error: "Nama wajib diisi" })
      .trim()
      .min(2, "Nama minimal 2 karakter")
      .max(100, "Nama maksimal 100 karakter"),
    email: emailField,
    password: z
      .string({ error: "Password wajib diisi" })
      .min(8, "Password minimal 8 karakter")
      .max(72, "Password maksimal 72 karakter") // batas input bcrypt
      .regex(/[A-Za-z]/, "Password harus mengandung huruf")
      .regex(/[0-9]/, "Password harus mengandung angka"),
    confirmPassword: z.string({ error: "Konfirmasi password wajib diisi" }),
    role: z.enum(REGISTERABLE_ROLES, { error: "Pilih daftar sebagai Pelamar atau Perusahaan" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi password tidak sama",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: emailField,
  password: z
    .string({ error: "Password wajib diisi" })
    .min(1, "Password wajib diisi"),
});

// Mengubah error Zod menjadi { namaField: "pesan pertama" } untuk ditampilkan di form.
export function toFieldErrors(zodError) {
  const errors = {};
  for (const issue of zodError.issues) {
    const field = issue.path[0];
    if (field !== undefined && !(field in errors)) {
      errors[field] = issue.message;
    }
  }
  return errors;
}
