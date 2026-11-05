import { Suspense } from "react";
import Link from "next/link";
import JobSearch from "@/components/jobs/JobSearch";
import JobListCard from "@/components/jobs/JobListCard";
import SortSelect from "@/components/jobs/SortSelect";
import Pagination from "@/components/jobs/Pagination";
import {
  getCategories,
  getJobTypes,
  getJobs,
  getLocations,
} from "@/lib/jobs";
import { jobSearchSchema } from "@/lib/validation/jobSearch";
import { DEFAULT_FILTERS, buildHref } from "@/lib/jobQuery";

export const metadata = {
  title: "Lowongan Kerja",
  description:
    "Cari lowongan kerja berdasarkan kata kunci, kategori, lokasi, dan tipe kerja.",
};

const first = (value) => (Array.isArray(value) ? value[0] : value);
const asList = (value) =>
  value === undefined ? [] : Array.isArray(value) ? value : [value];

// Cangkang halaman ditampilkan langsung; bagian yang membaca URL ada di dalam
// <Suspense> karena Cache Components aktif di project ini.
export default function LowonganPage({ searchParams }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Lowongan Kerja
        </h1>
        <p className="mt-2 text-slate-600">
          Temukan pekerjaan yang cocok dengan keahlian dan lokasimu.
        </p>
      </header>

      <Suspense fallback={<ListSkeleton />}>
        <SearchSection searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function SearchSection({ searchParams }) {
  const raw = await searchParams;

  const parsed = jobSearchSchema.safeParse({
    q: first(raw.q),
    lokasi: first(raw.lokasi),
    kategori: asList(raw.kategori),
    tipe: asList(raw.tipe),
    urut: first(raw.urut),
    page: first(raw.page),
  });

  const filters = parsed.success ? parsed.data : DEFAULT_FILTERS;
  let result = null;
  let errorMessage = "";

  if (!parsed.success) {
    errorMessage = parsed.error.issues[0].message;
  } else {
    try {
      result = await getJobs(filters);
    } catch {
      errorMessage = "Lowongan gagal dimuat. Coba lagi beberapa saat lagi.";
    }
  }

  return (
    <JobSearch
      categories={getCategories()}
      locations={getLocations()}
      types={getJobTypes()}
      initial={filters}
    >
      <section aria-live="polite">
        {errorMessage ? (
          <ErrorState message={errorMessage} retryHref={buildHref(filters)} />
        ) : result.total === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-slate-600">
                {result.total} lowongan ditemukan
              </p>
              <SortSelect filters={filters} />
            </div>

            <ul className="space-y-4">
              {result.jobs.map((job) => (
                <li key={job.id}>
                  <JobListCard job={job} />
                </li>
              ))}
            </ul>

            <Pagination
              filters={filters}
              page={result.page}
              totalPages={result.totalPages}
            />
          </>
        )}
      </section>
    </JobSearch>
  );
}

function EmptyState() {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center">
      <h2 className="text-base font-semibold text-slate-900">
        Tidak ada lowongan yang cocok
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        Coba kata kunci lain atau kurangi filter yang dipilih.
      </p>
      <Link
        href="/lowongan"
        className="mt-4 inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Lihat semua lowongan
      </Link>
    </div>
  );
}

function ErrorState({ message, retryHref }) {
  return (
    <div
      role="alert"
      className="rounded-xl border border-red-200 bg-red-50 p-6 text-center"
    >
      <h2 className="text-base font-semibold text-red-800">
        Lowongan tidak bisa ditampilkan
      </h2>
      <p className="mt-2 text-sm text-red-700">{message}</p>
      <Link
        href={retryHref}
        className="mt-4 inline-block rounded-lg bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
      >
        Coba lagi
      </Link>
    </div>
  );
}

function ListSkeleton() {
  return (
    <div aria-busy="true" aria-label="Memuat lowongan">
      <div className="h-10 animate-pulse rounded-lg bg-slate-100" />
      <div className="mt-6 grid gap-6 lg:grid-cols-[16rem_1fr]">
        <div className="hidden h-72 animate-pulse rounded-xl bg-slate-100 lg:block" />
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-32 animate-pulse rounded-xl bg-slate-100"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
