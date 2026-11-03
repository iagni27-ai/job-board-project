import DashboardHome from "@/components/auth/DashboardHome";

export const metadata = { title: "Dashboard Pelamar" };

export default function PelamarDashboardPage() {
  return (
    <DashboardHome
      title="Dashboard Pelamar"
      description="Riwayat lamaran dan status lamaran akan tampil di sini (Minggu 3)."
    />
  );
}
