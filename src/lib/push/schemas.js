import { z } from "zod";

// Validasi bentuk PushSubscription dari browser (hasil subscription.toJSON()).
// Endpoint harus HTTPS karena dipakai server untuk mengirim request keluar.
export const pushSubscriptionSchema = z.object({
  endpoint: z
    .string({ error: "Endpoint wajib diisi" })
    .url("Endpoint tidak valid")
    .startsWith("https://", "Endpoint harus HTTPS")
    .max(2048, "Endpoint terlalu panjang"),
  keys: z.object({
    p256dh: z.string().min(1, "Kunci p256dh wajib diisi").max(256),
    auth: z.string().min(1, "Kunci auth wajib diisi").max(64),
  }),
});

export const unsubscribeSchema = z.object({
  endpoint: z.string().url().startsWith("https://").max(2048),
});
