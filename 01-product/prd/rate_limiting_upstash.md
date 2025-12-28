---
title: Rate Limiting Upstash
id: PRD-005
created_at: 2025-12-06
last_modified: 2025-12-06
author: team@sba
reviewer: lead@sba, sre@sba
status: Draft
priority: P0
related:
  - ../../02-architecture/_index.md
  - ../../05-api/_index.md
---

## Problem Statement

- Proteksi spam/abuse perlu rate limit publik dan auth.
- Data pendukung:
  - `/home/inbox/smart-ai/sba-agentic/README.md:8-9`, `128-129` rate limit Upstash.
  - `packages/kv/src/ratelimit.ts` wrapper Upstash dengan fallback in-memory.
  - `apps/api/src/common/rate-limit.interceptor.ts` rate-limit per `tenant|method|path`.
- Impact analysis: Tanpa rate-limit, endpoint dapat disalahgunakan.

## Goals

- Rate-limit per `tenant|method|path`; 429 pada pelanggaran.
- Fallback aman di dev/staging.

## Non-goals

- Tidak mencakup kuota berbasis paket berbayar.

## User Stories

- P0: Sebagai operator, saya ingin batasan 10/10s untuk publik sehingga beban terkendali.

## Acceptance Criteria

- Interceptor/middleware aktif; header terkait tampil.
- Test scenarios: melampaui batas; multi-tenant.
- Failure scenarios: Upstash tidak tersedia → fallback in-memory aktif; klien melewati batas → 429.

## Risiko & Mitigasi

- Risiko: konfigurasi Upstash gagal → Mitigasi: fallback in-memory.
- Severity/Owner/Due:
  - High — Abuse tanpa limit; Owner: SRE; Due: Sprint 1.
  - Medium — False 429; Owner: Eng Lead; Due: Sprint 2.

## Dampak Sistem

- UI/UX: pesan rate-limit.
- API: middleware/interceptor; header.

## References

- `/packages/kv/src/ratelimit.ts`
- `/apps/api/src/common/rate-limit.interceptor.ts`
- `/apps/web/middleware.ts`

## QA & Review

- Stakeholder: SRE, Eng Lead.
- Instruksi approval: Approved setelah tes limit dan fallback lulus; catat metrik pelanggaran.
- Proses Review: draft → review SRE/EL → perbaikan → tanda tangan (≥2) → Approved.

## Diagram

- Sequence: interceptor → ratelimit → 200/429 (placeholder)
- ERD: rate-limit buckets (tenant|method|path), counters/windows (placeholder)

## Timeline

- Sprint 1: Implement interceptor/middleware dan konfigurasi Upstash.
- Sprint 2: Fallback in-memory; header 429; monitoring pelanggaran.
- Gate: uji melampaui batas dan multi-tenant.

## Testing Strategy

- Unit: wrapper ratelimit; fallback in-memory.
- Integration: interceptor/middleware menghasilkan 429 saat limit; header verifikasi.
- Coverage target: ≥80% untuk rate-limit paths.

## Persona

- SRE/Operator: menetapkan kuota; memantau pelanggaran; menjaga availability.
- Developer: menyesuaikan limit per rute.

## UX Flow

- Request → interceptor/middleware → cek bucket → 200/429 → log.

## Persyaratan Sistem/Lingkungan

- Upstash Redis REST URL/TOKEN; fallback in-memory di dev.
- Header terkait rate-limit (contoh `Retry-After`) bila melanggar.

## Features Out

- Kuota paket berbayar; konfigurasi limit per-customer dinamis.
