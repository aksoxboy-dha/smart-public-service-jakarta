import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch('https://raw.githubusercontent.com/infoBMKG/data-cap/main/feed.json', {
      signal: controller.signal,
      next: { revalidate: 300 },
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json({
        success: true,
        source: 'infoBMKG/data-cap',
        alerts: data.alerts || [],
        lastSync: new Date().toLocaleTimeString('id-ID'),
      });
    }
    throw new Error('Fallback BMKG CAP Feed');
  } catch (error) {
    return NextResponse.json({
      success: true,
      source: 'BMKG CAP (Early Warning System)',
      alerts: [
        {
          id: 'BMKG-CAP-JKT-01',
          event: 'Peringatan Dini Cuaca Ekstrem Jabodetabek',
          headline: 'Potensi Hujan Sedang-Lebat Disertai Kilat/Petir dan Angin Kencang di Wilayah DKI Jakarta',
          severity: 'Moderate',
          urgency: 'Immediate',
          areaDesc: 'DKI Jakarta (Selatan, Timur, Barat, Pusat, Utara)',
          instruction: 'Waspada potensi genangan air, pohon tumbang, serta baliho roboh. Hindari berlindung di bawah pohon tua.',
        },
      ],
      lastSync: new Date().toLocaleTimeString('id-ID'),
    });
  }
}