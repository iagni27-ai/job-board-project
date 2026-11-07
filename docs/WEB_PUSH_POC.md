# PoC Web Push Notification (Minggu 2)

Tujuan PoC: membuktikan notifikasi **benar-benar sampai ke browser** lewat
Service Worker + VAPID + `web-push`, sebelum dihubungkan ke antrean dan worker di Minggu 4.

## Isi PoC

| File | Fungsi |
|---|---|
| `public/sw.js` | Service Worker: event `push` menampilkan notifikasi, `notificationclick` membuka halaman tujuan (hanya satu origin). |
| `src/components/push/PushPoc.js` | UI: cek dukungan browser, minta izin lewat klik, subscribe/unsubscribe, tombol kirim tes. |
| `src/app/push-poc/page.js` | Halaman uji `/push-poc` (wajib login). Sementara; dihapus di Minggu 4. |
| `src/app/api/push/subscribe/route.js` | `POST` simpan subscription, `DELETE` berhenti berlangganan. Pemilik diambil dari sesi server. |
| `src/app/api/push/test/route.js` | `POST` kirim notifikasi tes ke perangkat milik user yang login (dibatasi rate limit). |
| `src/lib/push/webpush.js` | Konfigurasi VAPID dari environment (server only). |
| `src/lib/push/subscriptions.js` | Penyimpanan subscription **di memori** (sementara), bentuknya mengikuti tabel `push_subscriptions` di ERD. |
| `src/lib/push/schemas.js` | Validasi Zod untuk body subscribe/unsubscribe. |
| `scripts/generate-vapid-keys.mjs` | Pembuat pasangan kunci VAPID (`npm run vapid:generate`). |

## Cara menjalankan

```bash
npm install                 # memasang web-push (sudah ada di package.json)
npm run vapid:generate      # cetak pasangan kunci VAPID
cp .env.example .env.local  # lalu tempel kunci ke .env.local
npm run dev
```

1. Isi `.env.local`: `NEXT_PUBLIC_VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `VAPID_SUBJECT` (`mailto:email-kamu`).
2. Restart `npm run dev` setelah mengubah `.env.local` (variabel `NEXT_PUBLIC_` dibaca saat build/start).
3. Daftar atau login, lalu buka `http://localhost:3000/push-poc`.
4. Klik **Aktifkan notifikasi** → izinkan di browser → klik **Kirim notifikasi tes**.
5. Notifikasi muncul; klik notifikasi, tab diarahkan ke `/push-poc`.

`localhost` dianggap secure context oleh browser, jadi Web Push jalan tanpa HTTPS di lokal.
Di deployment wajib HTTPS.

## Alur yang dibuktikan

```
klik tombol -> izin notifikasi -> Service Worker terdaftar -> PushManager.subscribe (VAPID public key)
  -> POST /api/push/subscribe (disimpan, terhubung ke user)
  -> POST /api/push/test -> web-push (VAPID private key) -> push service browser
  -> event "push" di sw.js -> showNotification -> klik -> notificationclick -> buka halaman
```

Yang sudah ditangani di PoC: izin ditolak, browser tidak mendukung, kunci VAPID belum diisi,
subscription tidak valid (404/410 dari push service ditandai nonaktif, UI meminta aktivasi ulang),
endpoint bukan HTTPS ditolak, endpoint tes dibatasi rate limit, tidak ada endpoint/kunci di log.

## Catatan hasil riset

- **Izin harus lewat interaksi pengguna.** Memanggil `Notification.requestPermission()` saat halaman dimuat
  diblokir atau diabaikan banyak browser, jadi PoC memakai tombol.
- **`userVisibleOnly: true` wajib** di Chrome/Edge: setiap push harus menampilkan notifikasi (sudah dipenuhi `sw.js`).
- **Satu endpoint = satu browser/perangkat.** Satu pelamar bisa punya banyak subscription; kirim ke semuanya
  (sesuai indeks `push_subscriptions (user_id)` di ERD).
- **Subscription bisa mati kapan saja** (izin dicabut, data browser dihapus). Push service membalas `404` atau `410`;
  tandai `is_active = false`, jangan diulang terus.
- **Payload dibatasi sekitar 4 KB.** Kirim ringkas (judul, isi, URL, tag); detail diambil dari halaman tujuan.
- **`tag` mencegah notifikasi menumpuk** untuk kejadian yang sama. Pencegahan kirim ganda di sisi server
  tetap lewat ID job antrean (`application_id` + status) sesuai ERD.
- **`sw.js` tidak boleh di-cache lama**, jadi `next.config.mjs` memberi header `no-cache` untuk `/sw.js`.
- iOS/Safari hanya mendukung Web Push untuk situs yang sudah ditambahkan ke Home Screen. Uji demo di Chrome/Edge/Firefox desktop atau Android.

## Batasan PoC (sengaja, dikerjakan Minggu 4)

1. **Pengiriman langsung di request.** `/api/push/test` memanggil `web-push` langsung. Fitur asli harus:
   status lamaran disimpan di database → job masuk antrean (BullMQ + Redis, ID job dari `application_id` + status)
   → worker terpisah mengirim Web Push dengan retry terbatas. Kegagalan push tidak boleh membatalkan perubahan status.
2. **Subscription di memori.** Data hilang saat server restart. Ganti isi `src/lib/push/subscriptions.js`
   dengan query ke tabel `push_subscriptions` setelah database siap (nama fungsi dipertahankan).
3. **Belum ada log terstruktur dan pencatatan ke tabel `notifications`.** Sekarang hanya `console`; Pino/Winston
   dan status `antre/terkirim/gagal` menyusul bersama worker.
4. **Belum ada handler `pushsubscriptionchange`** di `sw.js` (browser mengganti subscription otomatis).
   Sementara cukup ditangani lewat aktivasi ulang saat subscription ditandai tidak valid.
5. Rate limit memakai memori (`src/lib/auth/rateLimit.js`); pindah ke Redis di production.

## Cek cepat jika notifikasi tidak muncul

- DevTools → Application → Service Workers: `sw.js` harus berstatus *activated*.
- Application → Notifications / pengaturan situs: izin harus *Allow*. Cek juga mode "Jangan ganggu" di OS.
- Terminal `npm run dev`: baris `[push] terkirim` berarti server sukses; `[push] gagal kirim` memuat status HTTP-nya.
- Status `503` dari `/api/push/test` berarti kunci VAPID server belum diisi atau restart server belum dilakukan.
