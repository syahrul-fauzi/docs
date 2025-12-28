---
title: Meta Events Feedback
id: PRD-009
created_at: 2025-12-06
last_modified: 2025-12-06
author: team@sba
reviewer: lead@sba, pm@sba
status: Draft
priority: P1
related:
  - ../../03-agentic/flows/_index.md
---

## Problem Statement

- Diperlukan sinyal/annotasi di luar run (feedback, reaksi) untuk pelacakan kualitas agen secara berkelanjutan.
- Saat ini tidak ada cara sistematis untuk mengumpulkan feedback pengguna terhadap hasil kerja agen, sehingga sulit mengukur efektivitas dan melakukan perbaikan berbasis data.
- Data pendukung:
  - `/home/inbox/smart-ai/sba-agentic/README.md:35`, `161-162` meta events.
  - `packages/agentic-meta-events/src/index.ts` library meta-events.
  - `apps/web/src/features/agentic/meta-events/` UI dashboard sistem meta event.
  - Analisis kebutuhan: pengguna perlu memberikan feedback cepat (thumbs up/down) tanpa mengganggu alur kerja.

## Goals

- Tersedia API dan UI dashboard meta events; audit lengkap.
- **Specific**: Implementasi sistem meta events dengan feedback thumbs up/down dan komentar opsional.
- **Measurable**: Minimal 80% pengguna memberikan feedback setelah interaksi dengan agen.
- **Achievable**: Integrasi dengan sistem autentikasi existing dan UI component yang reusable.
- **Relevant**: Mendukung pengukuran kualitas agen dan continuous improvement.
- **Time-bound**: Selesai dalam Sprint 2 dengan dashboard agregasi.

## Non-goals

- Tidak mencakup sentiment analysis lanjutan.

## User Stories

- P1: Sebagai pengguna, saya ingin memberi thumbs up/down sehingga kualitas agen dapat diukur.
- P1: Sebagai pengguna, saya ingin memberikan komentar opsional untuk menjelaskan feedback saya.
- P2: Sebagai admin, saya ingin melihat dashboard agregasi feedback untuk mengidentifikasi area perbaikan.
- P2: Sebagai PM, saya ingin mengekspor data feedback untuk analisis lebih lanjut.

## Acceptance Criteria

- Event tercatat dengan tenant/user/time; metrik agregat tersedia.
- **API Requirements**:
  - POST /api/meta-events dengan payload: `{ type: 'feedback', runId: string, sentiment: 'positive' | 'negative', comment?: string }`
  - Response: 201 Created dengan event ID atau error code yang sesuai
- **UI Requirements**:
  - Thumbs up/down button tersedia di setiap hasil agen
  - Form komentar opsional muncul setelah feedback diberikan
  - Indikasi visual bahwa feedback telah tercatat
- **Failure scenarios**:
  - reaksi tanpa sesi → 401 Unauthorized
  - rate-limit → 429 Too Many Requests (max 10 feedback per jam per user)
  - payload tidak valid → 400 Bad Request
  - runId tidak ditemukan → 404 Not Found
- **Security**: Feedback hanya bisa diberikan oleh authenticated user dengan sesi aktif

## Risiko & Mitigasi

- Risiko: manipulasi feedback → Mitigasi: rate-limit dan verifikasi sesi.
- Severity/Owner/Due:
  - Medium — Manipulasi skala kecil; Owner: PM; Due: Sprint 2.
  - Low — Abuse isolated; Owner: SRE; Due: Sprint 2.

## Dampak Sistem

- UI/UX: kontrol reaksi; dashboard.
- API: endpoints meta events.

## References

- `/packages/agentic-meta-events/src/index.ts`
- `/apps/web/src/features/agentic/meta-events/`
- `/home/inbox/smart-ai/sba-agentic/README.md:35`

## QA & Review

- Stakeholder: PM, Eng Lead.
- Instruksi approval: Approved setelah rate-limit dan audit event berjalan; masukkan agregasi metrik ke laporan.
- Proses Review: draft → review PM/EL → perbaikan → tanda tangan (≥2) → Approved.

## Diagram

- Sequence: UI reaksi → API meta events → agregasi metrik (lihat: `workspace/02_Architecture/diagrams/meta-events-sequence.mmd`)
- Component: Bounded contexts untuk meta events system (lihat: `workspace/02_Architecture/diagrams/meta-events-component.mmd`)
- ERD: meta_events (type, user, tenant, timestamp), meta_event_aggregates dengan relasi ke users, agent_runs, tenants (lihat: `workspace/02_Architecture/diagrams/meta-events-erd.mmd`)

## Timeline

- Sprint 1: Implementasi API meta events dan kontrol reaksi UI.
- Sprint 2: Dashboard agregasi dan audit.
- Gate: rate-limit feedback; sesi terverifikasi.

## Testing Strategy

- Unit: event builder; rate-limit logic.
- Integration: API meta events; agregasi metrik.
- Coverage target: ≥80% untuk event pipeline.

## Persona

- Pengguna: memberi thumbs up/down; komentar singkat.
- PM/Eng: menganalisis agregasi dan dampak kualitas.

## UX Flow

- UI reaksi → API meta events → agregasi metrik → dashboard.

## Persyaratan Sistem/Lingkungan

- Sesi wajib untuk event; rate-limit feedback; audit event.

## Features Out

- Sentiment analysis lanjutan; moderasi otomatis berbasis ML.
