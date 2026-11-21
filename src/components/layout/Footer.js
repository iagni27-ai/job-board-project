import Link from "next/link";
import { navLinks, siteName } from "@/data/site";

const accountLinks = [
  { href: "/login", label: "Masuk ke Akun" },
  { href: "/register", label: "Registrasi Pencari Kerja" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#e8e4dc] bg-[#fbfaf7]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-12 md:py-16">
        {/* Brand */}
        <div className="md:col-span-5">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#1f1b16] font-mono text-xs font-medium text-[#fbfaf7]">
              JB
            </span>
            <span className="text-[15px] font-semibold text-[#1f1b16]">{siteName}</span>
          </Link>
          <p className="mt-3.5 max-w-sm text-xs leading-relaxed text-[#5e554a]">
            Bursa lowongan kerja terkurasi untuk talenta profesional dan perusahaan di Indonesia dengan keterbukaan standar kompensasi serta verifikasi posisi.
          </p>
        </div>

        {/* Navigasi */}
        <div className="md:col-span-4">
          <h2 className="font-mono text-xs font-semibold tracking-wider text-[#1f1b16] uppercase">
            Jelajahi
          </h2>
          <ul className="mt-3.5 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-xs text-[#5e554a] transition-colors hover:text-[#1f1b16]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Akun */}
        <div className="md:col-span-3">
          <h2 className="font-mono text-xs font-semibold tracking-wider text-[#1f1b16] uppercase">
            Akses Akun
          </h2>
          <ul className="mt-3.5 space-y-2">
            {accountLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-xs text-[#5e554a] transition-colors hover:text-[#1f1b16]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-[#e8e4dc] py-5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 sm:flex-row sm:px-6">
          <p className="text-xs text-[#7b7266]">
            © <span className="tabular-nums">2026</span> {siteName}. Hak cipta dilindungi.
          </p>
          <p className="font-mono text-[11px] text-[#7b7266]">
            Desain terkurasi • Bebas slop
          </p>
        </div>
      </div>
    </footer>
  );
}
