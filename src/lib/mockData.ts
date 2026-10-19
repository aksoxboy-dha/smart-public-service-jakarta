export interface WilayahData {
  id: string;
  nama: string;
  ispu: number;
  pm25: number;
  statusAir: 'Aman' | 'Siaga 3' | 'Siaga 2' | 'Siaga 1';
  tinggiAir: number;
  kasusDBD: number;
  kasusISPA: number;
  bedOccupancy: number;
  crmResolved: number;
  lat: number;
  lng: number;
  kategoriRisiko: 'Tinggi' | 'Sedang' | 'Rendah';
}

export interface PintuAirData {
  id: string;
  nama: string;
  ketinggian: number;
  status: 'Aman' | 'Siaga 3' | 'Siaga 2' | 'Siaga 1';
  lokasi: string;
  lastUpdate: string;
}

export const JAKARTA_REGIONS: WilayahData[] = [
  {
    id: '3171',
    nama: 'Jakarta Selatan',
    ispu: 125,
    pm25: 48,
    statusAir: 'Aman',
    tinggiAir: 110,
    kasusDBD: 45,
    kasusISPA: 320,
    bedOccupancy: 68,
    crmResolved: 92,
    lat: -6.2615,
    lng: 106.8106,
    kategoriRisiko: 'Sedang',
  },
  {
    id: '3172',
    nama: 'Jakarta Timur',
    ispu: 142,
    pm25: 62,
    statusAir: 'Siaga 3',
    tinggiAir: 175,
    kasusDBD: 78,
    kasusISPA: 410,
    bedOccupancy: 82,
    crmResolved: 88,
    lat: -6.225,
    lng: 106.9004,
    kategoriRisiko: 'Tinggi',
  },
  {
    id: '3173',
    nama: 'Jakarta Pusat',
    ispu: 110,
    pm25: 39,
    statusAir: 'Aman',
    tinggiAir: 90,
    kasusDBD: 30,
    kasusISPA: 210,
    bedOccupancy: 74,
    crmResolved: 95,
    lat: -6.1865,
    lng: 106.834,
    kategoriRisiko: 'Rendah',
  },
  {
    id: '3174',
    nama: 'Jakarta Barat',
    ispu: 135,
    pm25: 55,
    statusAir: 'Aman',
    tinggiAir: 130,
    kasusDBD: 62,
    kasusISPA: 380,
    bedOccupancy: 79,
    crmResolved: 85,
    lat: -6.1683,
    lng: 106.7588,
    kategoriRisiko: 'Sedang',
  },
  {
    id: '3175',
    nama: 'Jakarta Utara',
    ispu: 155,
    pm25: 71,
    statusAir: 'Siaga 2',
    tinggiAir: 210,
    kasusDBD: 54,
    kasusISPA: 450,
    bedOccupancy: 85,
    crmResolved: 81,
    lat: -6.1384,
    lng: 106.864,
    kategoriRisiko: 'Tinggi',
  },
];

export const MONTHLY_TRENDS = [
  { bulan: 'Mei', ispu: 105, ispa: 280, dbd: 35 },
  { bulan: 'Jun', ispu: 118, ispa: 310, dbd: 42 },
  { bulan: 'Jul', ispu: 132, ispa: 360, dbd: 50 },
  { bulan: 'Agt', ispu: 148, ispa: 410, dbd: 48 },
  { bulan: 'Sep', ispu: 140, ispa: 390, dbd: 55 },
  { bulan: 'Okt', ispu: 133, ispa: 354, dbd: 54 },
];