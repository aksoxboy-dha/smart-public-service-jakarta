'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Activity, ShieldAlert, Wind, Stethoscope, MapPin, RefreshCw, Waves, FileText, AlertTriangle, Radio, TrendingUp } from 'lucide-react';
import { WilayahData, JAKARTA_REGIONS, AirStationRanking, BPBDWaterLevel, StasiunData } from '@/lib/mockData';
import AirRanking from '@/components/AirRanking';
import AirRecommendationCards from '@/components/AirRecommendationCards';
import ChartsSection from '@/components/ChartsSection';

const JakartaMap = dynamic(() => import('@/components/JakartaMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[380px] bg-slate-900/80 animate-pulse rounded-2xl border border-slate-800 flex items-center justify-center text-slate-500 font-medium text-sm">
      Memuat Peta Sebaran Pemantau Kualitas Udara & Pantau Banjir...
    </div>
  ),
});

export default function DashboardPage() {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [activeTab, setActiveTab] = useState<'all' | 'ispa' | 'flood' | 'dbd'>('all');
  const [summaryData, setSummaryData] = useState<any>(null);
  const [regionDetails, setRegionDetails] = useState<WilayahData[]>([]);
  const [stations, setStations] = useState<StasiunData[]>([]);
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
      setStations(dataRes.stations || []);

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

  const generatePolicies = () => {
    const policies = [];

    if (summaryData?.avgISPU > 100) {
      policies.push({
        type: 'air',
        title: '⚠️ Intervensi Kualitas Udara (udara.jakarta.go.id Alert)',
        text: `Indeks ISPU DLH DKI Jakarta (${summaryData.avgISPU}) Tidak Sehat. Pengetatan emisi kendaraan & imbauan masker outdoor.`,
        bg: 'bg-amber-950/30 border-amber-800/50 text-amber-300',
      });
    } else {
      policies.push({
        type: 'air',
        title: '🍃 Kualitas Udara Terpantau Sedang (DLH Jakarta)',
        text: `Indeks ISPU Rata-rata DLH DKI Jakarta saat ini (${summaryData?.avgISPU || 98}). Kondisi secara umum aman, kelompok sensitif tetap gunakan pemantauan rutin.`,
        bg: 'bg-emerald-950/30 border-emerald-800/50 text-emerald-300',
      });
    }

    const highBpbd = bpbdData?.waterlevel?.filter((w: BPBDWaterLevel) => w.status === 'Siaga 2' || w.status === 'Siaga 1');
    if (highBpbd && highBpbd.length > 0) {
      policies.push({
        type: 'flood',
        title: '🌊 Peringatan Dini BPBD Waterlevel',
        text: `Terdeteksi status ${highBpbd.map((b: BPBDWaterLevel) => `${b.nama} (${b.status})`).join(', ')}. Penyiapan tanggul portabel & aktivasi sirene BPBD!`,
        bg: 'bg-rose-950/30 border-rose-800/50 text-rose-300',
      });
    } else {
      policies.push({
        type: 'flood',
        title: '🌊 Kesiapsiagaan Banjir & Pintu Air',
        text: 'Pos Pantau Pasar Ikan terpantau Siaga 3 (Pasang Laut). Mobilisasi armada pompa mobile Dinas SDA di lokasi rawan genangan.',
        bg: 'bg-blue-950/30 border-blue-800/50 text-blue-300',
      });
    }

    if (summaryData?.avgBOR > 75) {
      policies.push({
        type: 'health',
        title: '🏥 Optimalisasi Rujukan Faskes',
        text: `BOR RSUD Jakarta melampaui ${summaryData.avgBOR}%. Aktivasi rujukan berjenjang ke Puskesmas Kecamatan.`,
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
            <Activity className="w-4 h-4" /> Smart Public Service Jakarta v7.1 (Full Combined)
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold mt-1 tracking-tight">
            Jakarta Urban & Health Resilience
          </h1>
          <p className="text-slate-400 text-sm mt-0.5">
            Integrasi udara.jakarta.go.id, BPBD Waterlevel, Pantau Banjir, Policy Engine, & Sensor Network
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchAllData}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-xl text-xs font-semibold border border-slate-700 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingSync ? 'animate-spin' : ''}`} /> Sync All Live APIs
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

      {/* Tabs Filter Modul Kewaspadaan (V2 Feature Restored) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'all', label: '🛡️ Semua Indikator Risiko' },
          { id: 'ispa', label: '🫁 Udara Jakarta ISPU & ISPA Watch' },
          { id: 'flood', label: '🌊 BPBD Waterlevel & Pantau Banjir' },
          { id: 'dbd', label: '🦟 Dengue Risk Watch' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-900/30'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

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

      {/* Kualitas Udara Terbaik & Terburuk Section (V7 Feature) */}
      <AirRanking best={airBest} worst={airWorst} />

      {/* Main Grid: Peta Sebaran & Policy Recommendation Panel (V4 + V7 Feature Combined) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-lg font-bold tracking-tight">
            Peta Sebaran Pemantau Kualitas Udara & Banjir
          </h2>
          <JakartaMap data={regionDetails} floodPoints={bpbdData?.floodPoints || []} />
        </div>

        <div className="space-y-4">
          {/* Policy Recommendation Panel (V4 Restored) */}
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 shadow-md space-y-3">
            <h2 className="text-sm font-bold flex items-center gap-2 text-amber-400 tracking-tight">
              <FileText className="w-4 h-4" /> Automated Policy Recommendation
            </h2>
            <div className="space-y-2.5 text-xs leading-relaxed">
              {generatePolicies().map((policy, idx) => (
                <div key={idx} className={`p-3 border rounded-xl space-y-1 ${policy.bg}`}>
                  <strong className="block font-semibold">{policy.title}</strong>
                  <p className="text-slate-300">{policy.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Air Recommendation Cards (V7 Feature) */}
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

      {/* BPBD Waterlevel API Table (V4 Restored) */}
      <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-md space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold flex items-center gap-2 text-blue-400 tracking-tight">
            <Waves className="w-5 h-5" /> BPBD DKI Jakarta Waterlevel Status (Real-Time API)
          </h2>
          <span className="text-xs text-slate-400">Status Kota: <strong className="text-emerald-400">{bpbdData?.statusSiagaKota || 'Normal'}</strong></span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/40">
                <th className="p-3">ID Pos</th>
                <th className="p-3">Nama Pos / Pintu Air</th>
                <th className="p-3">Lokasi</th>
                <th className="p-3">Tinggi Air (cm)</th>
                <th className="p-3">Trend Air</th>
                <th className="p-3">Cuaca Pos</th>
                <th className="p-3">Status Siaga</th>
                <th className="p-3">Waktu Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {bpbdData?.waterlevel?.map((bw: BPBDWaterLevel) => (
                <tr key={bw.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-3 font-mono text-slate-400">{bw.id}</td>
                  <td className="p-3 font-semibold text-slate-200">{bw.nama}</td>
                  <td className="p-3">{bw.lokasi}</td>
                  <td className="p-3 font-bold text-amber-400">{bw.ketinggian} cm</td>
                  <td className="p-3">
                    <span className="flex items-center gap-1 font-semibold text-slate-300">
                      <TrendingUp className={`w-3.5 h-3.5 ${bw.trend === 'Naik' ? 'text-rose-400' : 'text-emerald-400'}`} /> {bw.trend}
                    </span>
                  </td>
                  <td className="p-3 text-slate-400">{bw.cuaca}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full font-semibold text-[10px] ${
                      bw.status === 'Siaga 1' ? 'bg-rose-950 text-rose-400 border border-rose-800 animate-pulse' :
                      bw.status === 'Siaga 2' ? 'bg-rose-950 text-rose-400 border border-rose-800' :
                      bw.status === 'Siaga 3' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                      'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    }`}>
                      {bw.status}
                    </span>
                  </td>
                  <td className="p-3 text-slate-400">{bw.lastUpdate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Matriks Risiko Lingkungan & Kesehatan Wilayah (V2 Restored) */}
      <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-md space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2 text-rose-400 tracking-tight">
          <AlertTriangle className="w-5 h-5" /> Matriks Risiko Lingkungan & Kesehatan Wilayah
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/40">
                <th className="p-3">Wilayah</th>
                <th className="p-3">ISPU (DLH)</th>
                <th className="p-3">PM2.5 (µg/m³)</th>
                <th className="p-3">Status Pintu Air</th>
                <th className="p-3">Kasus ISPA</th>
                <th className="p-3">Kasus DBD</th>
                <th className="p-3">Kategori Risiko</th>
                <th className="p-3">Status Respon</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {regionDetails.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-3 font-bold text-slate-200">{item.nama}</td>
                  <td className="p-3 text-amber-400 font-semibold">{item.ispu}</td>
                  <td className="p-3">{item.pm25}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-md font-semibold text-[10px] ${
                      item.statusAir === 'Normal' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'
                    }`}>
                      {item.statusAir} ({item.tinggiAir} cm)
                    </span>
                  </td>
                  <td className="p-3 text-rose-300">{item.kasusISPA}</td>
                  <td className="p-3">{item.kasusDBD}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-md font-semibold text-[10px] ${
                      item.kategoriRisiko === 'Tinggi' ? 'bg-rose-900/60 text-rose-300' :
                      item.kategoriRisiko === 'Sedang' ? 'bg-amber-900/60 text-amber-300' : 'bg-emerald-900/60 text-emerald-300'
                    }`}>
                      {item.kategoriRisiko}
                    </span>
                  </td>
                  <td className="p-3 text-slate-400">CRM Resolved {item.crmResolved}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stasiun Pantau & Sensor Network Status Table (V2 Restored) */}
      <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-md space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2 text-blue-400 tracking-tight">
          <Radio className="w-5 h-5" /> Stasiun Pantau & Sensor Network Status
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/40">
                <th className="p-3">ID Stasiun</th>
                <th className="p-3">Nama Stasiun</th>
                <th className="p-3">Lokasi</th>
                <th className="p-3">Tipe Sensor</th>
                <th className="p-3">Nilai ISPU</th>
                <th className="p-3">Status Operasional</th>
                <th className="p-3">Waktu Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {stations.map((st) => (
                <tr key={st.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-3 font-mono text-slate-400">{st.id}</td>
                  <td className="p-3 font-semibold text-slate-200">{st.nama}</td>
                  <td className="p-3">{st.lokasi}</td>
                  <td className="p-3 text-slate-400">{st.jenis}</td>
                  <td className="p-3 font-bold text-amber-400">{st.ispu}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full font-semibold text-[10px] ${
                      st.status === 'Online' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
                    }`}>
                      ● {st.status}
                    </span>
                  </td>
                  <td className="p-3 text-slate-400">{st.lastUpdate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}