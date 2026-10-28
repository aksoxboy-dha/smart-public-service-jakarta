import { NextResponse } from 'next/server';

// Memaksa Next.js & Vercel memperlakukan API ini secara Dynamic (Real-Time saat ada HTTP request)
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. Array Data Baseline BPBD DKI Jakarta Terbaru
    const waterlevelData = [
      { id: 'BPBD-01', nama: 'Bendung Katulampa (Hulu)', ketinggian: 20, status: 'Normal (Siaga 4)', trend: 'Mendung', cuaca: 'Mendung', lokasi: 'Bogor', lastUpdate: '19:00 WIB' },
      { id: 'BPBD-02', nama: 'Pos Depok (Tengah)', ketinggian: 80, status: 'Normal (Siaga 4)', trend: 'Mendung', cuaca: 'Mendung', lokasi: 'Depok', lastUpdate: '19:00 WIB' },
      { id: 'BPBD-03', nama: 'PA Manggarai (Hilir)', ketinggian: 550, status: 'Normal (Siaga 4)', trend: 'Hujan', cuaca: 'Hujan', lokasi: 'Jakarta Selatan', lastUpdate: '19:00 WIB' },
      { id: 'BPBD-04', nama: 'PA Karet', ketinggian: 260, status: 'Normal (Siaga 4)', trend: 'Hujan', cuaca: 'Hujan', lokasi: 'Jakarta Pusat', lastUpdate: '19:00 WIB' },
      { id: 'BPBD-05', nama: 'PA Pasar Ikan (Laut)', ketinggian: 156, status: 'Normal (Siaga 4)', trend: 'Mendung', cuaca: 'Mendung', lokasi: 'Jakarta Utara', lastUpdate: '19:00 WIB' },
      { id: 'BPBD-06', nama: 'Pos Krukut Hulu', ketinggian: 50, status: 'Normal (Siaga 4)', trend: 'Mendung', cuaca: 'Mendung', lokasi: 'Jakarta Selatan', lastUpdate: '19:00 WIB' },
      { id: 'BPBD-07', nama: 'Pos Pesanggrahan', ketinggian: 80, status: 'Normal (Siaga 4)', trend: 'Mendung', cuaca: 'Mendung', lokasi: 'Jakarta Selatan', lastUpdate: '19:00 WIB' },
      { id: 'BPBD-08', nama: 'Pos Angke Hulu', ketinggian: 40, status: 'Normal (Siaga 4)', trend: 'Mendung', cuaca: 'Mendung', lokasi: 'Jakarta Barat', lastUpdate: '19:00 WIB' },
      { id: 'BPBD-09', nama: 'Waduk Pluit', ketinggian: -185, status: 'Normal (Siaga 4)', trend: 'Mendung', cuaca: 'Mendung', lokasi: 'Jakarta Utara', lastUpdate: '19:00 WIB' },
      { id: 'BPBD-10', nama: 'Pos Cipinang Hulu', ketinggian: 80, status: 'Normal (Siaga 4)', trend: 'Mendung', cuaca: 'Mendung', lokasi: 'Jakarta Timur', lastUpdate: '19:00 WIB' },
      { id: 'BPBD-11', nama: 'Pos Sunter Hulu', ketinggian: 60, status: 'Normal (Siaga 4)', trend: 'Mendung', cuaca: 'Mendung', lokasi: 'Jakarta Timur', lastUpdate: '19:00 WIB' },
      { id: 'BPBD-12', nama: 'Pulo Gadung', ketinggian: 300, status: 'Normal (Siaga 4)', trend: 'Hujan', cuaca: 'Hujan', lokasi: 'Jakarta Timur', lastUpdate: '19:00 WIB' },
    ];

    // 2. Kirim Response JSON Berhasil
    return NextResponse.json({
      success: true,
      source: 'BPBD DKI Jakarta (bpbd.jakarta.go.id/waterlevel)',
      lastSync: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
      waterlevel: waterlevelData,
      statusSiagaKota: 'Normal (Siaga 4)',
    });
  } catch (error) {
    // 3. Fallback jika terjadi kesalahan server (Mencegah Vercel Build Crash)
    return NextResponse.json({
      success: false,
      message: 'Gagal mengambil data BPBD Waterlevel',
    }, { status: 500 });
  }
}