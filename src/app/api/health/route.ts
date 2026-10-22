import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    borPercent: 78,
    totalIspa: 1770,
    totalDbd: 348,
    lastUpdate: 'Real-time Live Dinkes DKI',
  });
}