import { NextResponse } from 'next/server';
import { JAKARTA_REGIONS } from '@/lib/mockData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const regionId = searchParams.get('region');

  let data = JAKARTA_REGIONS;
  if (regionId && regionId !== 'all') {
    data = JAKARTA_REGIONS.filter((r) => r.id === regionId);
  }

  // Hitung Agregat & Skor Risiko
  const avgISPU = Math.round(data.reduce((a, b) => a + b.ispu, 0) / data.length);
  const totalDBD = data.reduce((a, b) => a + b.kasusDBD, 0);
  const totalISPA = data.reduce((a, b) => a + b.kasusISPA, 0);
  const avgBOR = Math.round(data.reduce((a, b) => a + b.bedOccupancy, 0) / data.length);

  // Risk Score Engine (0 - 100)
  const riskScore = Math.min(
    100,
    Math.round((avgISPU / 300) * 40 + (avgBOR / 100) * 30 + (totalDBD / 300) * 30)
  );

  return NextResponse.json({
    success: true,
    summary: {
      avgISPU,
      totalDBD,
      totalISPA,
      avgBOR,
      riskScore,
    },
    details: data,
  });
}