import "server-only";

// =====================================================================
// STORE PUSH SUBSCRIPTION SEMENTARA (PoC, Minggu 2)
//
// Disimpan di memori, sama seperti src/lib/auth/users.js. Bentuknya mengikuti
// tabel `push_subscriptions` di ERD supaya mudah diganti query database:
//   endpoint UNIQUE NOT NULL, user_id FK, p256dh, auth, is_active
// Nama fungsi dipertahankan saat nanti diganti isinya (Zahra).
// =====================================================================

const store = globalThis.__jobBoardPushSubs ?? { byEndpoint: new Map(), nextId: 1 };
globalThis.__jobBoardPushSubs = store;

// Satu endpoint = satu browser. Jika endpoint sudah ada (mis. ganti akun di
// browser yang sama), kepemilikannya dipindah ke user terbaru dan diaktifkan lagi.
export async function saveSubscription(userId, { endpoint, keys }) {
  const existing = store.byEndpoint.get(endpoint);
  const record = {
    id: existing?.id ?? String(store.nextId++),
    userId: String(userId),
    endpoint,
    p256dh: keys.p256dh,
    auth: keys.auth,
    isActive: true,
  };
  store.byEndpoint.set(endpoint, record);
  return record;
}

export async function listActiveSubscriptions(userId) {
  return [...store.byEndpoint.values()].filter(
    (sub) => sub.userId === String(userId) && sub.isActive
  );
}

// Subscription tidak valid (404/410 dari push service) ditandai nonaktif,
// bukan dihapus dan bukan dikirimi ulang terus-menerus.
export async function deactivateSubscription(endpoint) {
  const sub = store.byEndpoint.get(endpoint);
  if (sub) sub.isActive = false;
}

// Hanya pemilik yang boleh berhenti berlangganan. Mengembalikan true jika ada yang dihapus.
export async function removeSubscription(userId, endpoint) {
  const sub = store.byEndpoint.get(endpoint);
  if (!sub || sub.userId !== String(userId)) return false;
  store.byEndpoint.delete(endpoint);
  return true;
}
