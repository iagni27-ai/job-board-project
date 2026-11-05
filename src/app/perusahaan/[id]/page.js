import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import JobListCard from "@/components/jobs/JobListCard";
import { getCompanyById } from "@/lib/jobs";
import { idParamSchema } from "@/lib/validation/jobSearch";

export const metadata = {
  title: "Profil Perusahaan",
};

export default function ProfilPerusahaanPage({ params }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <Suspense fallback={<CompanySkeleton />}>
        <CompanyProfile params={params} />
      </Suspense>
    </div>
  );
}

async function CompanyProfile({ params }) {
  const { id } = await params;

  const parsedId = idParamSchema.safeParse(id);
  if (!parsedId.success) notFound();

  const company = await getCompanyById(parsedId.data);
  if (!company) notFound();

  const info = [
    ["Industri", company.industry],
    ["Kota", company.city],
    ["Website", company.website],
  ].filter(([, value]) => value);

  return (
    <>
      <header className="flex items-start gap-5 rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
        <div
          aria-hidden="true"
          className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl text-2xl font-semibold ${company.logoColor}`}
        >
          {company.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-slate-900">{company.name}</h1>
          <dl className="mt-3 flex flex-wrap gap-x-8 gap-y-2 text-sm">
            {info.map(([label, value]) => (
              <div key={label}>
                <dt className="text-slate-500">{label}</dt>
                <dd className="font-medium text-slate-900">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-slate-900">
          Tentang perusahaan
        </h2>
        <p className="mt-2 max-w-prose leading-relaxed text-slate-700">
          {company.description}
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-slate-900">
          Lowongan aktif ({company.jobs.length})
        </h2>
        {company.jobs.length === 0 ? (
          <div className="mt-4 rounded-xl border border-dashed border-slate-300 p-8 text-center">
            <p className="text-sm text-slate-600">
              Perusahaan ini belum membuka lowongan.
            </p>
            <Link
              href="/lowongan"
              className="mt-3 inline-block text-sm font-medium text-indigo-700 hover:underline"
            >
              Lihat lowongan lain
            </Link>
          </div>
        ) : (
          <ul className="mt-4 grid gap-4 md:grid-cols-2">
            {company.jobs.map((job) => (
              <li key={job.id}>
                <JobListCard job={job} as="h3" />
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

function CompanySkeleton() {
  return (
    <div aria-busy="true" aria-label="Memuat profil perusahaan" className="space-y-6">
      <div className="h-28 animate-pulse rounded-xl bg-slate-100" />
      <div className="h-24 animate-pulse rounded-xl bg-slate-100" />
      <div className="h-40 animate-pulse rounded-xl bg-slate-100" />
    </div>
  );
}
