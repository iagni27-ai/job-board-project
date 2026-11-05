"use client";

// Menangkap error tak terduga di halaman /lowongan dan sub-halamannya.
export default function LowonganError({ reset }) {
  return (
    <div role="alert" className="mx-auto max-w-xl px-4 py-20 text-center">
      <h2 className="text-xl font-semibold text-slate-900">
        Halaman lowongan gagal dimuat
      </h2>
      <p className="mt-2 text-slate-600">
        Terjadi kesalahan saat memuat data. Muat ulang halaman ini untuk
        mencoba lagi.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-6 rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Coba lagi
      </button>
    </div>
  );
}
