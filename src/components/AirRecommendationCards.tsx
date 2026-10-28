'use client';

import { useState, useEffect } from 'react';
import { Smile, AlertTriangle } from 'lucide-react';
import { AirStationRanking } from '@/lib/mockData';

export default function AirRecommendationCards({
  best,
  worst,
  lastUpdate,
}: {
  best?: AirStationRanking[];
  worst?: AirStationRanking[];
  lastUpdate?: string;
}) {
  const [currentDateString, setCurrentDateString] = useState('');

  useEffect(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = now.toLocaleDateString('id-ID', options);
    const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    setCurrentDateString(`${dateStr} ${timeStr} WIB`);
  }, []);

  const topBest = best && best.length > 0 ? best[0] : { kecamatan: 'Tj. Priok', lokasi: 'SDN 12 Sunter Agung', ispu: 16 };
  const topWorst = worst && worst.length > 0 ? worst[worst.length - 1] : { kecamatan: 'Tj. Priok', lokasi: 'RSUD Tanjung Priok', ispu: 174 };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-3 shadow-md">
        <div className="text-[11px] text-slate-400">
          Kualitas Udara Terbaik Hari Ini — <strong className="text-slate-200">{lastUpdate || currentDateString}</strong>
        </div>
        <div className="font-bold text-sm text-slate-200">{topBest.kecamatan}, DKI Jakarta</div>
        <div className="text-xs text-slate-400 truncate">{topBest.lokasi}</div>

        <div className="flex items-center justify-between bg-emerald-950/40 border border-emerald-800/60 p-3 rounded-xl">
          <div>
            <div className="text-2xl font-black text-emerald-400">{topBest.ispu} <span className="text-xs font-normal">ISPU</span></div>
            <div className="text-xs text-emerald-300">Baik | Stasiun DLH Jakarta</div>
          </div>
          <div className="p-2 bg-emerald-500 text-slate-950 rounded-xl">
            <Smile className="w-6 h-6" />
          </div>
        </div>

        <div className="space-y-1 text-xs">
          <strong className="text-slate-300 font-semibold">Rekomendasi Aktivitas:</strong>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            Setiap orang: Kualitas udara sangat baik dan aman. Semua orang dapat melakukan berbagai kegiatan di luar ruangan dengan nyaman.
          </p>
        </div>
      </div>

      <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-3 shadow-md">
        <div className="text-[11px] text-slate-400">
          Kualitas Udara Terburuk Hari Ini — <strong className="text-slate-200">{lastUpdate || currentDateString}</strong>
        </div>
        <div className="font-bold text-sm text-slate-200">{topWorst.kecamatan}, DKI Jakarta</div>
        <div className="text-xs text-slate-400 truncate">{topWorst.lokasi}</div>

        <div className="flex items-center justify-between bg-amber-950/40 border border-amber-800/60 p-3 rounded-xl">
          <div>
            <div className="text-2xl font-black text-amber-400">{topWorst.ispu} <span className="text-xs font-normal">ISPU</span></div>
            <div className="text-xs text-amber-300">Tidak Sehat | Stasiun DLH Jakarta</div>
          </div>
          <div className="p-2 bg-amber-400 text-slate-950 rounded-xl">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        <div className="space-y-1 text-xs">
          <strong className="text-slate-300 font-semibold">Rekomendasi Aktivitas:</strong>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            Kelompok sensitif: Hindari aktivitas di luar ruangan. Gunakan masker N95 jika harus keluar rumah.
          </p>
        </div>
      </div>
    </div>
  );
}