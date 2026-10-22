# Smart Public Service Jakarta - Resilience Dashboard v6.0

Dashboard Intelijen Ketahanan Perkotaan Lengkap dengan **Fix WAQI Jakarta Location**, **Live Health API (ISPA & BOR RS)**, **Pantau Banjir Spatial Map Layers**, dan **Dynamic Reactive Recharts**.

## 🚀 Perbaikan & Peningkatan v6.0:
- **Fixed Jakarta Location Air Quality (`/api/airquality`):** Memaksa lokasi stasiun SPKU DKI Jakarta (Bundaran HI / Kelapa Gading / Kebon Jeruk), bukan lokasi server Vercel USA.
- **Live Health API Integration (`/api/health`):** Data live real-time BOR RSUD Jakarta & Kasus ISPA.
- **Enhanced Spatial Map (`JakartaMap.tsx`):** Menampilkan layer genangan air Pantau Banjir Jakarta beserta lokasi stasiun pemantau.
- **Dynamic Reactive Charts (`ChartsSection.tsx`):** Chart ISPU vs ISPA & BOR RS yang ter-update secara otomatis mengikuti data live API.

## 📦 Deploy
1. Ekstrak & `npm install`
2. Jalankan `npm run dev`
3. Commit & Push ke GitHub (`git push origin main --force`)
