'use client';

import { AirStationRanking } from '@/lib/mockData';
import { Smile, Frown } from 'lucide-react';

export default function AirRanking({
  best,
  worst,
}: {
  best: AirStationRanking[];
  worst: AirStationRanking[];
}) {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold tracking-tight text-slate-100">
        Kualitas Udara Terbaik & Terburuk
      </h2>
      <p className="text-xs text-slate-400">
        Peringkat kualitas udara berdasarkan kecamatan di DKI Jakarta (sumber: udara.jakarta.go.id)
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-1">
        <div className="bg-emerald-950/20 border border-emerald-800/40 p-4 rounded-2xl space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <div className="p-1.5 bg-emerald-500/20 rounded-full">
              <Smile className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <span>Kualitas Udara Terbaik</span>
              <p className="text-[10px] text-emerald-500/80 font-normal">Lokasi dengan udara paling bersih</p>
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {best?.map((item) => (
              <div
                key={item.id}
                className="bg-emerald-600/90 text-white p-2.5 rounded-xl text-center flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="font-bold text-xs truncate">{item.kecamatan}</div>
                  <div className="text-[9px] text-emerald-100 truncate">{item.lokasi}</div>
                </div>
                <div className="text-lg font-black mt-2">{item.ispu}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amber-950/20 border border-amber-800/40 p-4 rounded-2xl space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <div className="p-1.5 bg-amber-500/20 rounded-full">
              <Frown className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <span>Kualitas Udara Terburuk</span>
              <p className="text-[10px] text-amber-500/80 font-normal">Lokasi dengan polusi tertinggi</p>
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {worst?.map((item) => (
              <div
                key={item.id}
                className={`p-2.5 rounded-xl text-center flex flex-col justify-between shadow-sm text-slate-900 ${
                  item.ispu >= 150 ? 'bg-amber-400 font-bold' : 'bg-amber-300 font-semibold'
                }`}
              >
                <div>
                  <div className="font-bold text-xs truncate">{item.kecamatan}</div>
                  <div className="text-[9px] opacity-80 truncate">{item.lokasi}</div>
                </div>
                <div className="text-lg font-black mt-2">{item.ispu}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}