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

export interface StasiunData {
  id: string;
  nama: string;
  lokasi: string;
  jenis: 'DLH Air Quality' | 'SDA Pos Pantau' | 'Dinkes Faskes';
  status: 'Online' | 'Maintenance' | 'Offline';
  ispu: number;
  lastUpdate: string;
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

export const JAKARTA_REGIONS: WilayahData[] = [
  {
    id: '3171',
    nama: 'Jakarta Selatan',
    ispu: 125,
    pm25: 48,
    statusAir: 'Normal',
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
    statusAir: 'Normal',
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
    statusAir: 'Normal',
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

export const STATIONS_DATA: StasiunData[] = [
  { id: 'ST-01', nama: 'SPKU Bundaran HI', lokasi: 'Jakarta Pusat', jenis: 'DLH Air Quality', status: 'Online', ispu: 110, lastUpdate: '10 Mnt Lalu' },
  { id: 'ST-02', nama: 'SPKU Kelapa Gading', lokasi: 'Jakarta Utara', jenis: 'DLH Air Quality', status: 'Online', ispu: 155, lastUpdate: '5 Mnt Lalu' },
  { id: 'ST-03', nama: 'Pos Pantau Manggarai', lokasi: 'Jakarta Selatan', jenis: 'SDA Pos Pantau', status: 'Online', ispu: 95, lastUpdate: '2 Mnt Lalu' },
  { id: 'ST-04', nama: 'Pos Pantau Sunter III', lokasi: 'Jakarta Utara', jenis: 'SDA Pos Pantau', status: 'Maintenance', ispu: 140, lastUpdate: '1 Jam Lalu' },
  { id: 'ST-05', nama: 'SPKU Kebon Jeruk', lokasi: 'Jakarta Barat', jenis: 'DLH Air Quality', status: 'Online', ispu: 135, lastUpdate: '12 Mnt Lalu' },
  { id: 'ST-06', nama: 'Pos Pantau Cipinang', lokasi: 'Jakarta Timur', jenis: 'SDA Pos Pantau', status: 'Online', ispu: 142, lastUpdate: '3 Mnt Lalu' },
];