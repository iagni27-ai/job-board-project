import Link from "next/link";
import { categories } from "@/data/dummyJobs";
import { CategoryIcon, ArrowRightIcon } from "@/components/ui/Icons";

export default function PopularCategories() {
  return (
    <section className="border-b border-[#e8e4dc] bg-[#fbfaf7] py-14 sm:py-18">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-[#1f1b16] sm:text-2xl">
              Bidang Spesialisasi
            </h2>
            <p className="mt-1.5 text-sm text-[#5e554a]">
              Telusuri lowongan berdasarkan disiplin ilmu dan jalur karier.
            </p>
          </div>
          <Link
            href="/lowongan"
            className="hidden items-center gap-1.5 text-xs font-medium text-[#5e554a] transition-colors hover:text-[#1f1b16] sm:inline-flex"
          >
            <span>Semua kategori</span>
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
        </div>

        <ul className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <li key={category.slug}>
              <Link
                href={`/lowongan?kategori=${category.slug}`}
                className="group flex h-full flex-col items-start rounded-xl border border-[#e8e4dc] bg-white p-4 transition-colors duration-150 hover:border-[#1f1b16] hover:bg-[#faf9f6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1f1b16]"
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#e8e4dc] bg-[#fbfaf7] text-[#5e554a] transition-colors group-hover:border-[#1f1b16] group-hover:text-[#1f1b16]"
                  aria-hidden="true"
                >
                  <CategoryIcon slug={category.slug} className="h-5 w-5" />
                </div>
                <span className="mt-3 text-sm font-medium text-[#1f1b16]">
                  {category.name}
                </span>
                <span className="mt-1 font-mono text-xs text-[#7b7266] tabular-nums">
                  {category.jobCount} lowongan
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
