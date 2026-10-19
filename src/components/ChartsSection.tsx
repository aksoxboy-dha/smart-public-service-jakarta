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
  trends,
  regionData,
}: {
  trends: any[];
  regionData: WilayahData[];
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 shadow-md">
        <h3 className="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2">
          📈 Tren Kualitas Udara (ISPU) vs Kasus ISPA (Monthly)
        </h3>
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="bulan" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
              />
              <Legend />
              <Line type="monotone" dataKey="ispu" stroke="#f59e0b" name="Indeks ISPU" strokeWidth={2} />
              <Line type="monotone" dataKey="ispa" stroke="#f43f5e" name="Kasus ISPA" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 shadow-md">
        <h3 className="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2">
          📊 Perbandingan Indikator Risiko Per Wilayah Jakarta
        </h3>
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={regionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="nama" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
              />
              <Legend />
              <Bar dataKey="ispu" fill="#f59e0b" name="ISPU" radius={[4, 4, 0, 0]} />
              <Bar dataKey="bedOccupancy" fill="#3b82f6" name="BOR RS (%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}