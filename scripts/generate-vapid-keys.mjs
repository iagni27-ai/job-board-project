// Membuat sepasang kunci VAPID. Jalankan: npm run vapid:generate
// Salin hasilnya ke .env.local. Private key RAHASIA: jangan di-commit dan jangan
// diberi awalan NEXT_PUBLIC_ (awalan itu membuat nilainya terkirim ke browser).
import webpush from "web-push";

const { publicKey, privateKey } = webpush.generateVAPIDKeys();

console.log("Tempel baris berikut ke .env.local:\n");
console.log(`NEXT_PUBLIC_VAPID_PUBLIC_KEY=${publicKey}`);
console.log(`VAPID_PRIVATE_KEY=${privateKey}`);
console.log("VAPID_SUBJECT=mailto:emailkamu@example.com");
