// Sign dan verifikasi JWT sesi. Tidak memakai "server-only" karena juga
// dipakai oleh proxy.js. File ini tidak menyentuh cookie.

import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "session";
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 hari

function getKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error(
      "SESSION_SECRET belum diset atau kurang dari 32 karakter. Lihat .env.example."
    );
  }
  return new TextEncoder().encode(secret);
}

// Payload sengaja minimal: hanya id user dan role (untuk cek cepat di proxy).
// Role asli selalu dibaca ulang dari database di server (lihat dal.js).
export async function signSession({ userId, role }) {
  return new SignJWT({ role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(String(userId))
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getKey());
}

// Mengembalikan { userId, role } atau null bila token palsu / kedaluwarsa.
export async function verifySession(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getKey(), {
      algorithms: ["HS256"],
    });
    return { userId: payload.sub, role: payload.role };
  } catch {
    return null;
  }
}
