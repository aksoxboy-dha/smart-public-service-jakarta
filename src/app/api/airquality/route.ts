import { NextResponse } from 'next/server';

export async function GET() {
  const token = '8ac530143b7499447288c48df929468b9cd020fe';

  try {
    // Memanggil Live WAQI API untuk stasiun Jakarta
    const res = await fetch(`https://api.waqi.info/feed/here/?token=${token}`, {
      next: { revalidate: 300 }, // Sync tiap 5 menit
    });

    if (!res.ok) throw new Error('WAQI API Error');

    const result = await res.json();
    const liveAqi = result.data?.aqi || 125;
    const pm25 = result.data?.iaqi?.pm25?.v || 48;
    const stasiunNama = result.data?.city?.name || 'Jakarta Live Station';

    return NextResponse.json({
      success: true,
      live: true,
      ispu: liveAqi,
      pm25: pm25,
      stasiun: stasiunNama,
      lastUpdate: result.data?.time?.s || new Date().toLocaleTimeString('id-ID'),
    });
  } catch (error) {
    return NextResponse.json({
      success: true,
      live: false,
      ispu: 125,
      pm25: 48,
      stasiun: 'Jakarta DLH Station',
      lastUpdate: new Date().toLocaleTimeString('id-ID'),
    });
  }
}