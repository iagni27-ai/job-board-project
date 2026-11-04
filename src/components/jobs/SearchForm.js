"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { jobSearchSchema } from "@/lib/validation/jobSearch";

const fieldClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-2 focus:outline-offset-0 focus:outline-indigo-200";

export default function SearchForm({ categories, locations, initial }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [values, setValues] = useState(initial);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function goTo(filters) {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(filters)) {
      if (value) params.set(key, value);
    }
    const query = params.toString();

    startTransition(() => {
      router.push(query ? /lowongan?${query} : "/lowongan");
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const result = jobSearchSchema.safeParse(values);
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setError("");
    goTo(result.data);
  }

  function handleReset() {
    setValues({ q: "", kategori: "", lokasi: "" });
    setError("");
    goTo({});
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      role="search"
      aria-label="Cari lowongan"
      className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5"
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="sm:col-span-3">
          <label
            htmlFor="q"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Kata kunci
          </label>
          <input
            id="q"
            name="q"
            type="search"
            value={values.q}
            onChange={handleChange}
            placeholder="Posisi, perusahaan, atau bidang"
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? "search-error" : undefined}
            className={fieldClass}
          />
        </div>

        <div>
          <label
            htmlFor="kategori"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Kategori
          </label>
          <select
            id="kategori"
            name="kategori"
            value={values.kategori}
            onChange={handleChange}
            className={fieldClass}
          >
            <option value="">Semua kategori</option>
            {categories.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="lokasi"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Lokasi
          </label>
          <select
            id="lokasi"
            name="lokasi"
            value={values.lokasi}
            onChange={handleChange}
            className={fieldClass}
          >
            <option value="">Semua lokasi</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end gap-2">
          <button
            type="submit"
            disabled={isPending}
            className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-wait disabled:opacity-70"
          >
            {isPending ? "Mencari..." : "Cari lowongan"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            disabled={isPending}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70"
          >
            Reset
          </button>
        </div>
      </div>

      {error && (
        <p
          id="search-error"
          role="alert"
          className="mt-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}
    </form>
  );
}