---
title: Panduan Instalasi & Konfigurasi
created_at: 2025-12-28
author: SBA-Agent
status: active
priority: critical
tags: [installation, configuration, setup, troubleshooting]
---

# 🚀 Panduan Instalasi & Konfigurasi

Dokumen ini memberikan instruksi langkah demi langkah untuk menyiapkan lingkungan pengembangan SBA-Agentic.

## 📋 Persyaratan Sistem Minimum

Sebelum memulai, pastikan mesin Anda memenuhi persyaratan berikut:

- **Sistem Operasi**: Linux (Ubuntu 22.04+ direkomendasikan), macOS (Intel/Apple Silicon), atau Windows (via WSL2).
- **Node.js**: Versi 20.x atau lebih tinggi (LTS direkomendasikan).
- **Package Manager**: `pnpm` versi 9.x atau lebih tinggi.
- **Database**: PostgreSQL 15+ (direkomendasikan menggunakan Supabase).
- **Caching/Queue**: Redis 7.x+.
- **Memori**: Minimum 8GB RAM (16GB direkomendasikan untuk menjalankan seluruh monorepo).

## 🛠️ Langkah-langkah Instalasi Terperinci

### 1. Kloning Repositori

```bash
git clone https://github.com/your-org/sba-agentic.git
cd sba-agentic
```

### 2. Instalasi Dependensi

Gunakan `pnpm` untuk menginstal seluruh dependensi di dalam monorepo:

```bash
pnpm install
```

### 3. Setup Supabase (Lokal)

SBA-Agentic menggunakan Supabase CLI untuk pengembangan lokal. Pastikan Docker sudah berjalan sebelum memulai.

1. **Instal Supabase CLI** (jika belum):

   ```bash
   npm install supabase --save-dev
   ```

2. **Inisialisasi & Mulai Stack**:

   ```bash
   npx supabase start
   ```

3. **Migrasi Database**:

   ```bash
   npx supabase db reset
   ```

4. **Catat Credentials**:

   Setelah stack berjalan, Anda akan mendapatkan output berisi `API URL`, `anon key`, dan `service_role key`. Gunakan ini untuk mengisi file `.env`.

### 4. Konfigurasi Lingkungan (Environment Variables)

Kami menggunakan struktur `.env` yang terdesentralisasi namun terkoordinasi.

1. **Root `.env`**: Digunakan untuk variabel global dan rahasia bersama.

   ```bash
   cp .env.example .env
   ```

2. **App-specific `.env`**:

   ```bash
   # apps/app (Frontend)
   cp apps/app/.env.example apps/app/.env.local

   # apps/api (Backend)
   cp apps/api/.env.example apps/api/.env.local

   # apps/internal-console (Vite + Local API Gateway)
   # (buat file secara manual jika belum ada template)
   # apps/internal-console/.env.local
   ```

**Variabel Kunci yang Harus Diisi:**

- `NEXT_PUBLIC_SUPABASE_URL`: <http://localhost:54321>
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: (didapat dari `supabase start`)
- `SUPABASE_SERVICE_ROLE_KEY`: (didapat dari `supabase start`)
- `CLERK_SECRET_KEY`: (jika menggunakan Clerk untuk Auth)

**Variabel Kunci untuk Internal Console (opsional, rekomendasi):**

- `VITE_CONTROL_PLANE_URL`: Base URL API yang menyediakan endpoint control (mis. `/agents/*`).
- `VITE_USE_SYNC_STORAGE`: `true|false` (default: false). Mengaktifkan adapter storage dengan sinkronisasi.
- `VITE_DEBUG_SYNC`: `true|false` (default: false). Mengaktifkan output log non-error untuk debug.
- `API_PORT`: Port Local API Gateway (default: `3001`).

### 5. Menjalankan Lingkungan Pengembangan

Jalankan seluruh aplikasi secara paralel menggunakan Turborepo:

```bash
pnpm dev
```

Untuk menjalankan aplikasi tertentu saja:

```bash
pnpm dev --filter=app    # Hanya frontend
pnpm dev --filter=api    # Hanya backend
```

Aplikasi akan tersedia di:

- **Control Plane**: <http://localhost:3000>
- **Public Web**: <http://localhost:3001>
- **API Gateway**: <http://localhost:4000>
- **Supabase Studio**: <http://localhost:54323>

## 🖥️ Menjalankan Internal Console Saja

Gunakan ini jika fokus pengembangan ada di `apps/internal-console`.

```bash
pnpm -C apps/internal-console dev
```

Aplikasi akan tersedia di:

- **Internal Console UI (Vite)**: <http://localhost:5173>
- **Internal Console Local API Gateway**: <http://localhost:3001/health>

Catatan: Jika di mesin Anda sudah ada service lain di port `3001`, set `API_PORT` di `apps/internal-console/.env.local`, lalu sesuaikan target proxy di `apps/internal-console/vite.config.ts`.

## ⚙️ Konfigurasi Lingkungan Pengembangan

### Docker & Resource Allocation

Supabase lokal menjalankan banyak kontainer (Postgres, GoTrue, PostgREST, dll.). Pastikan Docker Desktop memiliki alokasi memori minimal 4GB agar berjalan lancar.

### Editor (VS Code)

Kami merekomendasikan penggunaan VS Code dengan ekstensi berikut:

- **ESLint**: Untuk linting kode.
- **Prettier**: Untuk pemformatan kode.
- **Tailwind CSS IntelliSense**: Untuk bantuan utility classes.
- **Prisma**: Untuk sintaks skema database.
- **Deno**: Untuk pengembangan Supabase Edge Functions.

### Git Hooks

Proyek ini menggunakan `husky` untuk menjalankan linting dan type-checking sebelum commit. Jangan gunakan flag `--no-verify` kecuali dalam keadaan darurat.

## 🔍 Penyelesaian Masalah Umum

### 1. Masalah Docker (Supabase)

**Gejala**: `supabase start` gagal atau hang.
**Solusi**:

- Pastikan Docker Desktop berjalan.
- Jalankan `docker system prune` jika ada konflik kontainer lama.
- Cek apakah port `54321` atau `54323` sedang digunakan oleh aplikasi lain.

### 2. Masalah Instalasi `pnpm`

Jika Anda mengalami error saat `pnpm install`, coba hapus `node_modules` dan kunci lockfile:

```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### 3. Koneksi Database Gagal

Pastikan `DATABASE_URL` di `.env.local` benar. Untuk Supabase lokal, URL-nya biasanya:
`postgresql://postgres:postgres@localhost:54322/postgres`

### 4. Redis Connection Refused

Pastikan layanan Redis berjalan secara lokal. Jika menggunakan Docker:

```bash
docker-compose up -d redis
```

### 5. Error Type-Checking di Turborepo

Jika `pnpm dev` gagal because masalah tipe, jalankan pembersihan cache:

```bash
pnpm build --no-cache
```

---
_Butuh bantuan lebih lanjut? Hubungi tim melalui kanal Slack #sba-dev._
