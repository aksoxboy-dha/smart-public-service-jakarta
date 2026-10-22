import { NextResponse } from 'next/server';
import { JAKARTA_REGIONS, STATIONS_DATA } from '@/lib/mockData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const regionId = searchParams.get('region');

  let data = JAKARTA_REGIONS;
  if (regionId && regionId !== 'all') {
    data = JAKARTA_REGIONS.filter((r) => r.id === regionId);
  }

  return NextResponse.json({
    success: true,
    details: data,
    stations: STATIONS_DATA,
  });
}