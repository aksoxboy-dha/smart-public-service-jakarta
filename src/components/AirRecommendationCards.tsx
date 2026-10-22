'use client';

import { Smile, AlertTriangle } from 'lucide-react';

export default function AirRecommendationCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Terbaik Hari Ini */}
      <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-3">
        <div className="text-[11px] text-slate-400">
          Kualitas Udara Terbaik Hari Ini — <strong className="text-slate-200">Kamis, 22 Oktober 2026 11.00 WIB</strong>
        </div>
        <div className="font-bold text-sm text-slate-200">Tanjung Priok, Jakarta Utara</div>
        <div className="text-xs text-slate-400">DKI44 SDN 12 Sunter Agung</div>

        <div className="flex items-center justify-between bg-emerald-950/40 border border-emerald-800/60 p-3 rounded-xl">
          <div>
            <div className="text-2xl font-black text-emerald-400">16 <span className="text-xs font-normal">ISPU</span></div>
            <div className="text-xs text-emerald-300">Baik | PM2.5 16 µg/m³</div>
          </div>
          <div className="p-2 bg-emerald-500 text-slate-950 rounded-xl">
            <Smile className="w-6 h-6" />
          </div>
        </div>

        <div className="space-y-1 text-xs">
          <strong className="text-slate-300 font-semibold">Rekomendasi Aktivitas:</strong>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            Setiap orang: Kualitas udara sangat baik dan aman. Semua orang dapat melakukan berbagai kegiatan di luar ruangan dengan nyaman tanpa risiko gangguan kesehatan.
          </p>
        </div>
      </div>

      {/* Terburuk Hari Ini */}
      <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-3">
        <div className="text-[11px] text-slate-400">
          Kualitas Udara Terburuk Hari Ini — <strong className="text-slate-200">Kamis, 22 Oktober 2026 11.00 WIB</strong>
        </div>
        <div className="font-bold text-sm text-slate-200">Tanjung Priok, Jakarta Utara</div>
        <div className="text-xs text-slate-400">DKI41 RSUD Tanjung Priok (ROOFTOP)</div>

        <div className="flex items-center justify-between bg-amber-950/40 border border-amber-800/60 p-3 rounded-xl">
          <div>
            <div className="text-2xl font-black text-amber-400">174 <span className="text-xs font-normal">ISPU</span></div>
            <div className="text-xs text-amber-300">Tidak Sehat | PM2.5 174 µg/m³</div>
          </div>
          <div className="p-2 bg-amber-400 text-slate-950 rounded-xl">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        <div className="space-y-1 text-xs">
          <strong className="text-slate-300 font-semibold">Rekomendasi Aktivitas:</strong>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            Kelompok sensitif: Hindari aktivitas di luar ruangan. Gunakan masker N95 jika harus keluar. Pastikan ruangan memiliki filter udara yang baik.
          </p>
        </div>
      </div>
    </div>
  );
}