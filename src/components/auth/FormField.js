// Field form dengan label, pesan error, dan petunjuk (hint) yang terhubung ke
// input lewat aria-describedby. Prop "suffix" menampilkan elemen di dalam sisi
// kanan input (dipakai tombol lihat/sembunyikan password).
export default function FormField({ id, label, error, hint, suffix, ...inputProps }) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ");

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative mt-1">
        <input
          id={id}
          name={id}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={describedBy || undefined}
          className={`h-11 w-full rounded-lg border px-3 text-slate-900 focus:outline-none focus:ring-2 ${
            suffix ? "pr-20" : ""
          } ${
            error
              ? "border-red-400 focus:ring-red-200"
              : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-200"
          }`}
          {...inputProps}
        />
        {suffix && <div className="absolute inset-y-0 right-0 flex items-center pr-2">{suffix}</div>}
      </div>
      {hint && !error && (
        <p id={hintId} className="mt-1 text-xs text-slate-500">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
