import Link from "next/link";
import { buildHref } from "@/lib/jobQuery";

const baseClass =
  "rounded-lg border px-3 py-1.5 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
const linkClass = `${baseClass} border-slate-300 text-slate-700 hover:bg-slate-50`;

// Dengan data asli yang halamannya banyak, tambahkan penyingkatan (1 2 ... 9 10).
export default function Pagination({ filters, page, totalPages }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav
      aria-label="Halaman hasil"
      className="mt-8 flex flex-wrap items-center justify-center gap-2"
    >
      {page > 1 && (
        <Link
          href={buildHref({ ...filters, page: page - 1 })}
          rel="prev"
          className={linkClass}
        >
          Sebelumnya
        </Link>
      )}

      {pages.map((number) =>
        number === page ? (
          <span
            key={number}
            aria-current="page"
            className={`${baseClass} border-indigo-600 bg-indigo-600 text-white`}
          >
            {number}
          </span>
        ) : (
          <Link
            key={number}
            href={buildHref({ ...filters, page: number })}
            className={linkClass}
          >
            {number}
          </Link>
        ),
      )}

      {page < totalPages && (
        <Link
          href={buildHref({ ...filters, page: page + 1 })}
          rel="next"
          className={linkClass}
        >
          Berikutnya
        </Link>
      )}
    </nav>
  );
}
