import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Smart Public Service Jakarta - Resilience Dashboard v6.0',
  description: 'Platform Intelijen Ketahanan Perkotaan & Kesehatan Masyarakat DKI Jakarta terintegrasi Live WAQI Jakarta & Pantau Banjir',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-slate-950 text-slate-100 antialiased">{children}</body>
    </html>
  );
}