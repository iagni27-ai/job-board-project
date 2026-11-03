// Daftar role dan aturan rute. Satu-satunya tempat yang mendefinisikan role.

export const ROLES = {
  PELAMAR: "pelamar",
  PERUSAHAAN: "perusahaan",
  ADMIN: "admin",
};

// Role yang boleh dipilih saat register. Admin TIDAK boleh dibuat dari form publik.
export const REGISTERABLE_ROLES = [ROLES.PELAMAR, ROLES.PERUSAHAAN];

export function isValidRole(role) {
  return Object.values(ROLES).includes(role);
}

// Setiap role punya satu area dashboard: /dashboard/<role>
export function dashboardPathFor(role) {
  return `/dashboard/${role}`;
}
