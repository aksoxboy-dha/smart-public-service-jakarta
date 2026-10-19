'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Activity, ShieldAlert, Wind, Droplets, Stethoscope, FileText, MapPin, Waves, AlertTriangle, RefreshCw } from 'lucide-react';
import { WilayahData, JAKARTA_REGIONS } from '@/lib/mockData';
import ChartsSection from '@/components/ChartsSection';

const JakartaMap = dynamic(() => import('@/components/JakartaMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[380px] bg-slate-900/80 animate-pulse rounded-2xl border border-slate-800 flex items-center justify-center text-slate-500 font-medium text-sm">
      Memuat Peta Spasial Risiko Jakarta...
    </div>
  ),
});

export default function DashboardPage() {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [summaryData, setSummaryData] = useState<any>(null);
  const [regionDetails, setRegionDetails] = useState<WilayahData[]>([]);
  const [trends, setTrends] = useState<any[]>([]);
  const [floodData, setFloodData] = useState<any>(null);
  const [loadingFlood, setLoadingFlood] = useState(false);

  const fetchAllData = () => {
    fetch(`/api/resilience?region=${selectedRegion}`)
      .then((res) => res.json())
      .then((data) => {
        setSummaryData(data.summary);
        setRegionDetails(data.details);
        setTrends(data.trends);
      });

    setLoadingFlood(true);
    fetch('/api/flood')
      .then((res) => res.json())
      .then((data) => {
        setFloodData(data);
        setLoadingFlood(false);
      });
  };

  useEffect(() => {
    fetchAllData();
  }, [selectedRegion]);

  // Dynamic Policy Generator berdasarkan real-time threshold
  const generatePolicies = () => {
    const policies = [];
    if (summaryData?.avgISPU > 120) {
      policies.push({
        type: 'air',
        title: '⚠️ Intervensi Kualitas Udara (ISPU High)',
        text: `Indeks ISPU rata-rata (${summaryData.avgISPU}) masuk kategori Tidak Sehat. Direkomendasikan pengetatan uji emisi kendaraan & imbauan masker outdoor.`,
        bg: 'bg-amber-950/30 border-amber-800/50 text-amber-300',
      });
    }

    const siaga2Gates = floodData?.pintuAir?.filter((p: any) => p.status === 'Siaga 2' || p.status === 'Siaga 1');
    if (siaga2Gates && siaga2Gates.length > 0) {
      policies.push({
        type: 'flood',
        title: '🌊 Kesiapsiagaan Darurat Pintu Air',
        text: `Terdeteksi status ${siaga2Gates.map((g: any) => g.nama).join(', ')} pada tingkat ${siaga2Gates[0].status}. Pengerahan pompa mobile Dinas SDA di area DAS aktif!`,
        bg: 'bg-rose-950/30 border-rose-800/50 text-rose-300',
      });
    } else {
      policies.push({
        type: 'flood',
        title: '🌊 Kesiapsiagaan Pintu Air & Banjir',
        text: 'Pos Pantau Manggarai & Sunter III terpantau Siaga 3. Siapkan pompa stasioner dan pemantauan debit hulu.',
        bg: 'bg-blue-950/30 border-blue-800/50 text-blue-300',
      });
    }

    if (summaryData?.avgBOR > 75) {
      policies.push({
        type: 'health',
        title: '🏥 Optimalisasi Rujukan Faskes',
        text: `Rata-rata BOR RSUD Jakarta mencapai ${summaryData.avgBOR}%. Aktivasi rujukan berjenjang ke Puskesmas Kecamatan untuk menekan antrean.`,
        bg: 'bg-emerald-950/30 border-emerald-800/50 text-emerald-300',
      });
    }

    return policies;
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 space-y-6">
      {/* Header Panel */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-800 shadow-lg gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-400 font-semibold text-xs tracking-wider uppercase">
            <Activity className="w-4 h-4" /> Smart Public Service Jakarta v3.0
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold mt-1 tracking-tight">
            Jakarta Urban & Health Resilience
          </h1>
          <p className="text-slate-400 text-sm mt-0.5">
            Integrasi Live API Open Data DKI Jakarta, Sensor Lingkungan, & Policy Automation
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchAllData}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-xl text-xs font-semibold border border-slate-700 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingFlood ? 'animate-spin' : ''}`} /> Refresh Live Data
          </button>

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

      {/* Main Grid: Map & Automated Policy Recommendation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-lg font-bold flex items-center gap-2 tracking-tight">
            <Droplets className="w-5 h-5 text-blue-400" /> Peta Spasial Kesiapsiagaan Wilayah
          </h2>
          <JakartaMap data={regionDetails} />
        </div>

        {/* Dynamic Automated Policy Panel */}
        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-md space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2 text-amber-400 tracking-tight">
            <FileText className="w-5 h-5" /> Automated Policy Recommendation
          </h2>
          <div className="space-y-3 text-xs leading-relaxed">
            {generatePolicies().map((policy, idx) => (
              <div key={idx} className={`p-3.5 border rounded-xl space-y-1 ${policy.bg}`}>
                <strong className="block font-semibold">{policy.title}</strong>
                <p className="text-slate-300">{policy.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Analytics Charts Section */}
      <ChartsSection trends={trends} regionData={regionDetails} />

      {/* Real-time Pantau Banjir API Table */}
      <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-md space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold flex items-center gap-2 text-blue-400 tracking-tight">
            <Waves className="w-5 h-5" /> Live Data Pos Pantau Pintu Air (SDA Jakarta API)
          </h2>
          <span className="text-xs text-slate-400">RT Terdampak: <strong className="text-rose-400">{floodData?.rtTerdampak || 0} RT</strong></span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/40">
                <th className="p-3">ID Pos</th>
                <th className="p-3">Nama Pintu Air</th>
                <th className="p-3">Lokasi</th>
                <th className="p-3">Ketinggian Air (cm)</th>
                <th className="p-3">Status Siaga</th>
                <th className="p-3">Waktu Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {floodData?.pintuAir?.map((pa: any) => (
                <tr key={pa.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-3 font-mono text-slate-400">{pa.id}</td>
                  <td className="p-3 font-semibold text-slate-200">{pa.nama}</td>
                  <td className="p-3">{pa.lokasi}</td>
                  <td className="p-3 font-bold text-amber-400">{pa.ketinggian} cm</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full font-semibold text-[10px] ${
                      pa.status === 'Siaga 1' ? 'bg-rose-950 text-rose-400 border border-rose-800 animate-pulse' :
                      pa.status === 'Siaga 2' ? 'bg-rose-950 text-rose-400 border border-rose-800' :
                      pa.status === 'Siaga 3' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                      'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    }`}>
                      {pa.status}
                    </span>
                  </td>
                  <td className="p-3 text-slate-400">{pa.lastUpdate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}