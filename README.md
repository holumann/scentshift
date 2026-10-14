# ScentShift - Premium & Preloved Authentic Perfume Marketplace

Aplikasi web e-commerce parfum otentik modern (Brand New & Preloved terkurasi) yang dikembangkan menggunakan **React 19, TypeScript, Tailwind CSS, Lucide Icons, dan Vite**. Terintegrasi langsung dengan sistem checkout WhatsApp otomatis dan siap dideploy ke **Vercel** secara gratis.

---

## 🌟 Fitur Utama yang Telah Dikembangkan

1. **Katalog Parfum Interaktif**:
   - Filter Kategori: *Semua*, *Brand New (Segel)*, *Preloved Authentic (Terkurasi)*, dan *Decant 10ml*.
   - Filter Profil Aroma: *Woody*, *Fresh & Citrus*, *Floral*, *Amber & Oriental*, *Aquatic*.
   - Filter Gender: *Semua*, *Unisex*, *Pria*, *Wanita*.
   - Urutan Harga (Termurah, Termahal, Terpopuler, Rating Tertinggi).
   - Pencarian real-time berdasarkan nama parfum, rumah mode/brand, atau aroma notes.
2. **Piramida Aroma & Status Preloved Transparan**:
   - Quick View modal dengan visualisasi Top Notes, Heart Notes, dan Base Notes.
   - Indikator sisa juice (e.g., 85% / 90ml), batch code verifikasi CheckFresh, dan status kelengkapan box (Fullset / Tester / Unit only).
   - Rating Ketahanan (Longevity) & Jarak Jejak (Sillage).
3. **Keranjang Belanja & Generator Invoice WhatsApp**:
   - Pengunjung dapat memesan beberapa parfum sekaligus dalam keranjang belanja.
   - Form pemesan (Nama, No. WA, Alamat, Ekspedisi: JNE/J&T/SiCepat/GoSend, Pembayaran: BCA/Mandiri/QRIS/COD).
   - Tombol checkout otomatis menyusun pesan invoice rapi dan membukanya di WhatsApp Admin (+62 856-9281-1350).
4. **Quiz Karakter Aroma (Fragrance Matcher)**:
   - 3 langkah cepat mencocokkan acara (Kantor, Kencan, Pesta, Olahraga), karakter wangi, dan budget.
5. **Fitur Konsinyasi (Titip Jual Preloved)**:
   - Form bagi kolektor yang ingin menjual parfum preloved originalnya lewat tim kurasi ScentShift.
6. **Edukasi & Garansi Keaslian**:
   - 4 tahap verifikasi botol & juice original (Batch code, Nozzle fine-mist, Bobot kaca, Kualitas juice) + Garansi 100% uang kembali.

---

## 🚀 Panduan Deploy Gratis ke Vercel

Proyek ini telah dilengkapi file konfigurasi `vercel.json` untuk menangani routing SPA (Single Page Application) secara otomatis tanpa error 404 saat refresh.

### Metode 1: Lewat GitHub & Vercel Dashboard (Paling Mudah & Otomatis)

1. **Push Proyek ke Akun GitHub Anda**:
   ```bash
   git init
   git add .
   git commit -m "feat: ScentShift perfume boutique"
   git branch -M main
   git remote add origin https://github.com/USERNAME-ANDA/scentshift.git
   git push -u origin main
   ```

2. **Buka Vercel**:
   - Kunjungi [https://vercel.com](https://vercel.com) dan login menggunakan akun GitHub Anda.
   - Klik **"Add New..."** lalu pilih **"Project"**.
   - Pilih repositori `scentshift` yang baru saja Anda push, lalu klik **"Import"**.

3. **Konfigurasi Otomatis (Zero-Config)**:
   - Vercel akan otomatis mengenali framework **Vite**.
   - *Build Command*: `npm run build`
   - *Output Directory*: `dist`
   - *Install Command*: `npm install`

4. **Klik Deploy**:
   - Tunggu proses build selama kurang lebih 40 detik.
   - Website ScentShift Anda akan langsung aktif dengan URL gratis selamanya (contoh: `https://scentshift.vercel.app`) lengkap dengan HTTPS SSL dan opsi Custom Domain gratis!

---

### Metode 2: Lewat Vercel CLI (Terminal Langsung)

Jika Anda ingin mendeploy langsung dari komputer Anda tanpa membuat repositori GitHub terlebih dahulu:

```bash
# 1. Pasang Vercel CLI secara global
npm install -g vercel

# 2. Login & Deploy
vercel

# 3. Ikuti pertanyaan di terminal (tekan Enter untuk pilihan default)
# 4. Untuk deploy versi production:
vercel --prod
```

---

## 💻 Menjalankan di Lokal (Development)

```bash
# Pasang dependensi
npm install

# Jalankan server development di port 3000
npm run dev
```
Buka browser di `http://localhost:3000`.
