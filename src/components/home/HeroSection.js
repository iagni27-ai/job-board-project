import Link from "next/link";
import { SearchIcon, MapPinIcon, CheckCircleIcon, ArrowRightIcon } from "@/components/ui/Icons";

const quickSearches = ["Frontend Developer", "UI/UX Designer", "Product Manager", "Remote"];

const stats = [
  { value: "1.240", label: "Lowongan aktif" },
  { value: "320", label: "Perusahaan terverifikasi" },
  { value: "< 48 jam", label: "Rerata waktu respon" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-[#e8e4dc] bg-[#fbfaf7]">
      <div className="mx-auto max-w-6xl px-4 pt-12 pb-16 sm:px-6 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">

          {/* Kolom Kiri: Penjelasan & Formulir Pencarian */}
          <div className="lg:col-span-7">
            {/* Signature status tag */}
            <div className="inline-flex items-center gap-2 rounded-md border border-[#e8e4dc] bg-[#f3efe6] px-2.5 py-1 text-xs font-medium text-[#5e554a]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#16a34a]" />
              <span>Arsip Lowongan Kerja Terbuka • 2026</span>
            </div>

            <h1 className="mt-5 text-3xl font-semibold tracking-tight text-[#1f1b16] sm:text-4xl lg:text-[42px] lg:leading-[1.12]">
              Bursa lowongan kerja terkurasi untuk talenta profesional di Indonesia
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#5e554a] sm:text-[17px]">
              Akses informasi posisi pekerjaan di bidang teknologi, desain, dan bisnis dengan keterbukaan standar gaji serta kontak langsung ke tim perekrut.
            </p>

            {/* Form Pencarian */}
            <form
              action="/lowongan"
              method="get"
              role="search"
              className="mt-8 rounded-[14px] border border-[#e8e4dc] bg-white p-2 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
            >
              <div className="grid gap-2 sm:grid-cols-[1.2fr_1fr_auto]">
                <div className="relative flex items-center">
                  <SearchIcon className="pointer-events-none absolute left-3.5 h-4 w-4 text-[#7b7266]" />
                  <label htmlFor="search-q" className="sr-only">
                    Posisi atau kata kunci
                  </label>
                  <input
                    id="search-q"
                    name="q"
                    type="text"
                    placeholder="Posisi, spesialisasi, atau peran"
                    className="h-11 w-full rounded-lg border border-[#e8e4dc] bg-[#fbfaf7] pl-10 pr-3 text-sm text-[#1f1b16] placeholder:text-[#7b7266] focus:border-[#1f1b16] focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="relative flex items-center">
                  <MapPinIcon className="pointer-events-none absolute left-3.5 h-4 w-4 text-[#7b7266]" />
                  <label htmlFor="search-lokasi" className="sr-only">
                    Kota atau wilayah
                  </label>
                  <input
                    id="search-lokasi"
                    name="lokasi"
                    type="text"
                    placeholder="Kota atau Remote"
                    className="h-11 w-full rounded-lg border border-[#e8e4dc] bg-[#fbfaf7] pl-10 pr-3 text-sm text-[#1f1b16] placeholder:text-[#7b7266] focus:border-[#1f1b16] focus:bg-white focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="flex h-11 items-center justify-center rounded-lg bg-[#c25e2e] px-6 text-sm font-medium text-white transition-colors hover:bg-[#a94f24] active:scale-[0.98] focus:outline-none"
                >
                  Cari Lowongan
                </button>
              </div>
            </form>

            {/* Kata Kunci Populer */}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[#7b7266]">Pencarian sering ditelusuri:</span>
              {quickSearches.map((keyword) => (
                <Link
                  key={keyword}
                  href={`/lowongan?q=${encodeURIComponent(keyword)}`}
                  className="rounded-md border border-[#e8e4dc] bg-white px-2.5 py-1 text-[#5e554a] transition-colors hover:border-[#1f1b16] hover:text-[#1f1b16]"
                >
                  {keyword}
                </Link>
              ))}
            </div>

            {/* Data Kontekstual */}
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-[#e8e4dc] pt-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dd className="font-mono text-xl font-semibold tracking-tight text-[#1f1b16] sm:text-2xl tabular-nums">
                    {stat.value}
                  </dd>
                  <dt className="mt-1 text-xs text-[#7b7266]">{stat.label}</dt>
                </div>
              ))}
            </div>
          </div>

          {/* Kolom Kanan: The Moment — Tiket Lowongan Terverifikasi */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md rounded-[16px] border border-[#e8e4dc] bg-white p-6 shadow-[0_4px_20px_rgba(31,27,22,0.05)]">
              {/* Slip Header */}
              <div className="flex items-center justify-between border-b border-[#e8e4dc] pb-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] font-medium tracking-wider text-[#7b7266] uppercase">
                    REF-2601
                  </span>
                  <span className="inline-flex items-center gap-1 rounded bg-[#f3efe6] px-1.5 py-0.5 text-[10px] font-medium text-[#5e554a]">
                    <CheckCircleIcon className="h-3 w-3 text-[#16a34a]" />
                    Terverifikasi
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#16a34a]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#16a34a]" />
                  <span>Aktif Buka</span>
                </div>
              </div>

              {/* Posisi & Perusahaan */}
              <div className="mt-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-[#1f1b16]">
                      Frontend Developer
                    </h2>
                    <p className="mt-1 text-sm text-[#5e554a]">
                      PT Nusantara Digital • Semarang (Hybrid)
                    </p>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#e8e4dc] bg-[#fbfaf7] font-mono text-xs font-semibold text-[#1f1b16]">
                    ND
                  </span>
                </div>
              </div>

              {/* Kompensasi Gaji Transparan */}
              <div className="mt-5 rounded-lg border border-[#e8e4dc] bg-[#fbfaf7] p-3.5">
                <div className="text-[11px] font-medium text-[#7b7266] uppercase tracking-wider">
                  Rentang Gaji Ditawarkan
                </div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="font-mono text-xl font-semibold text-[#1f1b16] tabular-nums">
                    Rp 8.000.000 – 12.000.000
                  </span>
                  <span className="text-xs text-[#7b7266]">/ bulan</span>
                </div>
              </div>

              {/* Tag Syarat & Keahlian */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {["Next.js", "React", "TypeScript", "Tailwind CSS", "Full-time"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-[#e8e4dc] bg-white px-2 py-0.5 text-xs text-[#5e554a]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Perforated Divider */}
              <div className="relative my-5 -mx-6 flex items-center justify-between">
                <div className="h-4 w-4 -ml-2 rounded-full border-r border-[#e8e4dc] bg-[#fbfaf7]" />
                <div className="w-full border-t border-dashed border-[#e8e4dc]" />
                <div className="h-4 w-4 -mr-2 rounded-full border-l border-[#e8e4dc] bg-[#fbfaf7]" />
              </div>

              {/* Footer Tiket / Aksi Langsung */}
              <div className="flex items-center justify-between">
                <div className="text-xs text-[#7b7266]">
                  Dipasang <span className="font-medium text-[#5e554a]">2 hari lalu</span>
                </div>
                <Link
                  href="/lowongan/1"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#1f1b16] px-3.5 py-2 text-xs font-medium text-[#faf9f5] transition-colors hover:bg-[#38332b]"
                >
                  <span>Lihat Berkas</span>
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
