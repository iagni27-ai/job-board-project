import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import JobListCard from "@/components/jobs/JobListCard";
import { getJobById, getOtherJobsByCompany } from "@/lib/jobs";
import { idParamSchema } from "@/lib/validation/jobSearch";

export const metadata = {
  title: "Detail Lowongan",
};

export default function DetailLowonganPage({ params }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <Link
        href="/lowongan"
        className="rounded text-sm text-indigo-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Kembali ke lowongan
      </Link>

      <Suspense fallback={<DetailSkeleton />}>
        <JobDetail params={params} />
      </Suspense>
    </div>
  );
}

async function JobDetail({ params }) {
  const { id } = await params;

  const parsedId = idParamSchema.safeParse(id);
  if (!parsedId.success) notFound();

  const job = await getJobById(parsedId.data);
  if (!job) notFound();

  const others = await getOtherJobsByCompany(job.company, job.id);

  const summary = [
    ["Gaji", job.salary],
    ["Lokasi", job.location],
    ["Tipe kerja", job.type],
    ["Batas lamar", job.deadline],
  ];

  return (
    <>
      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_18rem]">
        <article className="min-w-0">
          <header className="flex items-start gap-4">
            <div
              aria-hidden="true"
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-xl font-semibold ${job.logoColor}`}
            >
              {job.company.charAt(0)}
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl font-bold text-slate-900">{job.title}</h1>
              <p className="mt-1">
                <Link
                  href={`/perusahaan/${job.companyId}`}
                  className="rounded font-medium text-indigo-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {job.company}
                </Link>
              </p>
              <ul className="mt-3 flex flex-wrap gap-2 text-xs text-slate-700">
                <li className="rounded-full bg-slate-100 px-2.5 py-1">
                  {job.location}
                </li>
                <li className="rounded-full bg-slate-100 px-2.5 py-1">
                  {job.type}
                </li>
                <li className="rounded-full bg-slate-100 px-2.5 py-1">
                  {job.category}
                </li>
                <li className="rounded-full bg-slate-100 px-2.5 py-1">
                  {job.postedAt}
                </li>
              </ul>
            </div>
          </header>

          <section className="mt-8">
            <h2 className="text-lg font-semibold text-slate-900">
              Deskripsi pekerjaan
            </h2>
            <p className="mt-2 max-w-prose leading-relaxed text-slate-700">
              {job.description}
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-lg font-semibold text-slate-900">
              Tanggung jawab
            </h2>
            <ul className="mt-2 max-w-prose list-disc space-y-1 pl-5 text-slate-700">
              {job.responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-lg font-semibold text-slate-900">Kualifikasi</h2>
            <ul className="mt-2 max-w-prose list-disc space-y-1 pl-5 text-slate-700">
              {job.qualifications.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </article>

        <aside
          aria-label="Ringkasan lowongan"
          className="h-fit rounded-xl border border-slate-200 bg-white p-5 lg:sticky lg:top-6"
        >
          <h2 className="text-base font-semibold text-slate-900">Ringkasan</h2>
          <dl className="mt-4 space-y-3 text-sm">
            {summary.map(([label, value]) => (
              <div key={label}>
                <dt className="text-slate-500">{label}</dt>
                <dd className="font-medium text-slate-900">{value}</dd>
              </div>
            ))}
          </dl>

          {/* Minggu 3: sambungkan dengan sesi login (Rafsya).
              Pelamar yang sudah login membuka form lamaran, yang belum login ke /login. */}
          <Link
            href="/login"
            className="mt-6 block rounded-lg bg-indigo-600 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Lamar Sekarang
          </Link>
          <p className="mt-2 text-xs text-slate-500">
            Belum login? Kamu akan diarahkan ke halaman masuk.
          </p>
        </aside>
      </div>

      {others.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-slate-900">
            Lowongan lain dari {job.company}
          </h2>
          <ul className="mt-4 grid gap-4 md:grid-cols-2">
            {others.map((item) => (
              <li key={item.id}>
                <JobListCard job={item} as="h3" />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

function DetailSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Memuat detail lowongan"
      className="mt-6 grid gap-8 lg:grid-cols-[1fr_18rem]"
    >
      <div className="space-y-4">
        <div className="h-20 animate-pulse rounded-xl bg-slate-100" />
        <div className="h-40 animate-pulse rounded-xl bg-slate-100" />
        <div className="h-40 animate-pulse rounded-xl bg-slate-100" />
      </div>
      <div className="h-64 animate-pulse rounded-xl bg-slate-100" />
    </div>
  );
}
