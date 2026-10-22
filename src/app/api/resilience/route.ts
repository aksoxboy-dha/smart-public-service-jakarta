import { NextResponse } from 'next/server';
import { JAKARTA_REGIONS } from '@/lib/mockData';

export async function GET() {
  return NextResponse.json({
    success: true,
    details: JAKARTA_REGIONS,
  });
}