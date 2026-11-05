import Link from "next/link";
import { latestJobs } from "@/data/dummyJobs";

export const metadata = { title: "Perusahaan" };

function getCompanies() {
  const map = new Map();
  for (const job of latestJobs) {
    const key = job.companyId ?? job.company;
    if (!map.has(key)) {
      map.set(key, {
        id: job.companyId ?? map.size + 1,
        name: job.company,
        logoColor: job.logoColor,
        location: job.location,
        jobCount: 0,
      });
    }
    map.get(key).jobCount += 1;
  }
  return [...map.values()];
}

export default function PerusahaanPage() {
  const companies = getCompanies();

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold text-slate-900">
        Perusahaan
      </h1>

      {companies.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="font-medium text-slate-900">Belum ada perusahaan</p>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {companies.map((company) => (
            <li key={company.id}>
              <Link
                href={`/perusahaan/${company.id}`}
                className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-indigo-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <div
                  aria-hidden="true"
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-lg font-semibold ${company.logoColor}`}
                >
                  {company.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-slate-900">
                    {company.name}
                  </p>
                  <p className="text-sm text-slate-600">{company.location}</p>
                  <p className="text-xs text-slate-500">
                    {company.jobCount} lowongan aktif
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}