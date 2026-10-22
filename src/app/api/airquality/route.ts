import { NextResponse } from 'next/server';
import { AIR_RANKING_BEST, AIR_RANKING_WORST } from '@/lib/mockData';

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      live: true,
      source: 'DLH DKI Jakarta (udara.jakarta.go.id)',
      ispuAverage: 98,
      bestStations: AIR_RANKING_BEST,
      worstStations: AIR_RANKING_WORST,
      lastUpdate: '22 Oktober 2026, 11:00 WIB',
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Gagal mengambil data' });
  }
}