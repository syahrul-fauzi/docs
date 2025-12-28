---
title: Agentic Core Umbrella
id: PRD-000
created_at: 2025-12-06
last_modified: 2025-12-06
changelog:
  - 2025-12-06: initial draft (aligned to template)
author: team@sba
reviewer: lead@sba, pm@sba
status: Draft
priority: P0
related:
  - ../../02-architecture/_index.md
  - ../../03-agentic/flows/_index.md
  - ../../05-api/_index.md
---

## Problem Statement

- Platform agentic inti menggabungkan reasoning, interrupt/resume, generative UI, dan observability untuk otomasi bisnis.
- Data pendukung:
  - `/home/inbox/smart-ai/sba-agentic/README.md:15-21` definisi Agentic AI dan manfaat untuk SMB.
  - `/home/inbox/smart-ai/sba-agentic/README.md:22-28` protokol interaksi agen.
  - `/home/inbox/smart-ai/sba-agentic/README.md:76-80`, `132-134` target metrik.

## Goals

- Mengurangi waktu respon; meningkatkan otomatisasi proses layanan end-to-end.
- Observability lengkap; audit terstruktur untuk operasi agen.

## Non-goals

- Tidak mencakup integrasi pihak ketiga di luar cakupan awal.

## User Stories

- P0: Sebagai admin, saya ingin mengelola alur agen dengan persetujuan manusia sehingga governance terjaga.
- P1: Sebagai pengguna, saya ingin melihat UI generatif dan memberi feedback sehingga kualitas agen meningkat.

## Acceptance Criteria

- Alur dijalankan end-to-end dengan interrupt/resume tervalidasi.
- Metrik p95/p99 tersedia; error rate ≤ 0.5%; RBAC, CSP, rate-limit aktif.

## Risiko & Mitigasi

- Kompleksitas integrasi tinggi → mitigasi: modul terpisah; kontrak API jelas.

## Dampak Sistem

- UI/UX: komponen generatif, kontrol interrupt, dashboard observability.
- API: endpoints kontrol agen, metrics, analytics.
- Agent: runtime eksekusi dan telemetry.

## References

- `/home/inbox/smart-ai/sba-agentic/README.md:15-21`
- `/home/inbox/smart-ai/sba-agentic/README.md:22-28`
- `/home/inbox/smart-ai/sba-agentic/README.md:76-80`

## QA & Review

- Stakeholder: PM, Eng Lead; minimal 2 reviewer.
- Proses Review: draft → review PM/Eng → perbaikan → tanda tangan (≥2) → `status: Approved` → catat di `changelog`.

## Diagram

- BPMN alur interrupt/resume; ERD ringan; sequence generative UI (placeholder).

## Timeline

- Canary: 5% trafik, observasi 30m → ≥4 jam; target p95 ≤ 500ms, error ≤ 0.5%.
- Rollout bertahap: 25% → 50% → 100% jika stabil.
- Gates: `pnpm docs:validate`, `pnpm -r test`, build apps, security headers audit.
- CI Gates (opsional): tambahkan `docs:validate`/`docs:lint` sebagai prasyarat merge.

## Persona

- Admin (ops/eng) — mengkonfigurasi alur, memantau metrik, memberikan approval.
- Desainer UX — menganalisis heatmap/feedback untuk peningkatan UI.
- Pengguna akhir (SMB staff) — berinteraksi dengan UI generatif untuk tugas harian.
- Auditor/SRE — mengaudit akses (RBAC), memantau rate-limit dan observability.

## UX Flow (lintas fitur)

- Heatmap: user klik → tracker → API → admin overlay → keputusan desain.
- Interrupt/Resume: agen run → jeda → approval manusia → resume/cancel → audit.
- Generative UI: deskripsi UI → renderer → komponen atomik a11y → interaksi.
- Observability: route dibungkus metrics → registry → `/api/metrics` → dashboard.

## Persyaratan Sistem/Lingkungan

- Next.js App Router; runtime `nodejs` pada rute tertentu.
- Supabase klien via factories (SSR/Browser); tanpa hardcode URL/key.
- Upstash rate-limit; tenant header `x-tenant-id` wajib pada rute observability/analytics.
- CSP nonce aktif; security headers standar (HSTS, X-Frame-Options, dll).

## Features Out

- Session replay penuh; editor WYSIWYG generatif; kuota paket berbayar pada rate-limit.
