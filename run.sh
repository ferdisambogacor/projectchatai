#!/bin/bash

# Warna untuk output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== ChatBot AI Runner ===${NC}"
echo

# Pastikan file .env ada
if [ ! -f backend/.env ]; then
  echo -e "${YELLOW}File .env belum ada, membuat file .env...${NC}"

  # Minta API key jika tidak diberikan
  if [ -z "$1" ]; then
    echo -e "${YELLOW}Masukkan OpenRouter API key Anda:${NC}"
    read -p "> " API_KEY
  else
    API_KEY=$1
    echo -e "${YELLOW}Menggunakan API key dari parameter command line${NC}"
  fi

  # Tulis ke file .env
  echo "OPENROUTER_API_KEY=$API_KEY" > backend/.env
  echo "PORT=3000" >> backend/.env

  echo -e "${GREEN}File .env telah dibuat!${NC}"
fi

# Periksa apakah node dan npm tersedia
if ! command -v node &> /dev/null; then
  echo -e "${RED}Error: Node.js tidak ditemukan${NC}"
  echo "Silakan install Node.js dari https://nodejs.org/"
  exit 1
fi

# Periksa apakah bun tersedia, jika tidak gunakan npm
USE_BUN=false
if command -v bun &> /dev/null; then
  USE_BUN=true
  echo -e "${GREEN}Bun terdeteksi, akan digunakan untuk menginstall dan menjalankan frontend${NC}"
else
  echo -e "${YELLOW}Bun tidak terdeteksi, akan menggunakan npm untuk frontend${NC}"
fi

# Periksa apakah folder node_modules ada di backend
if [ ! -d backend/node_modules ]; then
  echo -e "${YELLOW}Node modules backend belum terinstall, menjalankan npm install...${NC}"

  # Pindah ke direktori backend dan instalasi packages
  cd backend
  npm install

  # Kembali ke direktori utama
  cd ..

  echo -e "${GREEN}Instalasi paket backend selesai!${NC}"
fi

# Periksa apakah folder node_modules ada di frontend
if [ ! -d frontend/node_modules ]; then
  echo -e "${YELLOW}Node modules frontend belum terinstall, menginstall dependencies...${NC}"

  # Pindah ke direktori frontend dan instalasi packages
  cd frontend
  if [ "$USE_BUN" = true ]; then
    bun install
  else
    npm install
  fi

  # Kembali ke direktori utama
  cd ..

  echo -e "${GREEN}Instalasi paket frontend selesai!${NC}"
fi

# Jalankan server backend di background
echo -e "${BLUE}Memulai server backend...${NC}"
echo -e "Server akan berjalan di ${GREEN}http://localhost:3000${NC}"

# Pindah ke direktori backend dan jalankan server
cd backend
node index.js &
BACKEND_PID=$!
cd ..

# Menunggu backend siap
echo -e "${YELLOW}Menunggu backend siap...${NC}"
sleep 3

# Jalankan frontend
echo -e "${BLUE}Memulai server frontend...${NC}"
echo -e "Server akan berjalan di ${GREEN}http://localhost:3001${NC}"
echo -e "Buka browser dan kunjungi ${GREEN}http://localhost:3001${NC} untuk mengakses chatbot"
echo -e "Tekan ${YELLOW}Ctrl+C${NC} untuk menghentikan semua server\n"

# Pindah ke direktori frontend dan jalankan server
cd frontend
if [ "$USE_BUN" = true ]; then
  PORT=3001 bun run dev
else
  PORT=3001 npm run dev
fi

# Ketika frontend berhenti, matikan backend juga
kill $BACKEND_PID
