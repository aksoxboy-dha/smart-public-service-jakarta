'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Activity, ShieldAlert, Wind, Stethoscope, MapPin, RefreshCw, Waves } from 'lucide-react';
import { WilayahData, JAKARTA_REGIONS, AirStationRanking } from '@/lib/mockData';
import AirRanking from '@/components/AirRanking';
import AirRecommendationCards from '@/components/AirRecommendationCards';
import ChartsSection from '@/components/ChartsSection';

const JakartaMap = dynamic(() => import('@/components/JakartaMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[380px] bg-slate-900/80 animate-pulse rounded-2xl border border-slate-800 flex items-center justify-center text-slate-500 font-medium text-sm">
      Memuat Peta Sebaran Pemantau Kualitas Udara...
    </div>
  ),
});

export default function DashboardPage() {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [summaryData, setSummaryData] = useState<any>(null);
  const [regionDetails, setRegionDetails] = useState<WilayahData[]>([]);
  const [bpbdData, setBpbdData] = useState<any>(null);
  const [airBest, setAirBest] = useState<AirStationRanking[]>([]);
  const [airWorst, setAirWorst] = useState<AirStationRanking[]>([]);
  const [loadingSync, setLoadingSync] = useState(false);

  const fetchAllData = async () => {
    setLoadingSync(true);
    try {
      const resRes = await fetch('/api/resilience');
      const dataRes = await resRes.json();
      setRegionDetails(dataRes.details);

      const resAir = await fetch('/api/airquality');
      const dataAir = await resAir.json();
      setAirBest(dataAir.bestStations);
      setAirWorst(dataAir.worstStations);

      const resBpbd = await fetch('/api/waterlevel');
      const dataBpbd = await resBpbd.json();
      setBpbdData(dataBpbd);

      setSummaryData({
        avgISPU: 98,
        totalISPA: 1770,
        avgBOR: 78,
        riskScore: 68,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSync(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [selectedRegion]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 space-y-6">
      {/* Header Panel */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-800 shadow-lg gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-400 font-semibold text-xs tracking-wider uppercase">
            <Activity className="w-4 h-4" /> Smart Public Service Jakarta v7.0 (udara.jakarta.go.id Integrated)
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold mt-1 tracking-tight">
            Jakarta Urban & Health Resilience
          </h1>
          <p className="text-slate-400 text-sm mt-0.5">
            Integrasi udara.jakarta.go.id, BPBD Waterlevel, & Pantau Banjir
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchAllData}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-xl text-xs font-semibold border border-slate-700 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingSync ? 'animate-spin' : ''}`} /> Sync Live API
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
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 shadow-md">
          <div className="flex justify-between items-center text-slate-400 text-sm font-medium">
            <span>Rata-Rata ISPU (DLH)</span>
            <Wind className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-bold mt-2 text-amber-400">{summaryData?.avgISPU || '--'}</div>
          <p className="text-xs text-slate-500 mt-1">sumber: udara.jakarta.go.id</p>
        </div>

        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 shadow-md">
          <div className="flex justify-between items-center text-slate-400 text-sm font-medium">
            <span>Total Kasus ISPA</span>
            <Stethoscope className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-3xl font-bold mt-2 text-rose-400">{summaryData?.totalISPA || '--'}</div>
          <p className="text-xs text-slate-500 mt-1">Dinkes DKI Jakarta</p>
        </div>

        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 shadow-md">
          <div className="flex justify-between items-center text-slate-400 text-sm font-medium">
            <span>Kapasitas BOR RS</span>
            <Activity className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-bold mt-2 text-blue-400">{summaryData?.avgBOR || '--'}%</div>
          <p className="text-xs text-slate-500 mt-1">Faskes DKI Jakarta</p>
        </div>

        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 shadow-md">
          <div className="flex justify-between items-center text-slate-400 text-sm font-medium">
            <span>Resilience Risk Score</span>
            <ShieldAlert className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold mt-2 text-emerald-400">{summaryData?.riskScore || '--'}/100</div>
          <p className="text-xs text-slate-500 mt-1">Status Risiko Terpadu</p>
        </div>
      </div>

      {/* Kualitas Udara Terbaik & Terburuk Section (Fitur udara.jakarta.go.id) */}
      <AirRanking best={airBest} worst={airWorst} />

      {/* Main Grid: Peta Sebaran & Air Recommendation Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-lg font-bold tracking-tight">
            Peta Sebaran Pemantau Kualitas Udara & Banjir
          </h2>
          <JakartaMap data={regionDetails} floodPoints={bpbdData?.floodPoints || []} />
        </div>

        <div>
          <AirRecommendationCards />
        </div>
      </div>

      {/* Analytics Recharts */}
      <ChartsSection
        liveAqi={summaryData?.avgISPU || 98}
        liveIspa={summaryData?.totalISPA || 1770}
        liveBor={summaryData?.avgBOR || 78}
        regionData={regionDetails}
      />
    </main>
  );
}