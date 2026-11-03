import "server-only";

// Pembatas percobaan login sederhana (di memori). Cukup untuk Minggu 1;
// di production dengan banyak instance, pindahkan ke Redis (sudah dipakai untuk BullMQ).

const WINDOW_MS = 15 * 60 * 1000; // 15 menit
const MAX_ATTEMPTS = 5;

const attempts = globalThis.__jobBoardLoginAttempts ?? new Map();
globalThis.__jobBoardLoginAttempts = attempts;

export function checkRateLimit(key) {
  const now = Date.now();
  const entry = attempts.get(key);

  if (!entry || now > entry.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true };
  }

  if (entry.count >= MAX_ATTEMPTS) {
    return {
      allowed: false,
      retryAfterMinutes: Math.ceil((entry.resetAt - now) / 60000),
    };
  }

  entry.count += 1;
  return { allowed: true };
}

export function resetRateLimit(key) {
  attempts.delete(key);
}
