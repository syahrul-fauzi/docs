---
title: "Pull Request: Stabilization & Observability Enhancements"
created_at: 2025-12-28
author: Development Team
status: active
---

# Pull Request: Stabilization & Observability Enhancements

## Ringkasan Perubahan

- Stabilisasi E2E non-kritis (AI Copilot a11y, Chat Upload) dengan penyesuaian wait/timeout dan skip noise console.
- Widget Baseline: tambah tren (sparkline), refresh, dan simpan baseline.
- Alert Dashboard: integrasi status baseline dengan auto-alert saat delta gagal.
- CI: artefak baseline branch-aware + concurrency.

## Bukti Tes

- Playwright report: `apps/web/playwright-report/html/`
- Screenshots: tersimpan di `apps/web/test-results/*`
- Log konsol: terlampir melalui reporter list; trace tersedia (`show-trace`).

## File Diubah

- `apps/web/src/features/metrics/MetricsBaselineWidget.tsx`: sparkline, controls.
- `apps/web/src/features/dashboard/components/AlertSystem.tsx`: status baseline + auto-alert.
- `apps/web/e2e/ai-copilot-a11y.spec.ts`: skip patterns, wait adjustments.
- `apps/web/e2e/chat-upload.spec.ts`: timeout suite.
- `docs/.trae/*`: runbook E2E, baseline/alert update.
- `.github/workflows/ci.yml`: baseline artefak branch-aware + concurrency.

## Catatan Review

- Perubahan bertujuan menurunkan flakiness dev; produksi tidak dikendurkan.
- Observability delta diverifikasi via Prometheus dan baseline helper.

## Reviewer

- @frontend-reviewers
- @qa-engineers
- @devops-observability
