---
title: Panduan Deployment SBA-Agentic
created_at: 2025-12-28
author: DevOps Architect
status: active
priority: high
tags: [deployment, setup, environment, production]
---

# 🚀 Panduan Deployment

Panduan ini merinci langkah-langkah untuk menyiapkan lingkungan pengembangan, staging, dan produksi untuk sistem **SBA-Agentic**.

## 1. Setup Lingkungan Development

Untuk memulai pengembangan lokal, ikuti langkah-langkah berikut:

### 1.1 Prasyarat
- Node.js >= 18.x
- pnpm >= 8.x
- Docker (untuk menjalankan Redis/Postgres lokal jika tidak menggunakan layanan cloud)
- Akun Supabase (untuk database dan auth)

### 1.2 Langkah Instalasi
1. Clone repositori:
   ```bash
   git clone https://github.com/your-org/sba-agentic.git
   cd sba-agentic
   ```
2. Instal dependensi menggunakan pnpm:
   ```bash
   pnpm install
   ```
3. Salin file environment variable:
   ```bash
   cp .env.example .env
   ```
   Isi nilai-nilai yang diperlukan (Supabase URL, Anon Key, Service Role, dll).

4. Jalankan sistem dalam mode pengembangan:
   ```bash
   pnpm dev
   ```

## 2. Deployment ke Staging & Produksi

Kami menggunakan CI/CD pipeline melalui GitHub Actions untuk otomatisasi deployment.

### 2.1 Pipeline Deployment
1. **Lint & Test**: Setiap PR akan memicu pemeriksaan linting dan menjalankan unit/integration tests.
2. **Build**: Build monorepo menggunakan Turborepo untuk optimalisasi cache.
3. **Deploy**:
   - **Frontend (apps/web, apps/app)**: Di-deploy ke Vercel atau layanan serupa.
   - **Backend (apps/api)**: Di-deploy ke Cloud Functions atau containerized service (AWS ECS/GCP Cloud Run).
   - **Database**: Migrasi Prisma dijalankan terhadap instance Supabase Produksi.

### 2.2 Variabel Lingkungan Kritis
Pastikan variabel berikut dikonfigurasi di environment produksi:
- `DATABASE_URL`: Koneksi ke Postgres Produksi.
- `SUPABASE_SERVICE_ROLE_KEY`: Untuk operasi administratif.
- `REDIS_URL`: Untuk antrean pekerjaan (Queue) dan Analytics Heatmap.
- `OPENAI_API_KEY` / `ANTHROPIC_API_KEY`: Untuk Reasoning Engine.

## 3. Infrastruktur & Layanan Eksternal
- **Redis**: Diperlukan untuk rate limiting, antrean task (BullMQ), dan penyimpanan data heatmap rule failure secara real-time. Pastikan Redis dikonfigurasi dengan persistensi yang sesuai untuk data analitik.
- **Supabase**: Digunakan sebagai database relasional utama dan sistem autentikasi.
- **LLM Providers**: Pastikan quota dan limitasi API cukup untuk beban kerja agen.

## 3. Monitoring Pasca-Deployment
Setelah deployment, pantau metrik kesehatan di dashboard Grafana dan pastikan tidak ada lonjakan error rate di Sentry/Logfire.
