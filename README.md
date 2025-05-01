# Chatbot AI dengan OpenRouter

Proyek ini adalah implementasi chatbot AI dengan antarmuka seperti ChatGPT yang menggunakan API OpenRouter untuk mengakses model AI seperti Qwen3-0.6B tanpa perlu akun OpenAI.

![Tampilan Chatbot AI](https://i.imgur.com/VsYBv1P.png)

## 🌟 Fitur

- 💬 Antarmuka chat modern dengan React dan Next.js
- 🧠 Menggunakan model AI Qwen3-0.6B dari OpenRouter (GRATIS)
- 🔄 Menyimpan percakapan dalam sesi pengguna
- 🚀 Backend Node.js dengan Express
- 🎨 UI modern dengan TailwindCSS dan shadcn/ui
- 🌙 Mode terang/gelap
- 📱 Tampilan responsif untuk semua perangkat
- 🔌 Mudah dihosting dimana saja

## 📄 Tentang Model AI Qwen3-0.6B

Qwen3-0.6B adalah model bahasa ringan dengan 0.6 miliar parameter dari seri Qwen3. Model ini memiliki beberapa keunggulan:
- Mendukung konteks panjang hingga 32K token
- Arsitektur dual-mode (thinking/non-thinking) untuk dialog umum dan penalaran terstruktur
- Mendukung multibahasa, termasuk Bahasa Indonesia
- Dapat mengikuti instruksi dengan baik
- Sangat ringan namun tetap memiliki kemampuan penalaran yang baik
- Tersedia GRATIS melalui OpenRouter

## 📁 Struktur Proyek

```
projectchatai/
├── backend/
│   ├── index.js         # Server Express
│   ├── models.js        # Konfigurasi model AI
│   ├── models-part2.js  # Model tambahan
│   ├── .env             # Konfigurasi lingkungan (jangan commit)
│   └── package.json     # Dependensi backend
├── frontend/
│   ├── src/             # Kode sumber Next.js
│   │   ├── app/         # Halaman aplikasi Next.js
│   │   ├── components/  # Komponen React
│   │   └── ...
│   ├── .env.local       # Konfigurasi frontend
│   ├── package.json     # Dependensi frontend
│   └── ...
├── run.sh               # Script untuk menjalankan proyek di Linux/Mac
├── run-windows.bat      # Script untuk menjalankan proyek di Windows
└── README.md            # Dokumentasi
```

## 🚀 Cara Menjalankan

### Cara Cepat (Direkomendasikan)

**Linux/Mac:**
```bash
# Pastikan file executable
chmod +x run.sh

# Jalankan dengan API key sebagai parameter (opsional)
./run.sh your_api_key_here

# Atau jalankan tanpa parameter untuk diprompti
./run.sh
```

**Windows:**
```
run-windows.bat
```

Script akan:
1. Memverifikasi apakah Node.js terinstall
2. Membuat file `.env` jika belum ada
3. Menginstall dependencies backend dan frontend
4. Menjalankan server backend
5. Menjalankan server frontend Next.js

Setelah server berjalan, buka `http://localhost:3001` di browser.

### Cara Manual

1. Setup backend
   ```bash
   cd backend
   npm install
   ```

2. Buat file `.env` di folder `backend` dengan isi:
   ```
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   PORT=3000
   ```
   > Dapatkan API key di [OpenRouter](https://openrouter.ai)

3. Jalankan server backend
   ```bash
   node index.js
   ```

4. Setup frontend
   ```bash
   cd frontend
   npm install
   # atau jika menggunakan bun
   bun install
   ```

5. Buat file `.env.local` di folder `frontend` dengan isi:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3000/chat
   ```

6. Jalankan server frontend
   ```bash
   npm run dev
   # atau jika menggunakan bun
   bun run dev
   ```

7. Buka `http://localhost:3000` di browser Anda

### Menguji Koneksi API

1. Setelah server berjalan, kunjungi:
   ```
   http://localhost:3000/test-openrouter
   ```
   Endpoint ini akan mengirimkan permintaan ke OpenRouter API untuk memastikan koneksi dan kredensial berfungsi.

## ⚠️ Pemecahan Masalah

### Error: "Tidak dapat terhubung ke server backend"
- Pastikan server backend berjalan di http://localhost:3000
- Periksa di terminal apakah ada error saat menjalankan server
- Pastikan port 3000 tidak digunakan oleh aplikasi lain

### Error: "OpenRouter connection failed"
- Verifikasi API key OpenRouter Anda
- Pastikan internet Anda terhubung
- Periksa apakah OpenRouter sedang mengalami gangguan

### Error dari OpenRouter API
- Periksa [dokumentasi OpenRouter](https://openrouter.ai/docs) untuk batasan atau kuota
- API key mungkin kedaluwarsa atau tidak valid
- Anda mungkin mencapai batas kuota penggunaan

## 🌐 Cara Deploy

### Deploy Backend ke Vercel (Direkomendasikan)

1. Buat akun di [Vercel](https://vercel.com)
2. Upload folder `backend/` ke GitHub repository Anda
3. Di Vercel: Import project dari GitHub → pilih repository backend
4. Di pengaturan project, tambahkan `OPENROUTER_API_KEY` di bagian "Environment Variables"
5. Deploy
6. Catat URL API yang diberikan, misalnya: `https://chatbot-backend.vercel.app/chat`

### Deploy Frontend ke Vercel

1. Upload folder `frontend/` ke GitHub repository Anda (atau gunakan folder yang sama dengan backend)
2. Di Vercel: Import project dari GitHub → pilih repository frontend
3. Di pengaturan project, tambahkan `NEXT_PUBLIC_API_URL` dengan nilai URL API backend Anda
4. Deploy
5. Akses URL yang diberikan oleh Vercel untuk menggunakan aplikasi

### Deploy Backend ke Render (Alternatif)

1. Buat akun di [Render](https://render.com)
2. Buat Web Service baru
3. Hubungkan dengan repository GitHub Anda
4. Atur:
   - Build Command: `npm install`
   - Start Command: `node index.js`
   - Environment Variables: tambahkan `OPENROUTER_API_KEY`
5. Deploy
6. Gunakan URL yang diberikan dalam konfigurasi frontend Anda

## 🛠️ Konfigurasi

### Mengubah Model AI

Proyek ini secara default menggunakan model `qwen/qwen3-0.6b-04-28:free`. Jika Anda ingin menggunakan model lain, edit file `backend/index.js` dan ubah konstanta `AI_MODEL`:

```javascript
const AI_MODEL = 'qwen/qwen3-0.6b-04-28:free'; // Ubah ke model lain seperti 'mistral' atau 'command-r'
```

Model yang tersedia di OpenRouter dapat bervariasi. Lihat [dokumentasi OpenRouter](https://openrouter.ai/docs) untuk daftar lengkap model yang didukung.

## ⚠️ Penting

- Jangan pernah menyertakan API key Anda di kode frontend
- Selalu gunakan backend untuk meneruskan permintaan ke OpenRouter
- Proyek ini menggunakan session berbasis browser, tidak ada database untuk menyimpan percakapan

## 📜 Lisensi

Proyek ini bersifat open source dan tersedia untuk digunakan secara bebas.

## 🤝 Kontribusi

Kontribusi, masalah, dan permintaan fitur dipersilakan!
