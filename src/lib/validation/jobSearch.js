import { z } from "zod";

export const SORT_OPTIONS = ["terbaru", "judul"];

// Validasi Lapisan 1 (Frontend) untuk pencarian dan filter lowongan.
// Dipakai di JobSearch (sebelum submit) dan di halaman /lowongan (membaca URL).
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
  lokasi: z.string().trim().max(40, "Nama lokasi terlalu panjang.").default(""),
  kategori: z
    .array(z.string().trim().max(40))
    .max(10, "Terlalu banyak kategori dipilih.")
    .default([]),
  tipe: z
    .array(z.string().trim().max(20))
    .max(10, "Terlalu banyak tipe kerja dipilih.")
    .default([]),
  urut: z
    .enum(SORT_OPTIONS, { error: "Urutan tidak dikenal." })
    .default("terbaru"),
  page: z.coerce
    .number({ error: "Nomor halaman tidak valid." })
    .int("Nomor halaman tidak valid.")
    .min(1, "Nomor halaman tidak valid.")
    .max(1000, "Nomor halaman tidak valid.")
    .default(1),
});

// Untuk parameter /lowongan/[id] dan /perusahaan/[id].
export const idParamSchema = z.coerce.number().int().positive();
