"use client";

import { useEffect, useState } from "react";

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

// Kunci VAPID publik berformat base64url; PushManager.subscribe butuh Uint8Array.
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  return Uint8Array.from(raw, (char) => char.charCodeAt(0));
}

async function postJson(url, method, body) {
  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await response.json().catch(() => ({}));
  return { ok: response.ok, status: response.status, data };
}

// Status tombol: loading | unsupported | no-key | denied | idle | subscribed
export default function PushPoc() {
  const [status, setStatus] = useState("loading");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(null); // { type: "success" | "error", text }

  // Cek dukungan browser, izin, dan apakah sudah berlangganan (tanpa meminta izin).
  useEffect(() => {
    let cancelled = false;

    async function detect() {
      const supported =
        "serviceWorker" in navigator && "PushManager" in window && "Notification" in window;
      if (!supported) return !cancelled && setStatus("unsupported");
      if (!VAPID_PUBLIC_KEY) return !cancelled && setStatus("no-key");
      if (Notification.permission === "denied") return !cancelled && setStatus("denied");

      const registration = await navigator.serviceWorker.getRegistration("/sw.js");
      const subscription = await registration?.pushManager.getSubscription();
      if (!cancelled) setStatus(subscription ? "subscribed" : "idle");
    }

    detect().catch(() => !cancelled && setStatus("unsupported"));
    return () => {
      cancelled = true;
    };
  }, []);

  // Dipanggil dari klik tombol: izin notifikasi HARUS diminta lewat interaksi pengguna.
  async function subscribe() {
    setBusy(true);
    setMessage(null);
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setStatus(permission === "denied" ? "denied" : "idle");
        setMessage({ type: "error", text: "Izin notifikasi tidak diberikan." });
        return;
      }

      await navigator.serviceWorker.register("/sw.js");
      const registration = await navigator.serviceWorker.ready;

      const subscription =
        (await registration.pushManager.getSubscription()) ??
        (await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
        }));

      const result = await postJson("/api/push/subscribe", "POST", subscription.toJSON());
      if (!result.ok) {
        // Server menolak: batalkan subscription lokal agar tidak "menggantung".
        await subscription.unsubscribe();
        setMessage({ type: "error", text: result.data.error ?? "Gagal menyimpan subscription." });
        return;
      }

      setStatus("subscribed");
      setMessage({ type: "success", text: "Notifikasi aktif di browser ini." });
    } catch (error) {
      console.error("[push] gagal subscribe", error);
      setMessage({ type: "error", text: "Gagal mengaktifkan notifikasi di browser ini." });
    } finally {
      setBusy(false);
    }
  }

  async function unsubscribe() {
    setBusy(true);
    setMessage(null);
    try {
      const registration = await navigator.serviceWorker.getRegistration("/sw.js");
      const subscription = await registration?.pushManager.getSubscription();
      if (subscription) {
        await postJson("/api/push/subscribe", "DELETE", { endpoint: subscription.endpoint });
        await subscription.unsubscribe();
      }
      setStatus("idle");
      setMessage({ type: "success", text: "Notifikasi dimatikan di browser ini." });
    } catch (error) {
      console.error("[push] gagal unsubscribe", error);
      setMessage({ type: "error", text: "Gagal mematikan notifikasi." });
    } finally {
      setBusy(false);
    }
  }

  async function sendTest() {
    setBusy(true);
    setMessage(null);
    try {
      const result = await postJson("/api/push/test", "POST");
      if (!result.ok) {
        setMessage({ type: "error", text: result.data.error ?? "Gagal mengirim tes." });
        return;
      }
      const { sent, invalid, failed } = result.data;
      if (invalid > 0 && sent === 0) {
        // Subscription kedaluwarsa: server sudah menandainya nonaktif.
        setStatus("idle");
        setMessage({
          type: "error",
          text: "Subscription sudah tidak valid. Aktifkan notifikasi lagi.",
        });
        return;
      }
      setMessage({
        type: failed > 0 ? "error" : "success",
        text: `Terkirim: ${sent}, tidak valid: ${invalid}, gagal: ${failed}. Notifikasi akan muncul sebentar lagi.`,
      });
    } catch {
      setMessage({ type: "error", text: "Tidak bisa menghubungi server." });
    } finally {
      setBusy(false);
    }
  }

  const info = {
    loading: "Memeriksa dukungan browser...",
    unsupported: "Browser ini tidak mendukung Web Push. Coba Chrome, Edge, atau Firefox terbaru.",
    "no-key": "NEXT_PUBLIC_VAPID_PUBLIC_KEY belum diisi di .env.local (lihat docs/WEB_PUSH_POC.md).",
    denied:
      "Izin notifikasi diblokir. Ubah lewat pengaturan situs di browser (ikon gembok di address bar), lalu muat ulang halaman.",
  }[status];

  const buttonClass =
    "h-11 rounded-lg px-5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <div className="space-y-4">
      {info && (
        <p role="status" className="rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-700">
          {info}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        {status === "idle" && (
          <button
            type="button"
            onClick={subscribe}
            disabled={busy}
            className={`${buttonClass} bg-indigo-600 text-white hover:bg-indigo-700`}
          >
            {busy ? "Memproses..." : "Aktifkan notifikasi"}
          </button>
        )}

        {status === "subscribed" && (
          <>
            <button
              type="button"
              onClick={sendTest}
              disabled={busy}
              className={`${buttonClass} bg-indigo-600 text-white hover:bg-indigo-700`}
            >
              {busy ? "Memproses..." : "Kirim notifikasi tes"}
            </button>
            <button
              type="button"
              onClick={unsubscribe}
              disabled={busy}
              className={`${buttonClass} border border-slate-300 text-slate-700 hover:bg-slate-50`}
            >
              Matikan notifikasi
            </button>
          </>
        )}
      </div>

      {message && (
        <p
          role={message.type === "error" ? "alert" : "status"}
          className={`rounded-lg px-3 py-2 text-sm ${
            message.type === "error" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"
          }`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
}
