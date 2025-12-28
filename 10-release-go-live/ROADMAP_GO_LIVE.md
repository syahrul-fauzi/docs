---
title: Go-Live Roadmap for SBA-Agentic (Clean Architecture)
created_at: 2025-12-28
author: Documentation Architect
status: active
priority: critical
tags: [roadmap, go-live, architecture, strategy]
---

# SBA-Agentic — Roadmap Go-Live (Arsitektur Bersih)

## Ringkasan Eksekutif

- Tujuan: menyatukan lapisan data, memperkuat keamanan multi-tenant, meningkatkan skalabilitas (WS/Queue/Cache), dan menstandardisasi kualitas kode untuk siap produksi.
- Arah arsitektur: strategi dual-layer — Supabase untuk auth/RLS/pengetahuan dan Prisma untuk tabel layanan internal (runs/steps/tool_calls/audit/metrics) dengan transaksi kuat.

## Situasi Saat Ini (Temuan Utama)

- Supabase klien tersebar di beberapa lokasi (API, packages/supabase, packages/db, klien lokal apps), sumber kebenaran ganda untuk tipe/env.
- API kadang memakai `NEXT_PUBLIC_*` untuk server, berisiko keamanan.
- WebSocket auth hanya decode payload tanpa verifikasi signature.
- Rate limiting HTTP in-memory (tidak terdistribusi), event WS belum dilimit.
- Cache in-memory sederhana; tidak terdistribusi dan tanpa kebijakan LRU.
- ESLint konfigurasi ganda (flat vs legacy) dan versi tidak konsisten; coverage exclude path kurang tepat.

## Keputusan Arsitektur

- Satu sumber kebenaran klien Supabase berada di `packages/supabase`.
- Dual-layer data:
  - Supabase: auth, RLS, knowledge FTS/pgvector, edge functions.
  - Prisma: tabel layanan internal (agent_runs, agent_steps, tool_calls, audit_logs, usage_metrics, system_health) — `apps/api/prisma/schema.prisma`.
- API/worker hanya memakai Supabase Service Role (`SUPABASE_SERVICE_ROLE_KEY`/`SUPABASE_SERVICE_KEY`), UI memakai SSR/Browser client.
- `packages/db` dinyatakan deprecated, fungsi relevan digabung ke `packages/supabase`.

## Rancangan Data Layer

- Supabase
  - Klien:
    - Browser (`packages/supabase/src/clients/client.ts`) dan SSR (`packages/supabase/src/clients/server.ts`).
    - Node admin (`packages/supabase/src/clients/node-admin.ts`).
  - Konteks tenant: panggil `rpc('set_tenant_context', { tenant_id })` sebelum query multi-tenant di server.
  - Sumber tipe `Database` di `packages/supabase/types`.
- Prisma
  - Koneksi ke `DATABASE_URL` Supabase Postgres.
  - Schema `service` untuk tabel internal (opsional), atau gunakan filter ketat `tenantId` + kebijakan RLS menggunakan `current_setting('app.tenant_id')` dan `SET app.tenant_id` di awal request.

## Batas Lapis Layanan (Service Boundaries)

- Supabase Repository: akses data yang butuh RLS (user/session, knowledge/documents, konten multi-tenant).
- Prisma Repository: akses operasi internal dan metadata (runs/steps/calls/audit/metrics/health), transaksi, agregasi.
- Use-case orchestration (API):
  - Ambil pengetahuan → jalankan agent → simpan run/step/call via Prisma → kirim event WS/SSE → audit/metrics via Prisma.

## Keamanan dan Kepatuhan

- Auth WS: verifikasi JWT signature di handshake, bukan hanya decode payload.
- Rate limiting:
  - HTTP: Redis/Upstash per tenant/IP/method, 429 handling.
  - WS: limit event per user/tenant dan anti-spam broadcast.
- CORS: allowlist ketat dari konfigurasi tenant.
- Defense in depth: meski menggunakan RLS, tetap sertakan filter eksplisit `tenantId` di queries Prisma.

