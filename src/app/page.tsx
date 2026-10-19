'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Activity, ShieldAlert, Wind, Droplets, Stethoscope, FileText, MapPin } from 'lucide-react';
import { WilayahData, JAKARTA_REGIONS } from '@/lib/mockData';

const JakartaMap = dynamic(() => import('@/components/JakartaMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[420px] bg-slate-900/80 animate-pulse rounded-2xl border border-slate-800 flex items-center justify-center text-slate-500 font-medium text-sm">
      Memuat Peta Spasial Risiko Jakarta...
    </div>
  ),
});

export default function DashboardPage() {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [summaryData, setSummaryData] = useState<any>(null);
  const [regionDetails, setRegionDetails] = useState<WilayahData[]>([]);

  useEffect(() => {
    fetch(`/api/resilience?region=${selectedRegion}`)
      .then((res) => res.json())
      .then((data) => {
        setSummaryData(data.summary);
        setRegionDetails(data.details);
      });
  }, [selectedRegion]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 space-y-6">
      {/* Header Panel */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-800 shadow-lg gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-400 font-semibold text-xs tracking-wider uppercase">
            <Activity className="w-4 h-4" /> Smart Public Service Jakarta
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold mt-1 tracking-tight">
            Jakarta Urban & Health Resilience
          </h1>
          <p className="text-slate-400 text-sm mt-0.5">
            Integrasi Open Data DKI Jakarta, Sensor Lingkungan, & Sistem Risiko Kesehatan
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700">
          <MapPin className="w-4 h-4 text-slate-400 ml-2" />
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="bg-transparent text-slate-100 pr-4 py-1.5 rounded-lg text-sm focus:outline-none cursor-pointer"
          >
            <option value="all" className="bg-slate-900">Seluruh Wilayah DKI Jakarta</option>
            {JAKARTA_REGIONS.map((r) => (
              <option key={r.id} value={r.id} className="bg-slate-900">{r.nama}</option>
            ))}
          </select>
        </div>
      </header>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800/80 shadow-md">
          <div className="flex justify-between items-center text-slate-400 text-sm font-medium">
            <span>Rata-Rata ISPU</span>
            <Wind className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-bold mt-2 text-amber-400">{summaryData?.avgISPU || '--'}</div>
          <p className="text-xs text-slate-500 mt-1">Kategori: Tidak Sehat (DLH Jakarta)</p>
        </div>

        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800/80 shadow-md">
          <div className="flex justify-between items-center text-slate-400 text-sm font-medium">
            <span>Total Kasus ISPA</span>
            <Stethoscope className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-3xl font-bold mt-2 text-rose-400">{summaryData?.totalISPA || '--'}</div>
          <p className="text-xs text-slate-500 mt-1">Dinkes DKI Jakarta (Bulan Ini)</p>
        </div>

        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800/80 shadow-md">
          <div className="flex justify-between items-center text-slate-400 text-sm font-medium">
            <span>Kapasitas BOR RS</span>
            <Activity className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-bold mt-2 text-blue-400">{summaryData?.avgBOR || '--'}%</div>
          <p className="text-xs text-slate-500 mt-1">Keterisian Tempat Tidur Faskes</p>
        </div>

        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800/80 shadow-md">
          <div className="flex justify-between items-center text-slate-400 text-sm font-medium">
            <span>Resilience Risk Score</span>
            <ShieldAlert className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold mt-2 text-emerald-400">{summaryData?.riskScore || '--'}/100</div>
          <p className="text-xs text-slate-500 mt-1">Status Risiko Perkotaan Terpadu</p>
        </div>
      </div>

      {/* Main Grid: Map & Policy Recommendation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-lg font-bold flex items-center gap-2 tracking-tight">
            <Droplets className="w-5 h-5 text-blue-400" /> Peta Spasial Kesiapsiagaan Wilayah
          </h2>
          <JakartaMap data={regionDetails} />
        </div>

        {/* Policy Panel */}
        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-md space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2 text-amber-400 tracking-tight">
            <FileText className="w-5 h-5" /> Policy Recommendation Panel
          </h2>
          <div className="space-y-3 text-xs leading-relaxed text-slate-300">
            <div className="p-3.5 bg-amber-950/30 border border-amber-800/50 rounded-xl space-y-1">
              <strong className="text-amber-300 block font-semibold">⚠️ Intervensi Kualitas Udara (ISPU High)</strong>
              <p className="text-slate-400">Rekomendasi pengetatan uji emisi kendaraan di area Jakarta Utara & Timur. Himbauan penggunaan masker outdoor untuk kelompok rentan.</p>
            </div>
            <div className="p-3.5 bg-blue-950/30 border border-blue-800/50 rounded-xl space-y-1">
              <strong className="text-blue-300 block font-semibold">🌊 Kesiapsiagaan Pintu Air & Banjir</strong>
              <p className="text-slate-400">Pintu Air Manggarai dan Sunter mendekati Siaga 2. Mobilisasi armada pompa mobile Dinas SDA ke area rawan genangan.</p>
            </div>
            <div className="p-3.5 bg-emerald-950/30 border border-emerald-800/50 rounded-xl space-y-1">
              <strong className="text-emerald-300 block font-semibold">🏥 Optimalisasi Rujukan Faskes</strong>
              <p className="text-slate-400">Aktivasi rujukan berjenjang ke Puskesmas Kecamatan untuk menekan lonjakan BOR di RSUD yang melampaui 80%.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}