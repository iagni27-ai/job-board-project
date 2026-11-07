import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/dal";
import { checkRateLimit } from "@/lib/auth/rateLimit";
import { getWebPush } from "@/lib/push/webpush";
import { deactivateSubscription, listActiveSubscriptions } from "@/lib/push/subscriptions";

// PoC: kirim notifikasi tes ke SEMUA perangkat milik user yang sedang login.
// Di fitur sebenarnya (Minggu 4) pengiriman TIDAK dilakukan di request seperti
// ini, tetapi lewat antrean -> background worker (lihat docs/WEB_PUSH_POC.md).

export async function POST() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Belum login" }, { status: 401 });

  // Endpoint ini memicu request keluar, jadi dibatasi supaya tidak disalahgunakan.
  const limit = checkRateLimit(`push-test:${user.id}`);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: `Terlalu banyak percobaan. Coba lagi dalam ${limit.retryAfterMinutes} menit.` },
      { status: 429 }
    );
  }

  let webpush;
  try {
    webpush = getWebPush();
  } catch (error) {
    console.error("[push] konfigurasi VAPID bermasalah:", error.message);
    return NextResponse.json({ error: "Web Push belum dikonfigurasi di server" }, { status: 503 });
  }

  const subscriptions = await listActiveSubscriptions(user.id);
  if (subscriptions.length === 0) {
    return NextResponse.json({ error: "Belum ada perangkat yang berlangganan" }, { status: 404 });
  }

  const payload = JSON.stringify({
    title: "Tes notifikasi JobBoard",
    body: `Halo ${user.name}, Web Push berhasil sampai ke browser ini.`,
    url: "/push-poc",
    tag: "push-poc-test",
  });

  const summary = { sent: 0, invalid: 0, failed: 0 };

  await Promise.all(
    subscriptions.map(async (sub) => {
      const startedAt = Date.now();
      try {
        await webpush.sendNotification(
          { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
          payload,
          { TTL: 60 }
        );
        summary.sent += 1;
        console.info("[push] terkirim", { subscriptionId: sub.id, ms: Date.now() - startedAt });
      } catch (error) {
        // 404/410: subscription kedaluwarsa atau izin dicabut -> tandai nonaktif.
        if (error.statusCode === 404 || error.statusCode === 410) {
          await deactivateSubscription(sub.endpoint);
          summary.invalid += 1;
        } else {
          summary.failed += 1;
        }
        // Jangan catat endpoint/kunci; cukup id dan status untuk diagnosis.
        console.error("[push] gagal kirim", {
          subscriptionId: sub.id,
          status: error.statusCode,
          ms: Date.now() - startedAt,
        });
      }
    })
  );

  return NextResponse.json(summary);
}
