import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

export const metadata = {
  title: {
    default: "JobBoard – Bursa Lowongan Kerja Terkurasi",
    template: "%s | JobBoard",
  },
  description:
    "Bursa lowongan kerja terkurasi untuk talenta profesional di Indonesia dengan keterbukaan standar gaji dan verifikasi perusahaan.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-[#fbfaf7] text-[#1f1b16]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
