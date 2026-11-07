import "server-only";
import webpush from "web-push";

// Menyiapkan library web-push dengan kunci VAPID dari environment.
// VAPID_PRIVATE_KEY hanya dibaca di server dan TIDAK PERNAH dikirim ke browser.
// (NEXT_PUBLIC_VAPID_PUBLIC_KEY memang publik: browser membutuhkannya untuk subscribe.)

let configured = false;

export function getWebPush() {
  if (!configured) {
    const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    const privateKey = process.env.VAPID_PRIVATE_KEY;
    const subject = process.env.VAPID_SUBJECT;

    if (!publicKey || !privateKey || !subject) {
      throw new Error("VAPID belum dikonfigurasi (lihat .env.example dan docs/WEB_PUSH_POC.md).");
    }

    webpush.setVapidDetails(subject, publicKey, privateKey);
    configured = true;
  }
  return webpush;
}
