---
title: Self-Correction & Autonomous Recovery
id: PRD-015
created_at: 2025-12-28
last_modified: 2025-12-28
author: Super Agent
reviewer: team@sba
status: Draft
priority: P1
tags: [agentic, recovery, self-correction, observability]
---

# PRD-015: Self-Correction & Autonomous Recovery

## Problem Statement

Dalam sistem agentic yang kompleks, kegagalan eksekusi rule (misalnya karena API timeout, error parsing, atau kegagalan tool) sering kali menghentikan alur kerja secara mendadak. Hal ini mengakibatkan:
1. **Operational Friction**: Admin harus mengintervensi secara manual untuk memperbaiki kegagalan kecil.
2. **Poor UX**: Pengguna melihat error tanpa ada upaya pemulihan otomatis.
3. **Data Inconsistency**: Alur kerja yang berhenti di tengah jalan dapat meninggalkan status sistem yang tidak konsisten.

## Goals

1. **Autonomous Recovery**: Memungkinkan sistem untuk mencoba memperbaiki kegagalan secara mandiri menggunakan `AgenticReasoningEngine`.
2. **Observability**: Mencatat setiap upaya koreksi diri sebagai meta-event khusus agar dapat dipantau di dashboard.
3. **Graceful Degradation**: Jika koreksi gagal, sistem harus tetap mencatat alasan kegagalan dan memberikan informasi yang jelas kepada Observer/Admin.

## User Stories

- **P0**: Sebagai Admin, saya ingin sistem mencoba memperbaiki kegagalan rule secara otomatis agar saya tidak perlu mengintervensi untuk masalah sepele.
- **P1**: Sebagai Developer, saya ingin melihat riwayat "Self-Correction" di dashboard Meta-Events agar saya bisa menganalisis efektivitas engine penalaran.
- **P2**: Sebagai Security Officer, saya ingin memastikan semua log self-correction tetap mematuhi aturan PII masking.

## Acceptance Criteria

1. `RubeService` mendeteksi kegagalan rule dan memicu callback `handleFailure`.
2. `AgenticReasoningEngine` memberikan rekomendasi langkah perbaikan (corrective actions).
3. Langkah perbaikan dieksekusi melalui `EnhancedToolRegistry` dengan konteks `system-corrector`.
4. Event `self_correction` tercatat di database meta-events dengan metadata lengkap (original rule, error, decision).
5. UI Meta-Events menampilkan event self-correction dengan skema warna yang membedakan dari event biasa (Amber/Yellow).

## System Impact

- **API/Rube**: Penambahan logic `handleFailure` di `RuleManager` dan integrasi dengan `ReasoningEngine`.
- **Observability**: Tipe event baru `self_correction` dan metadata pendukung.
- **UI**: Update pada `MetaEventsUI.tsx` untuk visualisasi status koreksi.

## References

- [ADR-015: Autonomous Self-Correction & Recovery](file:///home/inbox/smart-ai/sba-agentic/docs/02-architecture/adr/ADR-015-autonomous-self-correction-recovery.md)
- [ObserverService](file:///home/inbox/smart-ai/sba-agentic/apps/api/src/rube/observer.service.ts)
- [MetaEventsUI.tsx](file:///home/inbox/smart-ai/sba-agentic/apps/web/src/features/agentic/meta-events/MetaEventsUI.tsx)
