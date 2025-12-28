---
title: Analytics Heatmap
id: PRD-001
created_at: 2025-12-06
last_modified: 2025-12-06
author: team@sba
reviewer: lead@sba, qa@sba
status: Draft
priority: P1
related:
  - ../../02-architecture/_index.md
  - ../../03-agentic/flows/_index.md
  - ../../05-api/_index.md
---

## Problem Statement

- Pengumpulan dan visualisasi klik pengguna diperlukan untuk meningkatkan UX dan memvalidasi desain interaksi.
- Data pendukung:
  - `/home/inbox/smart-ai/sba-agentic/README.md:11` komponen `HeatmapTracker` mengirim `POST /api/analytics/heatmap`.
  - `/home/inbox/smart-ai/sba-agentic/docs/README.md:41-44` observability rute analytics tersedia untuk metrik.
  - `packages/ui/src/ui/analytics/HeatmapTracker.stories.tsx` menunjukkan konfigurasi endpoint dan parameter overlay.
- Impact analysis:
  - Tanpa heatmap, keputusan UX kurang berbasis data; risiko iterasi desain tidak efektif dan peningkatan konversi terhambat.

## Goals

- p95 latensi `POST /api/analytics/heatmap` ≤ 500ms; error rate ≤ 0.5%.
- Admin dapat melihat overlay heatmap per halaman dan window waktu.
- Data klik terstruktur (x,y, viewport, path, tenant) tersimpan dengan benar.

## Non-goals

- Tidak mencakup analitik scroll depth atau session replay.
- Tidak mencakup atribusi kampanye marketing.

## User Stories

- P0: Sebagai admin, saya ingin melihat heatmap klik per halaman sehingga saya dapat mengidentifikasi area interaksi utama.
  - Kriteria: filter path, windowMs, intensitas.
- P1: Sebagai desainer, saya ingin meng-export heatmap sebagai gambar sehingga dapat dibagikan dalam review.
- P2: Sebagai analis, saya ingin menggabungkan data heatmap dengan konversi sehingga analisis dampak dapat dilakukan.

## Acceptance Criteria

- `HeatmapTracker` mengirim event klik dengan payload lengkap; server menyimpan dan mengembalikan 201.
- UI admin memuat data via `GET /api/analytics/heatmap` dengan filter; overlay tampil akurat.
- Test scenarios: klik di berbagai viewport; halaman berbeda; tenant berbeda.
- Success metrics: p95 ≤ 500ms; error rate ≤ 0.5%; ≥95% titik valid.
- Failure scenarios: payload tidak valid ditolak 400; tenant tanpa izin 403; rate-limit 429 saat spam.

## Risiko & Mitigasi

- Risiko: Beban tulis tinggi → Mitigasi: batch/queue ringan, rate-limit client.
- Risiko: Privasi pengguna → Mitigasi: tanpa data PII; hanya koordinat dan path.
- Contingency: Matikan overlay bila latensi naik; sampling event.
- Severity/Owner/Due:
  - High — Performance write hot-path; Owner: Eng Lead; Due: Sprint 1.
  - Medium — Privacy compliance; Owner: Security Lead; Due: Sprint 2.

## Dampak Sistem

- UI/UX: `HeatmapTracker` komponen; halaman admin heatmap.
- API: `POST/GET /api/analytics/heatmap` endpoints dan skema payload.
- Agent: tidak berdampak langsung; telemetry masuk metrik.
- Dependencies: Supabase tabel analytics; RBAC admin; tenant header.

## References

- `/packages/ui/src/ui/analytics/HeatmapTracker.tsx`
- `/apps/app/src/app/api/analytics/heatmap/route.ts`
- `/apps/app/src/app/(authenticated)/admin/ux-heatmap/page.tsx`
- `/home/inbox/smart-ai/sba-agentic/README.md:11`

## QA & Review

- Stakeholder: Product Lead, Eng Lead.
- Review minimal 2 orang; catat persetujuan di `changelog`.
- Instruksi approval: ubah `status: Approved` setelah dua tanda tangan; tambah entri `changelog` dengan waktu dan nama reviewer.
- Proses Review: draft → review PL/EL → perbaikan → tanda tangan (≥2) → Approved.

## Diagram

- Sequence: `HeatmapTracker → /api/analytics/heatmap` (placeholder)
- BPMN: proses pengumpulan klik dan visualisasi (placeholder)
- ERD: tabel analytics (events, tenant, page, coords) (placeholder)

## Timeline

- Sprint 1: Integrasi client → endpoint; p95 `POST` ≤ 500ms; error ≤ 0.5%.
- Sprint 2: Halaman admin overlay + filter; export gambar.
- Canary: 5% aktif; sampling bila latensi meningkat.

## Testing Strategy

- Unit: validasi payload client; transformasi koordinat; pengiriman fetch.
- Integration: `POST/GET /api/analytics/heatmap` dengan filter path/windowMs/tenant.
- E2E: overlay admin tampil akurat; export gambar.
- Coverage target: ≥80% di komponen dan endpoint terkait.

## Persona

- Desainer UX: menganalisis pola klik untuk keputusan desain.
- Admin: mengakses overlay heatmap dan melakukan filter.

## UX Flow

- Klik pengguna → `HeatmapTracker` → `POST /api/analytics/heatmap` → penyimpanan → `GET` untuk overlay admin.

## Persyaratan Sistem/Lingkungan

- Browser modern (desktop/mobile) dengan dukungan event pointer; Next.js client.
- Header `x-tenant-id` untuk rute analytics (multi-tenant).

## Features Out

- Session replay penuh; analitik scroll-depth; atribusi kampanye marketing.
