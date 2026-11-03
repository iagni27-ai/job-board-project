"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { loginSchema, registerSchema, toFieldErrors } from "@/lib/auth/schemas";
import { createSession, deleteSession } from "@/lib/auth/session";
import { createUser, findUserByEmail } from "@/lib/auth/users";
import { checkRateLimit, resetRateLimit } from "@/lib/auth/rateLimit";
import { dashboardPathFor } from "@/lib/auth/roles";

const BCRYPT_ROUNDS = 12;

// Hash palsu untuk menyamakan waktu respons saat email tidak ditemukan,
// supaya penyerang tidak bisa menebak email mana yang terdaftar.
const DUMMY_HASH = bcrypt.hashSync("password-palsu", BCRYPT_ROUNDS);

// State yang dikembalikan ke form: { errors?: { field: pesan }, message?: string }

export async function register(_prevState, formData) {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    role: formData.get("role"),
  });

  if (!parsed.success) {
    return { errors: toFieldErrors(parsed.error) };
  }

  const { name, email, password, role } = parsed.data;
  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
  const user = await createUser({ name, email, passwordHash, role });

  if (!user) {
    return { errors: { email: "Email sudah terdaftar" } };
  }

  await createSession(user);
  redirect(dashboardPathFor(user.role));
}

export async function login(_prevState, formData) {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { errors: toFieldErrors(parsed.error) };
  }

  const { email, password } = parsed.data;

  const limit = checkRateLimit(`login:${email}`);
  if (!limit.allowed) {
    return {
      message: `Terlalu banyak percobaan. Coba lagi dalam ${limit.retryAfterMinutes} menit.`,
    };
  }

  const user = await findUserByEmail(email);
  const passwordOk = await bcrypt.compare(password, user?.passwordHash ?? DUMMY_HASH);

  // Pesan sengaja sama untuk "email salah" dan "password salah".
  if (!user || !user.isActive || !passwordOk) {
    return { message: "Email atau password salah" };
  }

  resetRateLimit(`login:${email}`);
  await createSession(user);
  redirect(dashboardPathFor(user.role));
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
