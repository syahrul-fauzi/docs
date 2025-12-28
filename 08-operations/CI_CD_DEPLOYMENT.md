---
title: SBA-Agentic CI/CD & Deployment
created_at: 2025-12-28
author: Documentation Architect
status: active
priority: high
tags: [ci, cd, deployment, workflow, build]
---

# SBA-Agentic CI/CD & Deployment

Panduan otomatisasi integrasi, pengujian, dan pengiriman aplikasi SBA-Agentic.

## 1. Perintah Kualitas Lokal (CI Simulation)

Sebelum melakukan push, jalankan perintah berikut untuk memastikan kualitas kode:

- **Linting**: `pnpm run ci:lint` (Biome).
- **Type-check**: `pnpm run check` (Turbo).
- **Testing**: `pnpm run test:ci` (Vitest).
- **Security Guard**: `pnpm run ci:guard` (Semgrep/Audit).

## 2. Alur Kerja CI/CD (GitHub Actions)

Pipeline otomatis dipicu pada setiap Pull Request dan Push ke branch utama:

1. **Pre-flight**: Linting, Type-check, dan Security Scan.
2. **Test**: Unit tests dan Integration tests secara paralel.
3. **E2E**: Pengujian Playwright pada browser headless.
4. **Build**: Pembuatan artefak produksi untuk setiap aplikasi (`apps/web`, `apps/app`, `apps/api`).
5. **Deploy**: Pengiriman otomatis ke lingkungan Staging/Produksi.

## 3. Strategi Deployment

- **Environment**: Terbagi menjadi `development`, `staging`, dan `production`.
- **Scripts**:
  - Deploy: `pnpm run staging:deploy`
  - Health Check: `pnpm run staging:health`
- **Asset Optimization**:
  - Penggunaan Brotli compression untuk payload statis.
  - Purge CSS via Tailwind untuk optimasi bundle.
  - CDN Caching untuk aset publik.

## 4. Validasi Build

- Verifikasi variabel lingkungan (Environment Variables) wajib pada saat build time.
- Gating berdasarkan ukuran bundle (Bundle size limit).
- Pengecekan kompatibilitas versi Node.js dan pnpm di lingkungan CI.
