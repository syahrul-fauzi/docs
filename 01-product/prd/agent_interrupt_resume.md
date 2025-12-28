---
title: Agent Interrupt & Resume
id: PRD-006
created_at: 2025-12-06
last_modified: 2025-12-06
author: team@sba
reviewer: lead@sba, pm@sba
status: Draft
priority: P1
related:
  - ../../03-agentic/flows/_index.md
  - ../../05-api/_index.md
---

## Problem Statement

- Agen perlu mekanisme jeda untuk persetujuan manusia dan melanjutkan eksekusi.
- Data pendukung:
  - `/home/inbox/smart-ai/sba-agentic/README.md:49-68` contoh payload interrupt/resume.
  - `apps/app/src/components/chat/interrupt-controls.tsx` kontrol UI untuk pause/resume.
  - `apps/app/src/runtime/AgenticRuntime.ts` menangani lifecycle jeda/lanjut.
- Impact analysis: Tanpa jeda, risiko tindakan agen tidak sesuai kebijakan.

## Goals

- ≥95% resume berhasil dengan payload valid; waktu jeda rata-rata ≤ 2 menit.
- Audit dan metrik run tercatat.

## Non-goals

- Tidak mencakup sistem notarization keputusan.

## User Stories

- P0: Sebagai admin, saya ingin bisa pause run sehingga review dapat dilakukan.
- P1: Sebagai user, saya ingin memberi approval untuk tindakan agen sehingga proses berlanjut.

## Acceptance Criteria

- Status run berubah `pause|resume|cancel` via API.
- Test scenarios: approval true/false; timeout.
- Failure scenarios: payload tidak valid → 400; resume tanpa interrupt → 409; cancel idempotent.

## Risiko & Mitigasi

- Risiko: approval tidak konsisten → Mitigasi: validasi payload, idempotency.
- Severity/Owner/Due:
  - High — Eksekusi tanpa approval; Owner: PM; Due: Sprint 1.
  - Medium — Race conditions; Owner: Eng Lead; Due: Sprint 2.

## Dampak Sistem

- UI/UX: kontrol interrupt.
- API: `PUT /runs/:runId` aksi kontrol.
- Agent: runtime menangani jeda/lanjut.

## References

- `/apps/app/src/components/chat/interrupt-controls.tsx`
- `/API_REFERENCE.md`
- `/apps/app/src/runtime/AgenticRuntime.ts`
- `/home/inbox/smart-ai/sba-agentic/README.md:49-68`

## QA & Review

- Stakeholder: PM, Eng Lead.
- Instruksi approval: Approved setelah simulasi pause/resume/cancel lulus; audit run tersedia.
- Proses Review: draft → review PM/EL → perbaikan → tanda tangan (≥2) → Approved.

## Diagram

- BPMN: alur interrupt/resume agen (placeholder)
- Sequence: runtime → approval API → resume payload handling (placeholder)

## Timeline

- Sprint 1: API kontrol run (pause/resume/cancel) dan UI controls.
- Sprint 2: Audit & telemetry; idempotency dan timeout handling.
- Gate: ≥95% resume sukses; jeda rata-rata ≤ 2 menit.

## Testing Strategy

- Unit: validasi payload interrupt/resume; idempotency.
- Integration: API kontrol run; audit run tercatat.
- E2E: simulasi pause/resume/cancel di UI.

## Persona

- Admin/PM: memberikan approval; mengaudit keputusan.
- Pengguna: memberi persetujuan/penolakan tindakan agen.

## UX Flow

- Run → interrupt (human_approval) → payload approval → resume/cancel → audit & metrics.

## Persyaratan Sistem/Lingkungan

- API kontrol `PUT /runs/:runId` dengan aksi `pause|resume|cancel`.
- Audit tersimpan; idempotency untuk cancel/resume.

## Features Out

- Notarization keputusan manusia; workflow approval multi-level.
