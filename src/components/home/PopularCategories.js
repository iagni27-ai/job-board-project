import Link from "next/link";
import { categories } from "@/data/dummyJobs";

export default function PopularCategories() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Kategori Pekerjaan Populer
          </h2>
          <p className="mt-2 text-slate-600">
            Pilih bidang yang paling sesuai dengan keahlianmu.
          </p>
        </div>
        <Link
          href="/lowongan"
          className="hidden shrink-0 text-sm font-semibold text-indigo-600 hover:text-indigo-700 sm:block"
        >
          Lihat semua →
        </Link>
      </div>

      <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => (
          <li key={category.slug}>
            <Link
              href={`/lowongan?kategori=${category.slug}`}
              className="flex h-full flex-col items-center rounded-2xl border border-slate-200 bg-white p-5 text-center transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              <span
                className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-50 text-2xl"
                aria-hidden="true"
              >
                {category.icon}
              </span>
              <span className="mt-3 text-sm font-semibold text-slate-900">
                {category.name}
              </span>
              <span className="mt-1 text-xs text-slate-500">
                {category.jobCount} lowongan
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
