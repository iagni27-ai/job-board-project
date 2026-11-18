import Link from "next/link";
import JobCard from "@/components/home/JobCard";
import { latestJobs } from "@/data/dummyJobs";
import { ArrowRightIcon } from "@/components/ui/Icons";

export default function LatestJobs() {
  return (
    <section className="bg-[#fbfaf7] py-14 sm:py-18">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="font-mono text-xs font-medium tracking-wider text-[#7b7266] uppercase">
              Pembaruan Berkala
            </div>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-[#1f1b16] sm:text-2xl">
              Lowongan Terkini
            </h2>
            <p className="mt-1.5 text-sm text-[#5e554a]">
              Posisi terverifikasi yang dibuka dalam 7 hari terakhir dengan transparansi gaji.
            </p>
          </div>
          <Link
            href="/lowongan"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#5e554a] transition-colors hover:text-[#1f1b16]"
          >
            <span>Buka arsip lengkap</span>
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
        </div>

        {latestJobs.length > 0 ? (
          <ul className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {latestJobs.map((job) => (
              <li key={job.id}>
                <JobCard job={job} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-7 rounded-[14px] border border-dashed border-[#e8e4dc] bg-white p-10 text-center text-sm text-[#7b7266]">
            Belum ada lowongan terdaftar pada periode ini.
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            href="/lowongan"
            className="inline-flex items-center gap-2 rounded-lg border border-[#1f1b16] bg-[#1f1b16] px-5 py-2.5 text-xs font-medium text-[#faf9f5] transition-colors hover:bg-[#38332b] active:scale-[0.98]"
          >
            <span>Telusuri Semua Lowongan Kerja</span>
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
