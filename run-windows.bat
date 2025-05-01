@echo off
TITLE ChatBot AI Runner
COLOR 0A

echo === ChatBot AI Runner ===
echo.

REM Pastikan file .env ada
IF NOT EXIST backend\.env (
  echo File .env belum ada, membuat file .env...
  echo.

  REM Minta API key
  SET /P API_KEY=Masukkan OpenRouter API key Anda:

  REM Tulis ke file .env
  echo OPENROUTER_API_KEY=%API_KEY%> backend\.env
  echo PORT=3000>> backend\.env

  echo File .env telah dibuat!
  echo.
)

REM Periksa apakah node tersedia
WHERE node >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
  echo Error: Node.js tidak ditemukan
  echo Silakan install Node.js dari https://nodejs.org/
  echo.
  pause
  exit /b
)

REM Periksa apakah bun tersedia
WHERE bun >nul 2>nul
IF %ERRORLEVEL% EQU 0 (
  SET USE_BUN=true
  echo Bun terdeteksi, akan digunakan untuk menginstall dan menjalankan frontend
) ELSE (
  SET USE_BUN=false
  echo Bun tidak terdeteksi, akan menggunakan npm untuk frontend
)
echo.

REM Periksa apakah folder node_modules ada di backend
IF NOT EXIST backend\node_modules (
  echo Node modules backend belum terinstall, menjalankan npm install...
  echo.

  REM Pindah ke direktori backend dan instalasi packages
  cd backend
  npm install

  REM Kembali ke direktori utama
  cd ..

  echo Instalasi paket backend selesai!
  echo.
)

REM Periksa apakah folder node_modules ada di frontend
IF NOT EXIST frontend\node_modules (
  echo Node modules frontend belum terinstall, menginstall dependencies...
  echo.

  REM Pindah ke direktori frontend dan instalasi packages
  cd frontend
  IF "%USE_BUN%"=="true" (
    bun install
  ) ELSE (
    npm install
  )

  REM Kembali ke direktori utama
  cd ..

  echo Instalasi paket frontend selesai!
  echo.
)

REM Jalankan server backend di background
echo Memulai server backend...
echo Server akan berjalan di http://localhost:3000
echo.

REM Buka command prompt baru untuk backend
start cmd /k "cd backend && node index.js"

REM Menunggu backend siap
echo Menunggu backend siap...
timeout /t 3 /nobreak >nul

REM Jalankan frontend
echo Memulai server frontend...
echo Server akan berjalan di http://localhost:3001
echo Buka browser dan kunjungi http://localhost:3001 untuk mengakses chatbot
echo.

REM Pindah ke direktori frontend dan jalankan server
cd frontend
IF "%USE_BUN%"=="true" (
  SET PORT=3001
  bun run dev
) ELSE (
  SET PORT=3001
  npm run dev
)
