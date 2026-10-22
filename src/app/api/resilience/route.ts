import { NextResponse } from 'next/server';
import { JAKARTA_REGIONS, STATIONS_DATA } from '@/lib/mockData';

export async function GET() {
  return NextResponse.json({
    success: true,
    details: JAKARTA_REGIONS,
    stations: STATIONS_DATA,
  });
}