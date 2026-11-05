"use client";

import { useRouter } from "next/navigation";
import { buildHref } from "@/lib/jobQuery";

export default function SortSelect({ filters }) {
  const router = useRouter();

  function handleChange(event) {
    router.push(buildHref({ ...filters, urut: event.target.value, page: 1 }));
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <label htmlFor="urut" className="text-slate-600">
        Urutkan
      </label>
      <select
        id="urut"
        value={filters.urut}
        onChange={handleChange}
        className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-900 focus:border-indigo-600 focus:outline-2 focus:outline-indigo-200"
      >
        <option value="terbaru">Terbaru</option>
        <option value="judul">Judul (A-Z)</option>
      </select>
    </div>
  );
}
