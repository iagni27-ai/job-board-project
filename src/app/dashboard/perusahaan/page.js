import DashboardHome from "@/components/auth/DashboardHome";

export const metadata = { title: "Dashboard Perusahaan" };

export default function PerusahaanDashboardPage() {
  return (
    <DashboardHome
      title="Dashboard Perusahaan"
      description="Daftar lowongan dan pendaftar akan tampil di sini (Minggu 3)."
    />
  );
}
