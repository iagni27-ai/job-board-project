import DashboardHome from "@/components/auth/DashboardHome";

export const metadata = { title: "Dashboard Admin" };

export default function AdminDashboardPage() {
  return (
    <DashboardHome
      title="Dashboard Admin"
      description="Moderasi user dan kategori akan tampil di sini (Minggu 4)."
    />
  );
}
