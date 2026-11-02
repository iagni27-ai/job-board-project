import Link from "next/link";
import { navLinks, siteName } from "@/data/site";

const accountLinks = [
  { href: "/login", label: "Login" },
  { href: "/register", label: "Register" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        {/* Brand */}
        <div>
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-lg font-bold text-white">
              J
            </span>
            <span className="text-lg font-bold text-slate-900">{siteName}</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-slate-600">
            Platform lowongan kerja yang mempertemukan pencari kerja dengan
            perusahaan terbaik di Indonesia.
          </p>
        </div>

        {/* Navigasi */}
        <nav aria-label="Navigasi footer">
          <h2 className="text-sm font-semibold text-slate-900">Jelajahi</h2>
          <ul className="mt-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-slate-600 transition-colors hover:text-indigo-600"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Akun */}
        <nav aria-label="Akun">
          <h2 className="text-sm font-semibold text-slate-900">Akun</h2>
          <ul className="mt-4 space-y-2">
            {accountLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-slate-600 transition-colors hover:text-indigo-600"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-slate-200">
        <p className="mx-auto max-w-6xl px-4 py-4 text-center text-xs text-slate-500 sm:px-6">
          © 2026 {siteName}. Proyek Akhir Web Development – Tim 5.
        </p>
      </div>
    </footer>
  );
}
