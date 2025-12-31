---
title: Production Readiness Checklist for SBA-Agentic
created_at: 2025-12-28
author: Documentation Architect
status: active
priority: critical
tags: [release, production, readiness, checklist, go-live]
---

# Production Readiness Checklist

Dokumen ini adalah daftar periksa komprehensif yang harus dipenuhi sebelum SBA-Agentic dinyatakan siap untuk rilis produksi. Daftar ini menggabungkan persyaratan teknis, operasional, dan keamanan.

## 1. Konfigurasi & Lingkungan (Pre-Launch)

- [ ] **Environment Variables**: `.env` produksi telah dikonfigurasi dengan `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `UPSTASH_REDIS_REST_URL`, dan `UPSTASH_REDIS_REST_TOKEN`.
- [ ] **Supabase Clients**: Verifikasi penggunaan factory internal `@sba/supabase/clients/client` (browser) dan `@sba/supabase/clients/server` (SSR). Tidak ada hardcode URL/key.
- [ ] **Secret Management**: Jalankan `pnpm run ci:guard`. Semua rahasia harus aman dan tidak bocor ke bundle klien.
- [ ] **Automated Validation**: Skrip `./scripts/verify-release.sh` memberikan hasil hijau.

## 2. Kualitas Kode & Testing

- [ ] **Build Status**: Seluruh aplikasi (`apps/*`) dan paket (`packages/*`) berhasil di-build tanpa error.
- [ ] **Type Checking**: `pnpm -r type-check` berhasil di seluruh monorepo.
- [ ] **Unit & Integration Tests**: Seluruh suite testing (Vitest + RTL/Supertest) lulus. Cakupan kode kritis ≥ 80%.
- [ ] **E2E Testing**: Critical user journeys (Login, Chat, Workflow, Dashboard) lulus di Playwright.
- [ ] **A11y Audits**: Audit Axe-core tidak menemukan isu "critical" atau "serious".
- [ ] **Performance Baselines**: 
    - CRUD p95 ≤ 2s.
    - Streaming T90 < 2s.
    - **Web Research/Search**: p90 < 2s (orchestrated), p90 < 200ms (cached).
    - **Intent Recognition**: Accuracy ≥ 98%.
    - Error rate ≤ 0.5%.

## 3. Keamanan & Privasi

- [ ] **Security Headers**: CSP active nonce terpasang. `helmet` dan `cors` dikonfigurasi dengan benar di API.
- [ ] **Rate Limiting**: Upstash rate limit aktif untuk endpoint publik dan terautentikasi.
- [ ] **RBAC & Multi-tenancy**: `JwtAuthGuard` dan `RolesGuard` aktif. Isolasi tenant diverifikasi.
- [ ] **TLS Encryption**: TLS 1.3 wajib untuk semua komunikasi data in-transit.

## 4. Observability & Operasi

- [ ] **Metrics Endpoints**: `GET /metrics` dan `GET /metrics/workers` (API) dapat diakses dan mengembalikan data.
- [ ] **Monitoring Stack**: Scraping Prometheus/OTel aktif. Dashboard Grafana (`ops/grafana/*`) siap digunakan.
- [ ] **Alerting**: Alert rules terkonfigurasi untuk latensi p95, error rate, dan ketersediaan sistem. Notifikasi terhubung ke Slack/Email/Pager.
- [ ] **Structured Logging**: Log mencakup `request-id` dan `tenant-id` untuk kemudahan penelusuran.

## 5. Deployment & Canary

- [ ] **Staging Verification**: Smoke tests sukses di lingkungan staging.
- [ ] **Rollback Plan**: Prosedur rollback telah diuji dan owner telah ditetapkan.
- [ ] **Canary Strategy**: Rollout awal 5% dengan observasi minimal 30 menit sebelum peningkatan bertahap.
- [ ] **Health Checks**: Endpoint `GET /health` aktif di seluruh layanan.

## 6. Sign-off Final

- [ ] **Engineering Lead**
- [ ] **QA Lead**
- [ ] **Security Lead**
- [ ] **SRE/Ops Lead**
- [ ] **Product Owner**
