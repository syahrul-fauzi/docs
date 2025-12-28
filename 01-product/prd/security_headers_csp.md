---
title: Security Headers & CSP Nonce
id: PRD-004
created_at: 2025-12-06
last_modified: 2025-12-06
author: team@sba
reviewer: lead@sba, security@sba
status: Draft
priority: P0
related:
  - ../../06-development/design-system/_index.md
  - ../../02-architecture/_index.md
---

## Problem Statement

- Aplikasi membutuhkan header keamanan kuat (CSP nonce, HSTS, X-Frame-Options, dll).
- Data pendukung:
  - `/home/inbox/smart-ai/sba-agentic/README.md:72-73`, `127-133` header keamanan aktif.
  - `apps/web/middleware.ts` menyetel CSP nonce dan Permissions-Policy.
  - `apps/app/src/__tests__/lib/security.test.ts` memverifikasi header keamanan.
- Impact analysis: Tanpa header, risiko XSS/Clickjacking meningkat.

## Goals

- CSP dengan nonce aktif; tidak ada inline script tanpa nonce.
- HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy terpasang.

## Non-goals

- Tidak mencakup Content Security Policy report-only pipeline.

## User Stories

- P0: Sebagai security engineer, saya ingin CSP nonce diterapkan sehingga XSS terhindari.
- P1: Sebagai ops, saya ingin HSTS aktif di produksi sehingga koneksi aman.

## Acceptance Criteria

- Middleware menyetel header; test keamanan lulus.
- Test scenarios: halaman utama, API; dev vs prod.
- Failure scenarios: inline script tanpa nonce → blok; frame embed tak diizinkan → ditolak oleh header.

## Risiko & Mitigasi

- Risiko: CSP terlalu ketat mematahkan UI → Mitigasi: audit script-src; gunakan nonce.
- Severity/Owner/Due:
  - High — UI breakage; Owner: Design Lead; Due: Sprint 1.
  - Medium — Policy gaps; Owner: Security Lead; Due: Sprint 2.

## Dampak Sistem

- UI/UX: kompatibilitas script.
- API: header pada responses.

## References

- `/apps/web/middleware.ts`
- `/apps/app/src/__tests__/lib/security.test.ts`
- `/home/inbox/smart-ai/sba-agentic/docs/README.md:33-38`

## QA & Review

- Stakeholder: Security Lead, Eng Lead.
- Instruksi approval: Approved setelah uji keamanan lulus di CI; tim security mencatat hasil.
- Proses Review: draft → review SL/EL → perbaikan → tanda tangan (≥2) → Approved.

## Diagram

- Sequence: middleware → header set → client render (placeholder)
- Diagram kebijakan CSP: directive `script-src` dengan nonce, `strict-dynamic` (placeholder)

## Timeline

- Sprint 1: Aktifkan CSP nonce dan header wajib.
- Sprint 2: Uji keamanan (XSS/Frame/Content-Type); perbaikan kompatibilitas.
- Gate: test keamanan lulus di CI.

## Testing Strategy

- Unit: util header; nonce injection.
- Integration: middleware header di halaman utama/API; verifikasi CSP/HSTS.
- Coverage target: uji keamanan lulus dan ≥80% di util/middleware.

## Persona

- Security Engineer: mengaudit CSP/headers; mereduksi risiko XSS/Clickjacking.
- Eng Lead: memastikan kompatibilitas UI dengan kebijakan CSP.

## UX Flow

- Middleware menyetel CSP nonce dan headers → render halaman → uji keamanan.

## Persyaratan Sistem/Lingkungan

- Produksi: HSTS aktif; CSP dengan nonce; Permissions-Policy ketat.
- Dev/staging: kebijakan disesuaikan untuk kompatibilitas uji.

## Features Out

- CSP report-only pipeline; kebijakan Trusted Types penuh.
