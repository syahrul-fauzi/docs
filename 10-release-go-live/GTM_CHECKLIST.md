---
title: "Go-To-Market Checklist – SBA Agentic"
created_at: 2025-12-28
author: SBA-Agent
status: draft
---

# Go-To-Market Checklist – SBA Agentic

## Produk & Fitur

- Roadmap fitur inti selesai dan berfungsi end-to-end
- RBAC aktif pada rute sensitif (`run:read`, `run:create`, `run:update`)
- SSE stabil (headers, retry, parsing robust)

## Kualitas & Pengujian

- Unit/integrasi untuk runtime API dan SSE/RBAC
- Aksesibilitas: kontrol dan log dengan atribut aria
- E2E alur start→list→detail→cancel

## Performa & Keandalan

- Backpressure SSE (throttle), buffer log dibatasi
- Supervisor: resume mandek, timeout fail, ambang biaya/tokens

## Observability & Alerting

- Prometheus metrics berlabel (status, workspace, agent)
- Dashboard Grafana (`ops/grafana/sba-dashboard.json`)
- Sentry breadcrumbs & capture pada anomali
- Webhook alert `ALERTS_WEBHOOK_URL`

## Analytics & Pelaporan

- Supabase tabel `agent_runs` dan agregasi mingguan `agent_run_weekly`
- Loop analitik 24 jam (instrumentation) untuk insight berkala

## Dokumentasi

- Observability Runbook (`OBSERVABILITY_RUNBOOK.md`)
- API Reference (`API_REFERENCE.md`)
- Quickstart dan Admin Guide (disarankan sebagai tindak lanjut)

## Keamanan & Kepatuhan

- Validasi input, sanitasi, rate limiting
- Konfigurasi rahasia via env; tanpa hardcode kredensial

## Rilis & Operasional

- Workflow CI (`.github/workflows/ci.yml`) lint/test/build
- Changelog dan catatan rilis
- SOP insiden, kanal dukungan, eskalasi
