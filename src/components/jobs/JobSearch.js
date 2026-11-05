"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { jobSearchSchema } from "@/lib/validation/jobSearch";
import { buildHref } from "@/lib/jobQuery";

const fieldClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-2 focus:outline-offset-0 focus:outline-indigo-200";
const checkboxClass =
  "h-4 w-4 rounded border-slate-300 text-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
const secondaryButtonClass =
  "rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70";

function CheckboxGroup({ legend, name, options, selected, onToggle }) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-slate-900">{legend}</legend>
      <div className="mt-2 space-y-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-2 text-sm text-slate-700"
          >
            <input
              type="checkbox"
              checked={selected.includes(option.value)}
              onChange={() => onToggle(name, option.value)}
              className={checkboxClass}
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

// Menampilkan bar pencarian, panel filter, dan hasil ({children}) dalam satu tata letak.
export default function JobSearch({
  categories,
  locations,
  types,
  initial,
  children,
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [values, setValues] = useState(initial);
  const [error, setError] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);

  // Samakan isian dengan URL saat berubah dari luar (misalnya tombol Back).
  const initialKey = JSON.stringify(initial);
  const [syncedKey, setSyncedKey] = useState(initialKey);
  if (syncedKey !== initialKey) {
    setSyncedKey(initialKey);
    setValues(initial);
  }

  // Tombol Esc menutup panel filter di HP.
  useEffect(() => {
    if (!sheetOpen) return undefined;
    function handleKey(event) {
      if (event.key === "Escape") setSheetOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [sheetOpen]);

  function apply(next) {
    const result = jobSearchSchema.safeParse({
      ...next,
      urut: initial.urut,
      page: 1,
    });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setError("");
    startTransition(() => {
      router.push(buildHref(result.data));
    });
  }

  function handleText(event) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    apply(values);
  }

  function handleToggle(name, value) {
    const current = values[name];
    const list = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];
    const next = { ...values, [name]: list };

    setValues(next);
    apply(next);
  }

  function handleReset() {
    setValues({ ...values, q: "", lokasi: "", kategori: [], tipe: [] });
    setError("");
    setSheetOpen(false);
    startTransition(() => {
      router.push("/lowongan");
    });
  }

  const activeCount = values.kategori.length + values.tipe.length;

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        noValidate
        role="search"
        aria-label="Cari lowongan"
        className="grid gap-3 sm:grid-cols-[1fr_12rem_auto]"
      >
        <div>
          <label htmlFor="q" className="sr-only">
            Kata kunci
          </label>
          <input
            id="q"
            name="q"
            type="search"
            value={values.q}
            onChange={handleText}
            placeholder="Posisi, perusahaan, atau bidang"
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? "search-error" : undefined}
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="lokasi" className="sr-only">
            Lokasi
          </label>
          <select
            id="lokasi"
            name="lokasi"
            value={values.lokasi}
            onChange={handleText}
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

        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-wait disabled:opacity-70"
        >
          {isPending ? "Mencari..." : "Cari lowongan"}
        </button>
      </form>

      {error && (
        <p id="search-error" role="alert" className="mt-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="mt-4 lg:hidden">
        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          aria-expanded={sheetOpen}
          aria-controls="filter-panel"
          className={secondaryButtonClass}
        >
          {activeCount > 0 ? `Filter (${activeCount})` : "Filter"}
        </button>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[16rem_1fr]">
        {sheetOpen && (
          <div
            aria-hidden="true"
            onClick={() => setSheetOpen(false)}
            className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden"
          />
        )}

        <aside
          id="filter-panel"
          aria-label="Filter lowongan"
          className={`${
            sheetOpen
              ? "fixed inset-x-0 bottom-0 z-40 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-white p-5 shadow-xl"
              : "hidden"
          } space-y-6 lg:static lg:block lg:max-h-none lg:rounded-xl lg:border lg:border-slate-200 lg:bg-white lg:p-5 lg:shadow-none`}
        >
          <CheckboxGroup
            legend="Kategori"
            name="kategori"
            options={categories.map((item) => ({
              value: item.slug,
              label: item.name,
            }))}
            selected={values.kategori}
            onToggle={handleToggle}
          />

          <CheckboxGroup
            legend="Tipe kerja"
            name="tipe"
            options={types.map((item) => ({ value: item, label: item }))}
            selected={values.tipe}
            onToggle={handleToggle}
          />

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleReset}
              disabled={isPending}
              className={secondaryButtonClass}
            >
              Reset filter
            </button>
            <button
              type="button"
              onClick={() => setSheetOpen(false)}
              className={`${secondaryButtonClass} lg:hidden`}
            >
              Tutup
            </button>
          </div>
        </aside>

        <div
          aria-busy={isPending}
          className={`min-w-0 transition-opacity ${isPending ? "opacity-60" : ""}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
