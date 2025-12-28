---
title: "Observability & Runbook Agentic"
created_at: 2025-12-28
author: SBA-Agent
status: draft
---

# Observability & Runbook Agentic

## Environment & Thresholds

- `MAX_AGENT_RUN_COST_USD`: batas biaya per run (default 100)
- `MAX_AGENT_RUN_TOKENS`: batas token per run (default 5_000_000)
- `ALERTS_WEBHOOK_URL`: URL webhook untuk alert timeout/stalled
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`: koneksi Supabase

## Telemetry & Data Plane

- Tabel Supabase:
  - `marketing_telemetry(page,type,label,href,ts)`
  - `marketing_heatmap(page,x,y,ts)`
  - `agent_runs(run_id,status,agent_id,workspace_id,start_ts,end_ts,duration_ms,cost,tokens)`
- Retensi: Edge Function `retention` menghapus data > 90 hari

## Alerting

- Supervisor mengirim alert untuk `timeout` dan `stalled_resume` ke `ALERTS_WEBHOOK_URL`
- `POST /api/alerts` untuk forward manual/pengujian

## Prometheus & Grafana

- Endpoint scrape: `GET /api/metrics`
  - `sba_runs_total`, `sba_runs_status_total{status=...}`, `sba_runs_status_labeled_total{status,workspace_id,agent_id}`, `sba_runs_cost_total`
- Panel dasar: total runs, breakdown status, tren biaya/tokens (via Supabase untuk detail)
- Import dashboard JSON: `sba-agentic/ops/grafana/sba-dashboard.json` (datasource UID `prom`)

## Sentry

- Breadcrumb pada supervisor init
- Supervisor mencatat `stalled_resume`, `timeout_fail`, `cost_threshold_exceeded`, `token_threshold_exceeded`
- Rekomendasi: tag `tenant_id`, `workspace_id`, sampling performa halaman berat

## Health

- `GET /api/health`: ringkasan status runtime (total, running, paused, failed, completed)
- Marketing ops health (tersedia di apps/marketing ops routes)

## Operasional

- Start/Stop run via UI Run Controls; SSE memastikan feed live
- Jika terjadi timeout/stalled:
  - Supervisor otomatis resume/fail + kirim alert
  - Cek webhook dan metrik di Prometheus/Grafana
- Validasi data Supabase melalui tabel di dashboard Supabase

## Keamanan

- RBAC di endpoint history dan SSE routes
- Rate limit dasar di `POST /api/runs`
- Validasi input dan sanitasi string di semua endpoint
