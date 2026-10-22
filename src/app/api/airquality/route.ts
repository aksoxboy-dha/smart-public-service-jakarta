import { NextResponse } from 'next/server';

export async function GET() {
  const token = '8ac530143b7499447288c48df929468b9cd020fe';

  try {
    // Memaksa query lokasi Jakarta (bukan /feed/here/ yang terbaca server Vercel USA)
    const res = await fetch(`https://api.waqi.info/feed/jakarta/?token=${token}`, {
      next: { revalidate: 300 }, // Sync 5 menit
    });

    if (!res.ok) throw new Error('WAQI API Error');

    const result = await res.json();
    const liveAqi = result.data?.aqi || 128;
    const pm25 = result.data?.iaqi?.pm25?.v || 48;
    const stasiunNama = result.data?.city?.name || 'SPKU Bundaran HI, DKI Jakarta';

    return NextResponse.json({
      success: true,
      live: true,
      ispu: liveAqi,
      pm25: pm25,
      stasiun: `${stasiunNama} (DLH DKI Jakarta)`,
      lastUpdate: result.data?.time?.s || new Date().toLocaleTimeString('id-ID'),
    });
  } catch (error) {
    return NextResponse.json({
      success: true,
      live: false,
      ispu: 128,
      pm25: 48,
      stasiun: 'SPKU Bundaran HI (DLH DKI Jakarta)',
      lastUpdate: new Date().toLocaleTimeString('id-ID'),
    });
  }
}