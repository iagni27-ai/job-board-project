import { categories, latestJobs } from "@/data/dummyJobs";

export function getCategories() {
  return categories.map(({ slug, name }) => ({ slug, name }));
}

export function getLocations() {
  return [...new Set(latestJobs.map((job) => job.location))].sort();
}

// Minggu 3: ganti isi fungsi ini dengan pemanggilan API dari Zahra.
// Bentuk parameter dan hasilnya sengaja dibuat sama supaya halaman tidak perlu diubah.
export async function getJobs({ q = "", kategori = "", lokasi = "" } = {}) {
  const categoryName = categories.find((item) => item.slug === kategori)?.name;
  const keyword = q.toLowerCase();

  return latestJobs.filter((job) => {
    if (kategori && job.category !== categoryName) return false;
    if (lokasi && job.location !== lokasi) return false;

    if (keyword) {
      const text = ${job.title} ${job.company} ${job.category}.toLowerCase();
      if (!text.includes(keyword)) return false;
    }

    return true;
  });
}