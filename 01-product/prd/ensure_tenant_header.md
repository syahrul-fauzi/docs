---
title: Ensure Tenant Header
id: PRD-010
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

- Label tenant wajib untuk metrik dan isolasi multi-tenant.
- Data pendukung:
  - `/home/inbox/smart-ai/sba-agentic/README.md:78-80` label tenant otomatis untuk metrik.
  - `apps/app/src/shared/metrics-registry.ts` fungsi `ensureTenantHeader()`.
  - `apps/app/src/app/api/analytics/heatmap/route.ts` penggunaan `ensureTenantHeader` pada endpoint.

## Goals

- Header `x-tenant-id` diverifikasi di wrapper; error jika kosong pada rute kunci.

## Non-goals

- Tidak mencakup manajemen lifecycle tenant.

## User Stories

- P0: Sebagai operator, saya ingin semua request memiliki tenant sehingga metrik tepat.

## Acceptance Criteria

- `ensureTenantHeader` aktif di routes observability/analytics.
- Failure scenarios: header kosong → 400; tenant tidak dikenal → 403; dev default diterapkan bila env dev.

## Risiko & Mitigasi

- Risiko: klien lupa header → Mitigasi: default dev-tenant di dev.
- Severity/Owner/Due:
  - High — Metrik tidak terlabel; Owner: SRE; Due: Sprint 1.
  - Low — Dev header default; Owner: Eng Lead; Due: Sprint 1.

## Dampak Sistem

- API: validation; error handling.

## References

- `/apps/app/src/shared/metrics-registry.ts`
- `/apps/app/src/app/api/analytics/heatmap/route.ts`
- `/home/inbox/smart-ai/sba-agentic/README.md:78-80`

## QA & Review

- Stakeholder: SRE, Eng Lead.
- Instruksi approval: Approved setelah enforcement header dan error handling diverifikasi.
- Proses Review: draft → review SRE/EL → perbaikan → tanda tangan (≥2) → Approved.

## Diagram

- Sequence: request → ensureTenantHeader → metrics label (placeholder)
- ERD: tenants, requests, metrics labels mapping (placeholder)

## Timeline

- Sprint 1: Aktivasi validasi header pada rute observability/analytics.
- Sprint 2: Error handling & default dev-tenant.
- Gate: penolakan untuk header kosong pada rute kunci.

## Testing Strategy

- Unit: validasi header tenant; default dev-tenant.
- Integration: enforcement di routes observability/analytics; penolakan saat kosong.

## Persona

- SRE/Operator: memastikan isolasi tenant; metrik akurat per tenant.
- Developer: menerapkan `ensureTenantHeader` di rute yang relevan.

## UX Flow

- Request → validasi `x-tenant-id` → lanjut/deny → label metrics.

## Persyaratan Sistem/Lingkungan

- Header `x-tenant-id` wajib pada rute observability/analytics; default dev-tenant di dev.

## Features Out

- Manajemen lifecycle tenant penuh; isolasi data lintas region.
