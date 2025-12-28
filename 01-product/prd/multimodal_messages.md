---
title: Multimodal Messages
id: PRD-008
created_at: 2025-12-06
last_modified: 2025-12-06
author: team@sba
reviewer: lead@sba, design@sba
status: Draft
priority: P1
related:
  - ../../03-agentic/flows/_index.md
---

## Problem Statement

- Dukungan input teks, gambar, audio, file perlu tanpa memecah kompatibilitas.
- Data pendukung:
  - `/home/inbox/smart-ai/sba-agentic/README.md:24-25`, `32` multimodal messages.
  - `apps/web/src/app/demo/multimodal-integration/page.tsx` dan `apps/web/src/app/test/multimodal-chat/page.tsx` contoh integrasi.

## Goals

- Mendukung upload/stream lintas modal dengan validasi.

## Non-goals

- Tidak mencakup pengenalan suara lanjutan.

## User Stories

- P1: Sebagai pengguna, saya ingin mengirim gambar/audio/file sehingga agen memahami konteks.

## Acceptance Criteria

- Kompatibel dengan aplikasi yang ada; validasi ukuran/format.
- Failure scenarios: file melebihi batas → 413; format tak didukung → 415; TTL habis → 410.

## Risiko & Mitigasi

- Risiko: beban storage besar → Mitigasi: batas ukuran, TTL.
- Severity/Owner/Due:
  - Medium — Storage growth; Owner: SRE; Due: Sprint 2.
  - Low — Format mismatch; Owner: Eng Lead; Due: Sprint 1.

## Dampak Sistem

- UI/UX: komponen input multimodal.
- API: endpoints upload.

## References

- `/apps/web/src/app/demo/multimodal-integration/page.tsx`
- `/apps/web/src/app/test/multimodal-chat/page.tsx`
- `/home/inbox/smart-ai/sba-agentic/README.md:24-25`

## QA & Review

- Stakeholder: Design Lead, Eng Lead.
- Instruksi approval: Approved setelah validasi format/ukuran dan kompatibilitas UI; reviewer menandatangani.
- Proses Review: draft → review DL/EL → perbaikan → tanda tangan (≥2) → Approved.

## Diagram

- Sequence: input multimodal → validasi → pengiriman ke agen (placeholder)
- ERD: attachments (type, size, url, ttl), linkage to runs/messages (placeholder)

## Timeline

- Sprint 1: Integrasi upload/stream lintas modal + validasi format.
- Sprint 2: Kompatibilitas aplikasi dan UX polish.
- Gate: validasi ukuran/format; kompatibel dengan aplikasi yang ada.

## Testing Strategy

- Unit: validasi format/ukuran; TTL kontrol.
- Integration: upload/stream API; kompatibilitas UI.
- Coverage target: ≥80% modul upload/validasi.

## Persona

- Pengguna: mengirim teks/gambar/audio/file; agen memahami konteks.
- Design/Eng: memastikan UX input dan validasi format/ukuran.

## UX Flow

- Input → validasi → upload/stream → agen consume → respon.

## Persyaratan Sistem/Lingkungan

- Batas ukuran/format; TTL untuk attachments; rute upload aman.

## Features Out

- Pengenalan suara lanjutan; OCR terpadu; analitik konten.
