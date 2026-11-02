import Link from "next/link";
import JobCard from "@/components/home/JobCard";
import { latestJobs } from "@/data/dummyJobs";

export default function LatestJobs() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Lowongan Terbaru
          </h2>
          <p className="mt-2 text-slate-600">
            Peluang kerja yang baru saja dibuka untukmu.
          </p>
        </div>

        {latestJobs.length > 0 ? (
          <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {latestJobs.map((job) => (
              <li key={job.id}>
                <JobCard job={job} />
              </li>
            ))}
          </ul>
        ) : (
          // Empty state (wajib sesuai Technical Requirements)
          <p className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
            Belum ada lowongan yang tersedia saat ini.
          </p>
        )}

        <div className="mt-10 text-center">
          <Link
            href="/lowongan"
            className="inline-block rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            Lihat Semua Lowongan
          </Link>
        </div>
      </div>
    </section>
  );
}
