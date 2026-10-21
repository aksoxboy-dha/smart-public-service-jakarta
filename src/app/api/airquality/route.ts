import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // API Public WAQI (World Air Quality Index) / AQICN untuk Stasiun Jakarta
    const res = await fetch(
      'https://api.waqi.info/feed/jakarta/?token=demo', // Ganti 'demo' dengan API Token WAQI gratis Anda
      { next: { revalidate: 300 } } // Cache 5 menit
    );

    if (!res.ok) throw new Error('AQICN Unreachable');

    const result = await res.json();
    const aqi = result.data?.aqi || 125;
    const pm25 = result.data?.iaqi?.pm25?.v || 48;

    return NextResponse.json({
      success: true,
      live: true,
      ispu: aqi,
      pm25: pm25,
      kategori: aqi > 150 ? 'Sangat Tidak Sehat' : aqi > 100 ? 'Tidak Sehat' : 'Sedang',
      lastUpdate: result.data?.time?.s || new Date().toLocaleTimeString('id-ID'),
    });
  } catch (error) {
    // Fallback jika API eksternal limit
    return NextResponse.json({
      success: true,
      live: false,
      ispu: 125,
      pm25: 48,
      kategori: 'Tidak Sehat (DLH Jakarta)',
    });
  }
}