import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Smart Public Service Jakarta - Resilience Dashboard v7.2',
  description: 'Platform Intelijen Perkotaan Terpadu DKI Jakarta dengan Seluruh Modul Terintegrasi',
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