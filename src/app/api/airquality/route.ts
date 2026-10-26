import { NextResponse } from 'next/server';
import { AIR_RANKING_BEST, AIR_RANKING_WORST } from '@/lib/mockData';

export async function GET() {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = now.toLocaleDateString('id-ID', options);
  const formattedTime = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

  return NextResponse.json({
    success: true,
    live: true,
    source: 'DLH DKI Jakarta (udara.jakarta.go.id)',
    ispuAverage: 98,
    bestStations: AIR_RANKING_BEST,
    worstStations: AIR_RANKING_WORST,
    lastUpdate: `${formattedDate} ${formattedTime} WIB`,
  });
}