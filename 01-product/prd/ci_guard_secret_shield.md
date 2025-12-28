---
title: CI Guard Secret Shield
id: PRD-012
created_at: 2025-12-06
last_modified: 2025-12-06
author: team@sba
reviewer: lead@sba, security@sba
status: Draft
priority: P2
related:
  - ../../02-architecture/_index.md
---

## Problem Statement

- Perlu guard CI untuk memastikan tidak ada kunci rahasia di bundle klien.
- Data pendukung:
  - `/home/inbox/smart-ai/sba-agentic/README.md:113` `ci:guard` memastikan kebersihan rahasia.
  - `/home/inbox/smart-ai/sba-agentic/docs/README.md:69-76` go-live playbook mencakup guard sebelum rilis.

## Goals

- Pipeline `ci:guard` berjalan di PR; blokir bila ada kebocoran.

## Non-goals

- Tidak mencakup scanning repo historis.

## User Stories

- P2: Sebagai security engineer, saya ingin guard otomatis sehingga kebocoran dicegah.

## Acceptance Criteria

- Skrip guard mengaudit bundle; hasil hijau di staging/produksi.
- Failure scenarios: deteksi secret → pipeline PR diblokir; whitelist salah → revisi aturan guard.

## Risiko & Mitigasi

- Risiko: false positive → Mitigasi: whitelist aman.
- Severity/Owner/Due:
  - High — Secret in bundle; Owner: Security Lead; Due: Sprint 1.
  - Medium — Whitelist drift; Owner: Eng Lead; Due: Sprint 2.

## Dampak Sistem

- CI pipeline.

## References

- `/home/inbox/smart-ai/sba-agentic/README.md:113-114`
- `/home/inbox/smart-ai/sba-agentic/docs/README.md:69-76`

## QA & Review

- Stakeholder: Security Lead, Eng Lead.
- Instruksi approval: Approved setelah `ci:guard` terintegrasi dan semua build melewati pemeriksaan.
- Proses Review: draft → review SL/EL → perbaikan → tanda tangan (≥2) → Approved.

## Diagram

- Sequence: build → ci:guard scan → pass/fail (placeholder)
- Diagram flow CI: lint, test, build, guard gate, release (placeholder)

## Timeline

- Sprint 1: Integrasi `ci:guard` ke pipeline PR.
- Sprint 2: Whitelist aman untuk false positives; laporan kebocoran.
- Gate: rilis ditahan bila `ci:guard` gagal.

## Testing Strategy

- Unit: aturan guard dan whitelist.
- Integration: pipeline PR dengan `ci:guard`; blokir bila ada secret.

## Persona

- Security/Eng Lead: mengelola aturan guard dan whitelist.
- Dev: memperbaiki pelanggaran guard sebelum merge.

## UX Flow

- Build → guard scan → pass/fail → perbaikan → merge/release.

## Persyaratan Sistem/Lingkungan

- Integrasi guard di PR pipeline; whitelist aman dikelola versi.

## Features Out

- Scanning repo historis penuh; DLP terintegrasi di runtime.
