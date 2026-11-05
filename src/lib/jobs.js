import { categories, latestJobs } from "@/data/dummyJobs";
import {
  companyProfiles,
  defaultJobDetail,
  jobDetails,
} from "@/data/dummyJobDetails";

export const PAGE_SIZE = 4;

// Dummy belum punya tabel perusahaan, jadi id perusahaan dibuat dari urutan
// kemunculan nama di data lowongan. Minggu 3: pakai id asli dari database.
const companyNames = [...new Set(latestJobs.map((job) => job.company))];

export function getCategories() {
  return categories.map(({ slug, name }) => ({ slug, name }));
}

export function getLocations() {
  return [...new Set(latestJobs.map((job) => job.location))].sort();
}

export function getJobTypes() {
  return [...new Set(latestJobs.map((job) => job.type))];
}

// Minggu 3: ganti isi fungsi-fungsi di bawah dengan pemanggilan API Zahra.
// Bentuk parameter dan hasilnya sengaja dibuat sama supaya halaman tidak berubah.
export async function getJobs(filters = {}) {
  const {
    q = "",
    lokasi = "",
    kategori = [],
    tipe = [],
    urut = "terbaru",
    page = 1,
  } = filters;

  const categoryNames = categories
    .filter((item) => kategori.includes(item.slug))
    .map((item) => item.name);
  const keyword = q.toLowerCase();

  let result = latestJobs.filter((job) => {
    if (kategori.length > 0 && !categoryNames.includes(job.category)) {
      return false;
    }
    if (tipe.length > 0 && !tipe.includes(job.type)) return false;
    if (lokasi && job.location !== lokasi) return false;

    if (keyword) {
      const text = `${job.title} ${job.company} ${job.category}`.toLowerCase();
      if (!text.includes(keyword)) return false;
    }

    return true;
  });

  if (urut === "judul") {
    result = [...result].sort((a, b) => a.title.localeCompare(b.title, "id"));
  }

  const total = result.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;

  return {
    jobs: result.slice(start, start + PAGE_SIZE),
    total,
    totalPages,
    page: currentPage,
  };
}

export async function getJobById(id) {
  const job = latestJobs.find((item) => item.id === id);
  if (!job) return null;

  return {
    ...job,
    ...(jobDetails[job.id] ?? defaultJobDetail),
    companyId: companyNames.indexOf(job.company) + 1,
  };
}

export async function getOtherJobsByCompany(companyName, excludeId) {
  return latestJobs.filter(
    (job) => job.company === companyName && job.id !== excludeId,
  );
}

export async function getCompanyById(id) {
  const name = companyNames[id - 1];
  if (!name) return null;

  const jobs = latestJobs.filter((job) => job.company === name);
  const profile = companyProfiles[name] ?? {};

  return {
    id,
    name,
    industry: profile.industry ?? jobs[0].category,
    city: profile.city ?? jobs[0].location,
    website: profile.website ?? "",
    description:
      profile.description ?? `${name} sedang membuka lowongan baru.`,
    logoColor: jobs[0].logoColor,
    jobs,
  };
}
