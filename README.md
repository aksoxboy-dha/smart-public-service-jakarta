# Smart Public Service Jakarta - Urban & Health Resilience Dashboard

Dashboard ketahanan perkotaan dan kesehatan masyarakat interaktif berbasis **Next.js 14 (App Router)** dan **Open Data DKI Jakarta**.

## 🌟 Fitur Utama
1. **Header & Filter Wilayah:** Pilihan interaktif per-wilayah Administrasi DKI Jakarta.
2. **Quick Metric Cards:** Indikator utama ISPU (DLH), Kasus ISPA/DBD (Dinkes), Keterisian BOR RS, dan Resilience Score Engine.
3. **Peta Spasial Interaktif (Leaflet):** Pemetaan titik koordinat risiko wilayah Jakarta.
4. **Policy Recommendation Panel:** Panel rekomendasi kebijakan otomatis berdasarkan analisis risiko multivariat.

## 🚀 Panduan Jalankan di Lokal
```bash
# 1. Install Dependencies
npm install

# 2. Jalankan Server Dev
npm run dev
```
Buka `http://localhost:3000` di browser.

## 📦 Deploy ke GitHub & Vercel
1. Ekstrak folder ini dan inisialisasi Git:
   ```bash
   git init
   git add .
   git commit -m "feat: Resilience Dashboard Open Data Jakarta"
   git branch -M main
   git remote add origin https://github.com/<USERNAME_ANDA>/smart-public-service-jakarta.git
   git push -u origin main
   ```
2. Hubungkan repository di **[Vercel Dashboard](https://vercel.com/dashboard)** untuk auto-deploy!
