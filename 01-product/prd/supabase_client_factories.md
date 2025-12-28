---
title: Supabase Client Factories
id: PRD-011
created_at: 2025-12-06
last_modified: 2025-12-06
author: team@sba
reviewer: lead@sba, backend@sba
status: Draft
priority: P2
related:
  - ../../02-architecture/_index.md
---

## Problem Statement

- Penggunaan klien Supabase harus melalui factories SSR/Browser tanpa hardcode URL/key di klien.
- Data pendukung:
  - `/home/inbox/smart-ai/sba-agentic/docs/README.md:31-32` gunakan factories internal; jangan hardcode.
  - `packages/supabase/clients/client.ts` (browser) dan `packages/supabase/clients/server.ts` (SSR) sebagai titik impor.

## Goals

- Konsistensi impor dan konfigurasi Supabase di seluruh aplikasi.

## Non-goals

- Tidak mencakup migrasi database.

## User Stories

- P2: Sebagai developer, saya ingin factory klien tersedia sehingga integrasi mudah dan aman.

## Acceptance Criteria

- Import standar dari `@sba/supabase` digunakan; `ci:guard` hijau.
- Failure scenarios: hardcode URL/key terdeteksi → build gagal oleh guard; impor non-standar → lint pelanggaran.

## Risiko & Mitigasi

- Risiko: kebocoran kunci → Mitigasi: lint/guard.
- Severity/Owner/Due:
  - High — Secret leakage; Owner: Security Lead; Due: Sprint 1.
  - Medium — Import inconsistency; Owner: Eng Lead; Due: Sprint 2.

## Dampak Sistem

- API/SSR: factories; klien browser.

## References

- `/packages/supabase/`
- `/home/inbox/smart-ai/sba-agentic/docs/README.md:31-32`

## QA & Review

- Stakeholder: Backend Lead, Eng Lead.
- Instruksi approval: Approved setelah audit impor dan `ci:guard` hijau di PR.
- Proses Review: draft → review BL/EL → perbaikan → tanda tangan (≥2) → Approved.

## Diagram

- Sequence: SSR factory → server route; browser factory → client component (placeholder)
- ERD: configs/env usage, factory consumers (apps/packages) (placeholder)

## Timeline

- Sprint 1: Konsolidasi impor ke factories SSR/Browser.
- Sprint 2: Audit `ci:guard` dan lint bundling; hapus hardcode.
- Gate: `ci:guard` hijau; impor konsisten di apps/packages.

## Testing Strategy

- Unit: impor factories SSR/Browser; util konfigurasi.
- Integration: penggunaan di apps/packages; `ci:guard` audit bundling.

## Persona

- Backend/Frontend Dev: menggunakan factory SSR/Browser tanpa hardcode.
- Security Lead: mengaudit kebersihan rahasia di bundling.

## UX Flow

- Import factory → inisialisasi klien → pemanggilan API/SSR → guard audit.

## Persyaratan Sistem/Lingkungan

- Impor standar dari `@sba/supabase`; `ci:guard` aktif di PR; env variabel konsisten.

## Features Out

- Migrasi database; generator skema otomatis; management secrets di klien.
