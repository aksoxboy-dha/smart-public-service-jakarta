'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { WilayahData } from '@/lib/mockData';

const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function JakartaMap({ data }: { data: WilayahData[] }) {
  return (
    <div className="w-full h-[380px] rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
      <MapContainer
        center={[-6.2088, 106.8456]}
        zoom={11}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.map((item) => (
          <Marker key={item.id} position={[item.lat, item.lng]} icon={customIcon}>
            <Popup>
              <div className="text-slate-900 p-1">
                <h3 className="font-bold border-b pb-1 mb-1">{item.nama}</h3>
                <p className="text-xs">ISPU Index: <strong>{item.ispu}</strong></p>
                <p className="text-xs">Status Air: <strong>{item.statusAir}</strong> ({item.tinggiAir} cm)</p>
                <p className="text-xs">Kasus ISPA: <strong>{item.kasusISPA}</strong></p>
                <p className="text-xs">BOR RS: <strong>{item.bedOccupancy}%</strong></p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}