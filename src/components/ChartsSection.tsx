'use client';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { WilayahData } from '@/lib/mockData';

export default function ChartsSection({
  liveAqi,
  liveIspa,
  liveBor,
  regionData,
}: {
  liveAqi: number;
  liveIspa: number;
  liveBor: number;
  regionData: WilayahData[];
}) {
  const dynamicTrends = [
    { bulan: 'Mei', ispu: 65, ispa: 1200 },
    { bulan: 'Jun', ispu: 75, ispa: 1300 },
    { bulan: 'Jul', ispu: 85, ispa: 1450 },
    { bulan: 'Agt', ispu: 95, ispa: 1600 },
    { bulan: 'Sep', ispu: 90, ispa: 1550 },
    { bulan: 'Okt (Live)', ispu: liveAqi, ispa: liveIspa },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 shadow-md">
        <h3 className="text-sm font-bold text-slate-200 mb-4">
          📈 Tren ISPU (udara.jakarta.go.id) vs Kasus ISPA
        </h3>
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dynamicTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="bulan" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }} />
              <Legend />
              <Line type="monotone" dataKey="ispu" stroke="#f59e0b" name="Indeks ISPU DLH" strokeWidth={2} />
              <Line type="monotone" dataKey="ispa" stroke="#f43f5e" name="Kasus ISPA" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 shadow-md">
        <h3 className="text-sm font-bold text-slate-200 mb-4">
          📊 Perbandingan Indikator ISPU DLH & BOR RS Per Wilayah
        </h3>
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={regionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="nama" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }} />
              <Legend />
              <Bar dataKey="ispu" fill="#f59e0b" name="ISPU DLH" radius={[4, 4, 0, 0]} />
              <Bar dataKey="bedOccupancy" fill="#3b82f6" name="BOR RS (%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}