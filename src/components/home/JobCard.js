import Link from "next/link";
import { MapPinIcon } from "@/components/ui/Icons";

export default function JobCard({ job }) {
  const initial = job.company.charAt(0);

  return (
    <article className="group relative flex h-full flex-col rounded-[14px] border border-[#e8e4dc] bg-white p-5 transition-colors duration-150 hover:border-[#1f1b16] shadow-[0_1px_2px_rgba(31,27,22,0.03)]">
      {/* Header Kartu: Monogram & Posisi */}
      <div className="flex items-start gap-3.5">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#e8e4dc] bg-[#fbfaf7] font-mono text-xs font-semibold text-[#1f1b16]"
          aria-hidden="true"
        >
          {initial}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-[#1f1b16]">
            <Link
              href={`/lowongan/${job.id}`}
              className="after:absolute after:inset-0 focus:outline-none focus-visible:after:rounded-[14px] focus-visible:after:ring-2 focus-visible:after:ring-[#1f1b16]"
            >
              {job.title}
            </Link>
          </h3>
          <p className="mt-0.5 text-xs text-[#5e554a]">{job.company}</p>
        </div>
      </div>

      {/* Tag Metadata */}
      <div className="mt-4 flex flex-wrap items-center gap-1.5 text-xs">
        <span className="inline-flex items-center gap-1 rounded-md border border-[#e8e4dc] bg-[#fbfaf7] px-2 py-0.5 text-[#5e554a]">
          <MapPinIcon className="h-3 w-3 text-[#7b7266]" />
          <span>{job.location}</span>
        </span>
        <span className="rounded-md border border-[#e8e4dc] bg-[#fbfaf7] px-2 py-0.5 text-[#5e554a]">
          {job.type}
        </span>
        <span className="rounded-md border border-[#e8e4dc] bg-[#fbfaf7] px-2 py-0.5 text-[#5e554a]">
          {job.category}
        </span>
      </div>

      {/* Kompensasi Gaji & Tanggal Tayang */}
      <div className="mt-auto flex items-center justify-between border-t border-[#f0ede6] pt-4 mt-5 text-xs">
        <span className="font-mono font-medium text-[#1f1b16] tabular-nums">
          {job.salary}
        </span>
        <span className="text-[#7b7266]">{job.postedAt}</span>
      </div>
    </article>
  );
}
