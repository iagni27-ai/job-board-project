// Fungsi murni (tanpa "use client") supaya bisa dipakai di server dan client.

export const DEFAULT_FILTERS = {
  q: "",
  lokasi: "",
  kategori: [],
  tipe: [],
  urut: "terbaru",
  page: 1,
};

export function buildQuery(filters) {
  const params = new URLSearchParams();

  if (filters.q) params.set("q", filters.q);
  if (filters.lokasi) params.set("lokasi", filters.lokasi);
  for (const item of filters.kategori ?? []) params.append("kategori", item);
  for (const item of filters.tipe ?? []) params.append("tipe", item);
  if (filters.urut && filters.urut !== "terbaru") {
    params.set("urut", filters.urut);
  }
  if (filters.page && filters.page > 1) {
    params.set("page", String(filters.page));
  }

  return params.toString();
}

export function buildHref(filters) {
  const query = buildQuery(filters);
  return query ? `/lowongan?${query}` : "/lowongan";
}
