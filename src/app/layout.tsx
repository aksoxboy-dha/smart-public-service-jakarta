import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Smart Public Service Jakarta - Urban Resilience Dashboard v3.0',
  description: 'Platform Intelijen Ketahanan Perkotaan & Kesehatan Masyarakat DKI Jakarta dengan Real-Time Live Data',
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