## Skalabilitas & Performa

- WebSocket: Socket.IO Redis adapter untuk multi-node, backpressure, health checks.
- Queue/Workers (BullMQ): autoscale workers; korelasi job-id di tracing.
- Cache: Redis/kv dengan TTL adaptif, namespace per-tenant, invalidasi berbasis versi.
- Knowledge search: gunakan pgvector + reranker; FTS sebagai fallback biaya rendah.
- Circuit breaker + retry jitter untuk RPC/fungsi edge.

## Kualitas Kode & CI/CD

- ESLint: satu flat config v9 di root; sinkronkan semua workspace ke versi yang sama.
- Prettier: konfigurasi root, jalankan via turborepo.
- CODEOWNERS: tetapkan kepemilikan per direktori (`.github/CODEOWNERS`).
- Testing: vitest threshold 80% dengan exclude yang benar; Playwright E2E untuk CSP/Auth/WS.
- Observabilitas: tracing OpenTelemetry di jalur tool execution & queue; dashboard Grafana/Datadog dengan SLO.

## Rencana ReOrganize/Refactor (Langkah Konkret)

1. Konsolidasi Supabase

- Migrasikan semua impor ke `@sba/supabase/*` (browser/server/node-admin).
- Pindahkan tipe database tunggal ke `packages/supabase/types`.
- Hapus klien lokal duplikat di `apps/app` dan `apps/docs`.
- Deprecate `packages/db` dan rencanakan penghapusan alias di `tsconfig.json`.

2. Penguatan API

- Validasi JWT handshake WS; tambahkan guard/adapter Redis.
- Rate limiting HTTP/WS terdistribusi; kebijakan konsisten lintas stack.
- Ganti cache Map lokal dengan Redis/kv; tambahkan helper caching standar di API.

3. Data & Query

- Implement pgvector + reranker untuk knowledge; audit indeks dan kolom minimal.
- Terapkan `SET app.tenant_id` + kebijakan RLS untuk schema Prisma (opsional, jika diinginkan proteksi DB-side).

4. Observabilitas & Keamanan

- Lengkapi tracing end-to-end; korelasi job-id/tenantId.
- Perketat CORS allowlist; fail-fast env validation.

5. Kualitas & CI/CD

- Standarisasi ESLint v9; hapus config ganda.
- Tambah `.github/CODEOWNERS`; perkuat pipeline lint/test/coverage.

## Roadmap Waktu (Indicative)

- Minggu 1: Konsolidasi Supabase (impor/klien/tipe), deprecate `packages/db`.
- Minggu 2: WS auth + Redis adapter, limiter HTTP/WS, cache Redis.
- Minggu 3: pgvector + reranker, audit query, circuit breaker.
- Minggu 4: Tracing OTel lengkap, dashboard SLO, CORS/ENV audit, ESLint v9 konsolidasi, CODEOWNERS.
- Go-Live: uji beban, canary untuk edge functions, rollback plan.

## Risiko & Mitigasi

- Inkonsistensi env: validasi runtime dan dokumentasi env terpadu.
- RLS salah konfigurasi: defense in depth (filter tenant di aplikasi + kebijakan DB-side bila diaktifkan).
- WS bottleneck: Redis adapter + backpressure + limiter event.
- Query lambat: indeks audit, pilih kolom minimal, fallback strategi.

## Referensi Teknis

- Admin client: `packages/supabase/src/clients/node-admin.ts`
- Konsumsi API: `apps/api/src/infrastructure/repositories/SupabaseClient.ts`
- Prisma models: `apps/api/prisma/schema.prisma`
- Tenant guard: `apps/api/src/app.ts:61-76`
- Tools controller: `apps/api/src/api/tools.controller.ts`

## Status

- ADR konsolidasi data layer ditambahkan dan admin client tersedia.
- Perbaikan coverage path dilakukan (`vitest.config.ts`).
