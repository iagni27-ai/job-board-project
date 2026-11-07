import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/dal";
import { pushSubscriptionSchema, unsubscribeSchema } from "@/lib/push/schemas";
import { removeSubscription, saveSubscription } from "@/lib/push/subscriptions";

// Identitas pemilik SELALU diambil dari sesi di server, tidak dari body request.

async function readJson(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

// Simpan subscription milik user yang sedang login.
export async function POST(request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Belum login" }, { status: 401 });

  const parsed = pushSubscriptionSchema.safeParse(await readJson(request));
  if (!parsed.success) {
    return NextResponse.json({ error: "Data subscription tidak valid" }, { status: 400 });
  }

  await saveSubscription(user.id, parsed.data);
  return NextResponse.json({ ok: true });
}

// Berhenti berlangganan (hanya subscription milik sendiri).
export async function DELETE(request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Belum login" }, { status: 401 });

  const parsed = unsubscribeSchema.safeParse(await readJson(request));
  if (!parsed.success) {
    return NextResponse.json({ error: "Data tidak valid" }, { status: 400 });
  }

  await removeSubscription(user.id, parsed.data.endpoint);
  return NextResponse.json({ ok: true });
}
