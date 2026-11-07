// Service Worker untuk Web Push. Dilayani dari /sw.js (scope: seluruh situs).
// Tugasnya hanya dua: menampilkan notifikasi saat ada event "push", dan
// membuka halaman yang relevan saat notifikasi diklik.

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// Payload dikirim server sebagai JSON: { title, body, url, tag }.
self.addEventListener("push", (event) => {
  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch {
      data = { body: event.data.text() };
    }
  }

  const title = data.title || "JobBoard";
  const options = {
    body: data.body || "",
    // "tag" yang sama menggantikan notifikasi lama, bukan menumpuk (cegah tampil ganda).
    tag: data.tag,
    data: { url: data.url || "/" },
  };

  // Browser mewajibkan notifikasi ditampilkan untuk setiap push; jangan dilewati.
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  // Hanya terima URL satu origin, supaya payload tidak bisa mengarahkan ke situs lain.
  let target = new URL("/", self.location.origin);
  try {
    const requested = new URL(event.notification.data?.url || "/", self.location.origin);
    if (requested.origin === self.location.origin) target = requested;
  } catch {
    // URL rusak: pakai beranda.
  }

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((windows) => {
      // Pakai tab yang sudah terbuka jika ada.
      for (const client of windows) {
        if (new URL(client.url).origin === self.location.origin && "focus" in client) {
          if (client.url !== target.href && "navigate" in client) {
            return client.navigate(target.href).then((c) => c?.focus());
          }
          return client.focus();
        }
      }
      return self.clients.openWindow(target.href);
    })
  );
});
