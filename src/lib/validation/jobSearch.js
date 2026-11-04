import { z } from "zod";

// Validasi Lapisan 1 (Frontend) untuk form pencarian lowongan.
// Dipakai di SearchForm (sebelum submit) dan di halaman /lowongan (membaca URL).
export const jobSearchSchema = z.object({
  q: z
    .string()
    .trim()
    .max(60, "Kata kunci maksimal 60 karakter.")
    .regex(
      /^[\p{L}\p{N}\s.,&+#/-]*$/u,
      "Kata kunci hanya boleh berisi huruf, angka, dan tanda baca umum.",
    )
    .default(""),
  kategori: z.string().trim().max(40).default(""),
  lokasi: z.string().trim().max(40).default(""),
});