import Link from "next/link";

const quickSearches = ["Frontend Developer", "UI/UX Designer", "Marketing", "Remote"];

const stats = [
  { value: "1.200+", label: "Lowongan aktif" },
  { value: "300+", label: "Perusahaan" },
  { value: "5.000+", label: "Pelamar terbantu" },
];

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-indigo-600 via-indigo-600 to-blue-500 text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Temukan Pekerjaan Impianmu, Mulai Hari Ini
          </h1>
          <p className="mt-4 text-base leading-7 text-indigo-100 sm:text-lg">
            Jelajahi ribuan lowongan dari perusahaan terbaik di Indonesia dan
            lamar dalam hitungan menit.
          </p>
        </div>

        {/* Form pencarian (method GET → /lowongan?q=...&lokasi=...) */}
        <form
          action="/lowongan"
          method="get"
          role="search"
          className="mx-auto mt-10 grid max-w-3xl gap-3 rounded-2xl bg-white p-3 shadow-xl sm:grid-cols-[1fr_1fr_auto]"
        >
          <div>
            <label htmlFor="search-q" className="sr-only">
              Posisi atau kata kunci
            </label>
            <input
              id="search-q"
              name="q"
              type="text"
              placeholder="Posisi atau kata kunci"
              className="h-12 w-full rounded-xl border border-slate-200 px-4 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>
          <div>
            <label htmlFor="search-lokasi" className="sr-only">
              Lokasi
            </label>
            <input
              id="search-lokasi"
              name="lokasi"
              type="text"
              placeholder="Kota atau lokasi"
              className="h-12 w-full rounded-xl border border-slate-200 px-4 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>
          <button
            type="submit"
            className="h-12 rounded-xl bg-indigo-600 px-8 font-semibold text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            Cari
          </button>
        </form>

        {/* Pencarian cepat */}
        <div className="mx-auto mt-5 flex max-w-3xl flex-wrap items-center justify-center gap-2 text-sm">
          <span className="text-indigo-100">Populer:</span>
          {quickSearches.map((keyword) => (
            <Link
              key={keyword}
              href={`/lowongan?q=${encodeURIComponent(keyword)}`}
              className="rounded-full bg-white/15 px-3 py-1 font-medium transition-colors hover:bg-white/25"
            >
              {keyword}
            </Link>
          ))}
        </div>

        {/* Statistik */}
        <dl className="mx-auto mt-12 grid max-w-3xl grid-cols-3 gap-4 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="text-xs text-indigo-100 sm:text-sm">{stat.label}</dt>
              <dd className="mt-1 text-2xl font-bold sm:text-3xl">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
