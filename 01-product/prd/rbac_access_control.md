---
title: RBAC Access Control
id: PRD-002
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

- Endpoint API harus dilindungi sesuai peran/tenant untuk mencegah akses tidak sah.
- Data pendukung:
  - `/home/inbox/smart-ai/sba-agentic/README.md:74-75` RBAC via `withRBAC` membaca peran dari sesi Supabase/cookie.
  - `apps/app/src/app/api/*/route.ts` menunjukkan pola guard `withRBAC` konsisten di rute.
- Impact analysis: Tanpa RBAC, risiko kebocoran data dan tindakan tidak sah meningkat.

## Goals

- 100% endpoint kritis memakai `withRBAC` guard dan audit 403 tercatat.
- Mapping role → permissions terdokumentasi; mudah diextend.

## Non-goals

- Tidak mencakup ABAC atau policy engine kompleks.

## User Stories

- P0: Sebagai admin, saya ingin endpoint kontrol agen hanya bisa diakses oleh admin sehingga operasi aman.
- P1: Sebagai auditor, saya ingin melihat log akses ditolak sehingga audit berjalan.

## Acceptance Criteria

- Semua route kritis dibungkus `withRBAC(resource, action)`; akses tidak sah ditolak 403.
- Test scenarios: role berbeda; tanpa sesi; tenant mismatch.
- Success metrics: 0 bypass diketahui; audit lengkap untuk penolakan.
- Failure scenarios: sesi invalid → deny; cookie test non-admin → 403; missing tenant → 400/403 sesuai kebijakan.

## Risiko & Mitigasi

- Risiko: Konfigurasi role tidak sinkron → Mitigasi: validasi startup; tests.
- Contingency: fallback deny-all bila sesi tidak valid.
- Severity/Owner/Due:
  - High — Bypass RBAC; Owner: Security Lead; Due: Sprint 1.
  - Medium — Audit incompleteness; Owner: PM; Due: Sprint 2.

## Dampak Sistem

- UI/UX: pesan error terkontrol.
- API: guard di semua route; audit logs.
- Agent: operasi kontrol mengikuti RBAC.
- Dependencies: Supabase sesi; cookie test `__test_auth`.

## References

- `/apps/app/src/shared/lib/rbac.ts`
- `/apps/app/src/app/api/*/route.ts`
- `/API_REFERENCE.md`
- `/home/inbox/smart-ai/sba-agentic/README.md:74-75`

## QA & Review

- Stakeholder: Product Lead, Security Lead.
- Instruksi approval: set `status: Approved` dan tulis reviewer di frontmatter setelah persetujuan.
- Proses Review: draft → review PL/SL → perbaikan → tanda tangan (≥2) → Approved.

## Diagram

- Sequence: request → withRBAC → decision → response (placeholder)
- ERD: roles, permissions, role_permission_map, audit_logs (placeholder)

## Timeline

- Sprint 1: Audit route kritis dan penambahan `withRBAC`.
- Sprint 2: Logging audit 403 + laporan akses.
- Gate: tes peran/tenant; deny-all fallback teruji.

## Testing Strategy

- Unit: evaluasi `withRBAC(resource, action)` untuk berbagai role.
- Integration: akses route kritis dengan sesi valid/tidak valid; audit 403.
- Coverage target: ≥80% untuk guard dan route kritis.

## Persona

- Admin/Security Engineer: menetapkan role/permissions dan mengaudit akses.
- Auditor: memverifikasi penolakan dan kepatuhan akses.

## UX Flow

- Request → `withRBAC` cek role/tenant → allow/deny → audit log.

## Persyaratan Sistem/Lingkungan

- Supabase sesi; cookie test `__test_auth` untuk dev.
- Middleware RBAC pada route kritis.

## Features Out

- ABAC/policy engine kompleks; delegasi dinamis lintas tenant.
