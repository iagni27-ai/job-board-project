// Data dummy tambahan untuk halaman detail lowongan dan profil perusahaan.
// Di Minggu 3 file ini diganti dengan data asli dari API (Zahra).

export const defaultJobDetail = {
  description:
    "Perusahaan sedang mencari kandidat yang siap berkembang bersama tim. Detail lengkap akan dilengkapi oleh perusahaan.",
  responsibilities: [
    "Mengerjakan tugas sesuai posisi bersama tim.",
    "Berkoordinasi dengan rekan kerja dan atasan secara rutin.",
    "Menyampaikan laporan perkembangan pekerjaan.",
  ],
  qualifications: [
    "Mampu bekerja sama dalam tim.",
    "Komunikatif dan bertanggung jawab.",
    "Bersedia belajar hal baru.",
  ],
  deadline: "30 November 2026",
};

export const jobDetails = {
  1: {
    description:
      "Kami mencari Frontend Developer untuk membangun antarmuka aplikasi web yang cepat, responsif, dan mudah digunakan oleh ribuan pengguna.",
    responsibilities: [
      "Membangun halaman web dengan React dan Next.js.",
      "Menerjemahkan desain UI/UX menjadi komponen yang rapi dan dapat dipakai ulang.",
      "Menyambungkan antarmuka dengan API dari tim backend.",
      "Menjaga performa dan aksesibilitas halaman.",
    ],
    qualifications: [
      "Menguasai HTML, CSS, dan JavaScript.",
      "Pernah memakai React atau framework sejenis.",
      "Familiar dengan Tailwind CSS dan Git.",
      "Mahasiswa tingkat akhir atau fresh graduate dipersilakan melamar.",
    ],
    deadline: "30 November 2026",
  },
  2: {
    description:
      "Arunika Studio membuka posisi UI/UX Designer untuk merancang pengalaman digital yang jelas dan nyaman bagi klien dari berbagai bidang.",
    responsibilities: [
      "Membuat wireframe, prototipe, dan desain antarmuka.",
      "Melakukan riset pengguna sederhana dan menguji prototipe.",
      "Menyerahkan desain beserta panduan komponen kepada developer.",
    ],
    qualifications: [
      "Menguasai Figma.",
      "Memahami prinsip desain antarmuka dan aksesibilitas.",
      "Memiliki portofolio dengan minimal dua proyek.",
    ],
    deadline: "25 November 2026",
  },
  3: {
    description:
      "Kopi Senja membutuhkan Digital Marketing Specialist untuk mengelola promosi online dan menumbuhkan komunitas pelanggan.",
    responsibilities: [
      "Merencanakan dan menjalankan kampanye di media sosial.",
      "Membuat kalender konten bulanan bersama tim kreatif.",
      "Menganalisis performa kampanye dan menyusun laporan.",
    ],
    qualifications: [
      "Berpengalaman mengelola akun bisnis di media sosial.",
      "Memahami dasar iklan berbayar dan analitik.",
      "Mampu menulis teks promosi yang jelas.",
    ],
    deadline: "20 November 2026",
  },
};

export const companyProfiles = {
  "Nusantara Digital": {
    industry: "Teknologi Informasi",
    city: "Semarang",
    website: "nusantaradigital.example",
    description:
      "Nusantara Digital adalah perusahaan pengembang perangkat lunak yang membantu bisnis lokal beralih ke layanan digital.",
  },
  "Arunika Studio": {
    industry: "Desain dan Kreatif",
    city: "Yogyakarta",
    website: "arunikastudio.example",
    description:
      "Arunika Studio adalah studio desain yang mengerjakan identitas merek, antarmuka aplikasi, dan konten visual.",
  },
  "Kopi Senja": {
    industry: "Makanan dan Minuman",
    city: "Bandung",
    website: "kopisenja.example",
    description:
      "Kopi Senja adalah jaringan kedai kopi dengan komunitas pelanggan yang aktif di berbagai kota.",
  },
};
