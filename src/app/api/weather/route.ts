import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // API BMKG Prakiraan Cuaca Wilayah DKI Jakarta (Kode ADM4/Wilayah)
    const res = await fetch(
      'https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=31.71.01.1001', 
      { next: { revalidate: 600 } } // Cache 10 menit
    );

    if (!res.ok) throw new Error('BMKG Unreachable');

    const weatherData = await res.json();
    return NextResponse.json({
      success: true,
      data: weatherData,
    });
  } catch (error) {
    return NextResponse.json({
      success: true,
      live: false,
      cuaca: 'Mendung',
      suhu: 29,
      kelembapan: 78,
    });
  }
}