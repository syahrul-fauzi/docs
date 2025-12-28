---
id: post_launch.changelog
version: 1.0.0
author: Development Team
status: active
scope: global
tags: [changelog, updates, history]
---

# Changelog — SBA-Agentic

## [2025-12-09] — Type-Check Tightening

- **Strict Profiles:** Menambahkan profil ketat untuk utils, shared, services (`noImplicitAny: true`, `strict: true`).
- **CI Hardening:** Gate type-check global, unggah artefak ringkasan, dan notifikasi PR.
- **Reporting Tools:** Implementasi `tools/typecheck/report.js` untuk menghasilkan ringkasan JSON.
- **Results:** Total errors 0, durasi ~10s.

## [2025-12-13] — API Controllers DTO Cleanup

- apps/api/src/api/runs.controller.ts: Replaced `any` with typed DTOs using `StartRunInput`, `ContinueRunInput`, `CancelRunInput`, and `AgentRun`. Adjusted return types and sorting logic; added body/object guards and queue payload typing.
- apps/api/src/api/sessions.controller.ts: Replaced `any` with explicit session DTO shapes; fixed date comparison using `new Date(session.expiresAt)`; added safe body parsing.
- apps/api/src/api/controllers/ToolsApiController.ts: Typed request bodies and adapter metadata; removed `any` usage in controller.
- apps/api/src/api/services/ToolsService.ts: Narrowed adapter and tool list typing; typed tool execution input normalization.
- apps/api/test/controllers-types.test.ts: Added unit tests validating DTO schemas for runs and sessions.

**Impact:**
- Reduces `@typescript-eslint/no-explicit-any` warnings in controllers; improves validation and autocompletion.
- Maintains backward compatibility by parsing unknown bodies safely and preserving response shapes expected by tests.
- No breaking API changes; responses remain structurally identical.

## [2025-12-08] — Observability & Test Hardening

- **Observability:** Memastikan `x-tenant-id` selalu tersetel pada setiap request yang dibungkus metrik via `ensureTenantHeader`.
- **Test Stability:** Alias test untuk utilitas UI (`cn`, `icons`) dan mock `next/headers` agar unit test tidak gagal pada import lingkungan Next.
- **UI Improvements:** `LoadingSpinner` kini mengimpor `cn` dan `Icons` dari `@sba/ui` untuk keseragaman.
- **Metrics Registry:** Menambahkan JSDoc pada API registry (histogram, counter, quantiles, business counters).
- **Branch:** `feat/observability-business-metrics-and-test-hardening`.

## [2025-12-01] — Stabilization & Agentic Ops

- **SSE Endpoints:** Corrected with `text/event-stream` headers and security directives.
- **AGUIEventStream:** Focus and keyboard handling stabilized via `preventDefault`, `stopPropagation`, and `flushSync`.
- **Vitest Configs:** Aligned across apps: jsdom, coverage thresholds, alias arrays with regex for Next internals.
- **Agentic Orchestrator:** Implemented with fail-safe, self-healing, auto-stop, auto-adjust concurrency, and audit logs.
- **UI A11y:** Dialog Close button labeled and accessible landmarks across dashboard/sidebar.

## [2025-11-30] — SSE & Marketing App Stabilization

- **SSE apps/app:** Pakai `Response(stream, { headers })` dengan header hardening (`nosniff`, `DENY`, dll).
- **AGUIEventStream keyboard/a11y:** `preventDefault` dan `stopPropagation` untuk ArrowUp/ArrowDown.
- **apps/marketing:** `vitest.setup.ts` mock `next/server`, `next/config`, `next/dynamic`.
- **packages/ui:** `setupTests.ts` menambahkan shim global `jest` yang memetakan ke `vi`.

---

## 2025-12-08 — Older Entries (Legacy Format)

### Added
- Web: `apps/web/src/shared/api/adapters/conversation.ts` kini mengisi `messages` dari `turns` untuk konsistensi kronologi.
- Docs: `docs/api/web/adapters/conversation.md` mendokumentasikan bentuk persistensi ↔ domain dan catatan implementasi.
- Ops: `docs/ops/progress/daily.md` untuk pelacakan progres harian.
- QA: `apps/app/docs/QA_DAILY_CHECKLIST.md` untuk pemeriksaan harian.
- Testing: `docs/testing/artifacts.md` kebijakan artefak pengujian.

### Changed
- `.gitignore`: menyimpan laporan HTML Playwright dan test-results aplikasi.
- `apps/app/docs/FINAL_REPORT.md`: menambahkan pranala aset E2E tambahan.

### Notes
- Integrasi penuh ke `MessageRepository` untuk memuat `messages` dari storage direncanakan.
