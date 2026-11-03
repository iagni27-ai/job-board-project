# Arsitektur Autentikasi (Custom)

Autentikasi memakai session cookie berisi JWT (`jose`), password di-hash dengan `bcryptjs`,
dan input divalidasi dengan Zod. Tidak ada library auth pihak ketiga.

## Alur

1. **Register/Login** (`src/app/actions/auth.js`, Server Action): validasi Zod, lalu hash/bandingkan password.
2. **Sesi**: server membuat JWT bertanda tangan (`SESSION_SECRET`) berisi id user dan role, disimpan di
   cookie `session` (`httpOnly`, `sameSite=lax`, `secure` di production, 7 hari).
3. **Proteksi rute, dua lapis**:
   - `src/proxy.js` pengecekan cepat sebelum render: belum login ke `/login`, salah role ke dashboard sendiri.
   - `src/lib/auth/dal.js` `requireRole()` pengecekan sebenarnya di server (layout tiap dashboard lewat `RoleGuard`).
     Role dibaca ulang dari database, bukan dipercaya dari cookie.
4. **Logout**: hapus cookie lewat Server Action `logout`.

## Peta rute

| Rute | Akses |
|---|---|
| `/`, `/lowongan`, `/perusahaan` | Publik |
| `/login`, `/register` | Publik (jika sudah login, dialihkan ke dashboard) |
| `/dashboard/pelamar` | Role `pelamar` |
| `/dashboard/perusahaan` | Role `perusahaan` |
| `/dashboard/admin` | Role `admin` (tidak bisa dibuat dari form register) |

## Keamanan yang sudah ada

- Password di-hash bcrypt (12 putaran), batas 72 karakter sesuai batas bcrypt.
- Pesan login sama untuk email salah dan password salah, dengan hash palsu untuk menyamakan waktu respons.
- Pembatas percobaan login: 5 kali per 15 menit per email (di memori; pindah ke Redis di production).
- Role `admin` ditolak oleh skema register (`REGISTERABLE_ROLES`).
- `passwordHash` tidak pernah keluar dari `src/lib/auth/`.

## Yang masih sementara

- `src/lib/auth/users.js` memakai penyimpanan di memori. Ganti isinya dengan query ke tabel `users`
  setelah database siap; nama fungsi dan bentuk objek dipertahankan.
- Navbar belum berubah saat user login (tombol Login/Register tetap tampil).
- Tidak ada validasi Lapisan 2 dan 3 untuk auth sampai backend dan database tersedia.

## Menjalankan

```bash
npm install jose bcryptjs zod
cp .env.example .env.local   # opsional di development, wajib di production
npm run dev
```

Di development, jika `SESSION_SECRET` kosong, dipakai kunci bawaan dan muncul peringatan di terminal.
Di production, aplikasi menolak berjalan tanpa `SESSION_SECRET` (minimal 32 karakter acak, `openssl rand -base64 48`).

Untuk mencoba role admin, isi `ADMIN_EMAIL` dan `ADMIN_PASSWORD` di `.env.local` (hanya di development).
