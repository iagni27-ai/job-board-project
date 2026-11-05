import Link from "next/link";

// "as" mengatur level judul supaya urutan heading tetap benar di tiap halaman.
export default function JobListCard({ job, as: Heading = "h2" }) {
  return (
    <article className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-indigo-300 sm:p-5">
      <div
        aria-hidden="true"
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-lg font-semibold ${job.logoColor}`}
      >
        {job.company.charAt(0)}
      </div>

      <div className="min-w-0 flex-1">
        <Heading className="text-base font-semibold text-slate-900">
          <Link
            href={`/lowongan/${job.id}`}
            className="rounded hover:text-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {job.title}
          </Link>
        </Heading>
        <p className="text-sm text-slate-600">{job.company}</p>

        <ul className="mt-3 flex flex-wrap gap-2 text-xs text-slate-700">
          <li className="rounded-full bg-slate-100 px-2.5 py-1">
            {job.location}
          </li>
          <li className="rounded-full bg-slate-100 px-2.5 py-1">{job.type}</li>
          <li className="rounded-full bg-slate-100 px-2.5 py-1">
            {job.category}
          </li>
        </ul>

        <div className="mt-3 flex items-center justify-between gap-4 text-sm">
          <span className="font-medium text-slate-900">{job.salary}</span>
          <span className="text-slate-500">{job.postedAt}</span>
        </div>
      </div>
    </article>
  );
}
