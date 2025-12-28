---
title: SBA-Agentic Technical Guidelines
created_at: 2025-12-28
author: Documentation Architect
status: active
priority: high
tags: [technical, specification, architecture, guidelines, environment]
---

# SBA-Agentic Technical Guidelines

Dokumen otoritas untuk spesifikasi teknis, arsitektur, dan panduan pengembangan SBA-Agentic.

## 1. Arsitektur Sistem

SBA-Agentic menggunakan arsitektur monorepo berbasis Turborepo dan pnpm workspaces.

- **Frontend (Web)**: `apps/web` (Next.js 14, React 18, Tailwind).
- **Frontend (App)**: `apps/app` (Next.js 15).
- **Backend (API)**: `apps/api` (NestJS, Prisma, BullMQ/Redis, Socket.IO).
- **Shared Packages**: `packages/*` (`@sba/auth`, `@sba/security`, `@sba/services`, `@sba/ui`, `@sba/shared-utils`).
- **Data & Platform**: Supabase (PostgreSQL), Redis (Caching/Queue).
- **Observability**: OpenTelemetry (Traces), Prometheus (Metrics).

## 2. Komponen Reasoning Runtime

Engine reasoning `@sba/agentic-reasoning` bertindak sebagai otak dari agent:
- **Orchestrator**: `apps/app/src/processes/agentic/orchestrator.ts` mengelola perencanaan tugas.
- **Runtime Loop**: `apps/app/src/processes/agentic/runtime.ts` mencatat log keputusan setiap langkah.
- **Bootstrapping**: Diinisialisasi via `apps/app/src/instrumentation.ts`.

## 3. Kebutuhan Non-Fungsional

- **Keamanan**:
  - JWT HS256 untuk sesi.
  - Verifikasi HMAC + Timestamp untuk webhook.
  - RBAC (Role-Based Access Control) terpusat.
  - Content Security Policy (CSP) aktif.
- **Performa**:
  - Target respons API user-facing ≤ 2s untuk 95% request.
  - Backoff eksponensial dengan jitter untuk retry.
  - Evaluasi feature flags O(1) (tanpa DB call).
- **Reliabilitas**:
  - Rollback otomatis jika health check gagal pasca-deploy.
  - Target coverage unit test ≥ 80%.

## 4. Antarmuka Modul Utama

| Modul | Fungsi |
|-------|--------|
| `@sba/shared-utils/security/tenant` | Validasi header tenant. |
| `@sba/shared-utils/rate-limit` | Limiter in-memory & shared (Redis). |
| `@sba/shared-utils/error` | Formatter respons JSON error standar. |
| `@sba/shared-utils/request` | Helper pengambilan header case-insensitive. |

## 5. Konfigurasi Lingkungan (Environment)

Setiap aplikasi/paket memerlukan file `.env` yang merujuk pada `.env.example`.
- **Auth**: `CLERK_SECRET_KEY`, `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`.
- **Database**: `DATABASE_URL`, `DIRECT_URL`.
- **Redis**: `REDIS_URL`.
- **Feature Flags**: `FF_<FLAG>=true|false` atau `FF_<FLAG>=canary:<PERCENT>`.

## 6. Standar Kualitas & Testing

- **Unit Testing**: Menggunakan Vitest. Fokus pada utilitas, layanan, dan komponen UI.
- **E2E Testing**: Menggunakan Playwright. Fokus pada flow kritis (Login, Chat, Workflow).
- **CI Gates**:
  - Type-check: `pnpm run type-check`.
  - Linting: `pnpm run lint`.
  - Security Scan: Semgrep/ZAP baseline.
  - Performance: Lighthouse budget gate.
