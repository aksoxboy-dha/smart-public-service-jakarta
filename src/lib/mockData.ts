export interface WilayahData {
  id: string;
  nama: string;
  ispu: number;
  statusAir: 'Aman' | 'Siaga 3' | 'Siaga 2' | 'Siaga 1';
  tinggiAir: number; // cm
  kasusDBD: number;
  kasusISPA: number;
  bedOccupancy: number; // %
  crmResolved: number; // %
  lat: number;
  lng: number;
}

export const JAKARTA_REGIONS: WilayahData[] = [
  {
    id: '3171',
    nama: 'Jakarta Selatan',
    ispu: 125,
    statusAir: 'Aman',
    tinggiAir: 110,
    kasusDBD: 45,
    kasusISPA: 320,
    bedOccupancy: 68,
    crmResolved: 92,
    lat: -6.2615,
    lng: 106.8106,
  },
  {
    id: '3172',
    nama: 'Jakarta Timur',
    ispu: 142,
    statusAir: 'Siaga 3',
    tinggiAir: 175,
    kasusDBD: 78,
    kasusISPA: 410,
    bedOccupancy: 82,
    crmResolved: 88,
    lat: -6.225,
    lng: 106.9004,
  },
  {
    id: '3173',
    nama: 'Jakarta Pusat',
    ispu: 110,
    statusAir: 'Aman',
    tinggiAir: 90,
    kasusDBD: 30,
    kasusISPA: 210,
    bedOccupancy: 74,
    crmResolved: 95,
    lat: -6.1865,
    lng: 106.834,
  },
  {
    id: '3174',
    nama: 'Jakarta Barat',
    ispu: 135,
    statusAir: 'Aman',
    tinggiAir: 130,
    kasusDBD: 62,
    kasusISPA: 380,
    bedOccupancy: 79,
    crmResolved: 85,
    lat: -6.1683,
    lng: 106.7588,
  },
  {
    id: '3175',
    nama: 'Jakarta Utara',
    ispu: 155,
    statusAir: 'Siaga 2',
    tinggiAir: 210,
    kasusDBD: 54,
    kasusISPA: 450,
    bedOccupancy: 85,
    crmResolved: 81,
    lat: -6.1384,
    lng: 106.864,
  },
];