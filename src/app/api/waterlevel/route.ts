import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    source: 'Dinas SDA / BPBD DKI Jakarta',
    lastSync: '11:00 WIB',
    waterlevel: [
      { id: 'BPBD-01', nama: 'Bendung Katulampa (Hulu)', ketinggian: 10, status: 'Normal (Siaga 4)', trend: 'Terang', cuaca: 'Terang', lokasi: 'Bogor', lastUpdate: '11:00 WIB' },
      { id: 'BPBD-02', nama: 'Pos Depok (Tengah)', ketinggian: 70, status: 'Normal (Siaga 4)', trend: 'Terang', cuaca: 'Terang', lokasi: 'Depok', lastUpdate: '11:00 WIB' },
      { id: 'BPBD-03', nama: 'PA Manggarai (Hilir)', ketinggian: 540, status: 'Normal (Siaga 4)', trend: 'Terang', cuaca: 'Terang', lokasi: 'Jakarta Selatan', lastUpdate: '11:00 WIB' },
      { id: 'BPBD-04', nama: 'PA Karet', ketinggian: 250, status: 'Normal (Siaga 4)', trend: 'Terang', cuaca: 'Terang', lokasi: 'Jakarta Pusat', lastUpdate: '11:00 WIB' },
      { id: 'BPBD-05', nama: 'PA Pasar Ikan (Laut)', ketinggian: 195, status: 'Siaga 3', trend: 'Terang', cuaca: 'Terang', lokasi: 'Jakarta Utara', lastUpdate: '11:00 WIB' },
    ],
    floodPoints: [
      { id: 'FL-01', lokasi: 'Rawajati, DAS Ciliwung', wilayah: 'Jakarta Selatan', ketinggianAir: 25, rtTerdampak: 2, lat: -6.257, lng: 106.855, status: 'Genangan Ringan' },
      { id: 'FL-02', lokasi: 'Kampung Melayu', wilayah: 'Jakarta Timur', ketinggianAir: 35, rtTerdampak: 4, lat: -6.224, lng: 106.862, status: 'Genangan Sedang' },
    ],
    statusSiagaKota: 'Normal (Siaga 4)',
  });
}