---
title: Metrics & Observability
id: PRD-003
created_at: 2025-12-06
last_modified: 2025-12-06
author: team@sba
reviewer: lead@sba, qa@sba
status: Draft
priority: P0
related:
  - ../../02-architecture/_index.md
  - ../../05-api/_index.md
---

## Problem Statement

- Diperlukan observability metrik latensi/error rate untuk memonitor kualitas dan reliabilitas.
- Data pendukung:
  - `/home/inbox/smart-ai/sba-agentic/README.md:78-80` metrik latensi p95/p99 dibaca UI.
  - `/home/inbox/smart-ai/sba-agentic/docs/README.md:41-44` endpoint metrics mendukung format `json/prom`.
  - `apps/app/src/app/api/metrics/prometheus/route.ts` implementasi Prometheus text.
  - `apps/app/src/shared/metrics-registry.ts` menyediakan histogram/counter dan `ensureTenantHeader`.
- Impact analysis: Tanpa metrik, sulit melakukan deteksi dini dan perbaikan insiden.

## Goals

- Endpoint `/api/metrics` tersedia dan akurat; p95 ≤ 500ms; error rate ≤ 0.5%.
- Dashboard observability tersaji; label tenant otomatis.

## Non-goals

- Tidak mencakup tracing terdistribusi lanjutan.

## User Stories

- P0: Sebagai operator, saya ingin melihat metrik p95/p99 sehingga dapat menilai kesehatan sistem.
- P1: Sebagai developer, saya ingin menambahkan label custom untuk analisis tenant.

## Acceptance Criteria

- `withMetrics` membungkus route kunci; histogram/counter tersedia.
- `GET /api/metrics` mengembalikan metrik dalam `prom` text.
- Test scenarios: beban rendah/tinggi; multi-tenant.
- Failure scenarios: missing `x-tenant-id` pada rute kunci → 400; registry tidak tersedia → fallback aman.

## Risiko & Mitigasi

- Risiko: Overhead metrik → Mitigasi: sampling konservatif.
- Contingency: nonaktifkan label tertentu saat beban puncak.
- Severity/Owner/Due:
  - Medium — Registry overhead; Owner: SRE; Due: Sprint 1.
  - Low — Label misuse; Owner: Eng Lead; Due: Sprint 2.

## Dampak Sistem

- UI/UX: halaman observability.
- API: route metrics; registry metrik.
- Agent: telemetry run dicatat.

## References

- `/apps/app/src/shared/metrics-registry.ts`
- `/apps/app/src/app/api/metrics/prometheus/route.ts`
- `/home/inbox/smart-ai/sba-agentic/README.md:78-80`

## QA & Review

- Stakeholder: Eng Lead, SRE.
- Instruksi approval: status diubah ke Approved; logkan keputusan di `changelog`.
- Proses Review: draft → review EL/SRE → perbaikan → tanda tangan (≥2) → Approved.

## Diagram

- Sequence: withMetrics → registry → /api/metrics (placeholder)
- ERD: metrics registry schema (histogram/counter), labels (tenant, method, path) (placeholder)

## Timeline

- Sprint 1: Registry metrik + wrapper `withMetrics` pada rute kunci.
- Sprint 2: Endpoint Prometheus text dan dashboard.
- Gate: p95 ≤ 500ms; label tenant tervalidasi.

## Testing Strategy

- Unit: histogram/counter updates; label tenant.
- Integration: `/api/metrics` prom text; beban simulasi.
- Coverage target: ≥80% untuk registry dan route metrics.

## Persona

- SRE/Operator: memantau p95/p99 dan error rate; mengatur alerting.
- Developer: menambahkan label/analisis tenant spesifik.

## UX Flow

- Route → `withMetrics` → registry update → `/api/metrics` prom text → dashboard.

## Persyaratan Sistem/Lingkungan

- Opsi output `prom` text; label `x-tenant-id` wajib.
- Sampling konservatif untuk overhead rendah.

## Features Out

- Tracing terdistribusi lanjutan; log analitik kustom per fitur.
