import "server-only";
import bcrypt from "bcryptjs";
import { ROLES } from "@/lib/auth/roles";

// =====================================================================
// USER STORE SEMENTARA (Minggu 1)
//
// Disimpan di memori supaya alur auth bisa dites sebelum PostgreSQL siap.
// Data hilang saat server restart. Di Minggu 2-3, ISI fungsi-fungsi di
// bawah diganti dengan query ke tabel `users` (Zahra). Nama fungsi dan
// bentuk objek user dipertahankan, jadi file lain tidak perlu diubah.
//
// Bentuk user: { id, name, email, passwordHash, role, isActive }
// =====================================================================

const store = globalThis.__jobBoardUsers ?? {
  byId: new Map(),
  byEmail: new Map(),
  nextId: 1,
};
globalThis.__jobBoardUsers = store; // bertahan saat hot reload di dev

function insert({ name, email, passwordHash, role }) {
  const user = {
    id: String(store.nextId++),
    name,
    email,
    passwordHash,
    role,
    isActive: true,
  };
  store.byId.set(user.id, user);
  store.byEmail.set(user.email, user);
  return user;
}

// Akun admin untuk pengembangan, hanya dibuat jika ADMIN_EMAIL dan
// ADMIN_PASSWORD diisi di .env.local dan bukan di production.
if (
  process.env.NODE_ENV !== "production" &&
  process.env.ADMIN_EMAIL &&
  process.env.ADMIN_PASSWORD &&
  !store.byEmail.has(process.env.ADMIN_EMAIL.toLowerCase())
) {
  insert({
    name: "Admin",
    email: process.env.ADMIN_EMAIL.toLowerCase(),
    passwordHash: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 12),
    role: ROLES.ADMIN,
  });
}

export async function findUserByEmail(email) {
  return store.byEmail.get(email) ?? null;
}

export async function findUserById(id) {
  return store.byId.get(String(id)) ?? null;
}

// Mengembalikan null jika email sudah dipakai (meniru constraint UNIQUE di database).
export async function createUser({ name, email, passwordHash, role }) {
  if (store.byEmail.has(email)) return null;
  return insert({ name, email, passwordHash, role });
}
