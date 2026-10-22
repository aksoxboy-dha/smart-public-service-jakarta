export interface WilayahData {
  id: string;
  nama: string;
  ispu: number;
  pm25: number;
  statusAir: 'Normal' | 'Siaga 3' | 'Siaga 2' | 'Siaga 1';
  tinggiAir: number;
  kasusDBD: number;
  kasusISPA: number;
  bedOccupancy: number;
  crmResolved: number;
  lat: number;
  lng: number;
  kategoriRisiko: 'Tinggi' | 'Sedang' | 'Rendah';
}

export interface AirStationRanking {
  id: string;
  kecamatan: string;
  lokasi: string;
  ispu: number;
  kategori: 'Terbaik' | 'Terburuk';
}

export interface FloodMarker {
  id: string;
  lokasi: string;
  wilayah: string;
  ketinggianAir: number;
  rtTerdampak: number;
  lat: number;
  lng: number;
  status: 'Genangan Ringan' | 'Genangan Sedang' | 'Genangan Tinggi';
}

export interface BPBDWaterLevel {
  id: string;
  nama: string;
  ketinggian: number;
  status: 'Siaga 1' | 'Siaga 2' | 'Siaga 3' | 'Normal (Siaga 4)';
  trend: 'Naik' | 'Turun' | 'Konstan' | 'Terang';
  cuaca: string;
  lokasi: string;
  lastUpdate: string;
}

export const AIR_RANKING_BEST: AirStationRanking[] = [
  { id: 'B1', kecamatan: 'Tj. Priok', lokasi: 'SDN 12 Sunter Agung', ispu: 16, kategori: 'Terbaik' },
  { id: 'B2', kecamatan: 'Kramat Jati', lokasi: 'RPTRA Udara', ispu: 16, kategori: 'Terbaik' },
  { id: 'B3', kecamatan: 'Penjaringan', lokasi: 'SMP 112', ispu: 19, kategori: 'Terbaik' },
  { id: 'B4', kecamatan: 'Kebon Jeruk', lokasi: 'RPTRA Pandawa', ispu: 29, kategori: 'Terbaik' },
  { id: 'B5', kecamatan: 'Ps. Minggu', lokasi: 'PPOP Ragunan', ispu: 29, kategori: 'Terbaik' },
  { id: 'B6', kecamatan: 'Cilincing', lokasi: 'SDN 03', ispu: 29, kategori: 'Terbaik' },
];

export const AIR_RANKING_WORST: AirStationRanking[] = [
  { id: 'W1', kecamatan: 'Cempaka Putih', lokasi: 'SDN 01', ispu: 117, kategori: 'Terburuk' },
  { id: 'W2', kecamatan: 'Cipayung', lokasi: 'Pondok Ranggon', ispu: 117, kategori: 'Terburuk' },
  { id: 'W3', kecamatan: 'Cipayung', lokasi: 'Kebon Bibit', ispu: 118, kategori: 'Terburuk' },
  { id: 'W4', kecamatan: 'Tj. Priok', lokasi: 'RPTRA Manggala', ispu: 149, kategori: 'Terburuk' },
  { id: 'W5', kecamatan: 'Cakung', lokasi: 'SDN 02', ispu: 150, kategori: 'Terburuk' },
  { id: 'W6', kecamatan: 'Tj. Priok', lokasi: 'RSUD Tanjung Priok', ispu: 174, kategori: 'Terburuk' },
];

export const JAKARTA_REGIONS: WilayahData[] = [
  { id: '3171', nama: 'Jakarta Selatan', ispu: 125, pm25: 48, statusAir: 'Normal', tinggiAir: 110, kasusDBD: 45, kasusISPA: 320, bedOccupancy: 68, crmResolved: 92, lat: -6.2615, lng: 106.8106, kategoriRisiko: 'Sedang' },
  { id: '3172', nama: 'Jakarta Timur', ispu: 142, pm25: 62, statusAir: 'Siaga 3', tinggiAir: 175, kasusDBD: 78, kasusISPA: 410, bedOccupancy: 82, crmResolved: 88, lat: -6.225, lng: 106.9004, kategoriRisiko: 'Tinggi' },
  { id: '3173', nama: 'Jakarta Pusat', ispu: 110, pm25: 39, statusAir: 'Normal', tinggiAir: 90, kasusDBD: 30, kasusISPA: 210, bedOccupancy: 74, crmResolved: 95, lat: -6.1865, lng: 106.834, kategoriRisiko: 'Rendah' },
  { id: '3174', nama: 'Jakarta Barat', ispu: 135, pm25: 55, statusAir: 'Normal', tinggiAir: 130, kasusDBD: 62, kasusISPA: 380, bedOccupancy: 79, crmResolved: 85, lat: -6.1683, lng: 106.7588, kategoriRisiko: 'Sedang' },
  { id: '3175', nama: 'Jakarta Utara', ispu: 155, pm25: 71, statusAir: 'Siaga 2', tinggiAir: 210, kasusDBD: 54, kasusISPA: 450, bedOccupancy: 85, crmResolved: 81, lat: -6.1384, lng: 106.864, kategoriRisiko: 'Tinggi' },
];