import Link from "next/link";

export default function JobCard({ job }) {
  // Huruf awal perusahaan dipakai sebagai logo sementara
  const initial = job.company.charAt(0);

  return (
    <article className="relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-indigo-300 hover:shadow-md">
      <div className="flex items-start gap-4">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg font-bold ${job.logoColor}`}
          aria-hidden="true"
        >
          {initial}
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-slate-900">
            {/* after:absolute membuat seluruh kartu bisa diklik */}
            <Link
              href={`/lowongan/${job.id}`}
              className="after:absolute after:inset-0 focus:outline-none focus-visible:after:rounded-2xl focus-visible:after:ring-2 focus-visible:after:ring-indigo-400"
            >
              {job.title}
            </Link>
          </h3>
          <p className="mt-0.5 text-sm text-slate-600">{job.company}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">
          📍 {job.location}
        </span>
        <span className="rounded-full bg-indigo-50 px-3 py-1 font-medium text-indigo-700">
          {job.type}
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">
          {job.category}
        </span>
      </div>

      <div className="mt-auto flex items-center justify-between pt-5 text-sm">
        <span className="font-semibold text-slate-900">{job.salary}</span>
        <span className="text-slate-500">{job.postedAt}</span>
      </div>
    </article>
  );
}
