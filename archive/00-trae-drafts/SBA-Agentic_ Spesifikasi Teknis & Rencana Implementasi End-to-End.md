# SBA‑Agentic: Spesifikasi Teknis & Rencana Implementasi End‑to‑End

## Arsitektur Sistem
- Monorepo pnpm/Turborepo; `apps/web` (Next.js App Router), `apps/app` (UI tambahan), `apps/api` (endpoint bisnis) dengan Prisma/Postgres.
- Observability: OpenTelemetry untuk tracing/metrics; Prometheus exposition via `/api/metrics/prometheus`.

## Diagram Alur Kerja (Deskriptif)
- Pengguna → Auth → Dashboard → Chat/Upload → Backend proses → Metrik di Prometheus → Baseline assertion → Laporan CI.

## Fitur Utama
- Autentikasi & sesi; dashboard ringkasan; chat dengan streaming; unggah konten multi tipe; observability & widget baseline; E2E terotomasi.

## Persyaratan Teknis
- ESM pada `next.config.mjs`; alias/stub untuk isolasi; `tsconfig.build.json` konsisten; vitest/playwright terstandar; GitHub Actions untuk CI.
- Keamanan: sanitasi input, proteksi rute, pengelolaan rahasia via env.
- Performa: caching terukur, streaming UI, minim blocking; monitor latensi melalui histogram.
- A11y: landmark, fokus, aria; halaman fallback global.

## Kontrak API
- `GET /api/metrics/prometheus`: teks Prometheus (histogram `_bucket/_sum/_count`, counters `_total`).
- `POST /api/metrics/ingest`: serap sample metrik (k6‑like); validasi payload.
- `GET/POST /api/metrics/baseline`: baca/tulis snapshot baseline untuk E2E & widget.
- Endpoint Auth/Chat/Upload sesuai modul, dengan guard/middleware.

## Model Data (Prisma)
- `User`, `Session`, `Message`, `Upload` dengan relasi yang relevan; indeks untuk query kritikal.

## Konfigurasi Lingkungan
- Env aman di test (stub Redis/Supabase/OTel); variabel default untuk lokal; validasi env pada startup.

## Observability
- Metrik HTTP dan bisnis; label rute/metode; baseline assertion untuk memastikan tren peningkatan sesuai ekspektasi.

## Rencana Implementasi
- Tahap 1: Fondasi & isolasi; Tahap 2: Auth↔Prisma; Tahap 3: Observability & baseline; Tahap 4: E2E & CI; Tahap 5: UI polish & performa.

## Kriteria Penerimaan
- Build & test lulus; E2E stabil; baseline & artefak CI terkelola; dokumentasi lengkap.

