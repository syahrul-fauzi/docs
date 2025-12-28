---
title: "Alerting — SBA Agentic"
created_at: 2025-12-28
author: SBA-Agent
status: draft
---

# Alerting — SBA Agentic

## Tingkatan & Threshold

- Warning: `error_rate_per_sec > 0.05` atau `pending > 50`
- Minor: `error_rate_per_sec > 0.1` atau `pending > 100`
- Major: `p95_run_seconds > 2.0` atau `memMb > memory_limit_mb * 0.9`
- Critical: `failsafe_active` atau `daemon.paused == true` > 2 menit

## Notifikasi

- Channel: email, chat webhook (`ALERTS_WEBHOOK_URL`), pager untuk Critical
- Dedup: suppress window 10 menit untuk event serupa

## Aturan Grafana (Prometheus)

- Query: `sba_daemon_p95_run_seconds > 2` selama 5m → Major
- Query: `sba_daemon_pending > 100` selama 10m → Minor
- Query: `sba_daemon_mem_mb > on() (memory_limit_mb)` selama 5m → Major
- Query: `sba_runs_status_total{status="failed"} > 10` selama 10m → Minor

## Aturan Datadog

- Metrics: `sba.daemon.p95_run_seconds`, `sba.daemon.pending`, `sba.daemon.mem_mb`
- Alert: `avg(last_5m):sba.daemon.p95_run_seconds > 2` → Major
- Alert: `sum(last_10m):sba.daemon.pending > 100` → Minor

## Eskalasi & Runbook

- Warning: monitor, catat di audit
- Minor: cek backlog/index; naikkan concurrency; validasi latensi DB
- Major: aktifkan circuit breaker per modul; review resource; kurangi beban; evaluasi anomali
- Critical: trigger failsafe; pause daemon; jalankan pemulihan; laporkan insiden

## Verifikasi

- Simulasi beban: gunakan `apps/api/scripts/loadtest.ts` sampai 1000 rps
- Pastikan alert terpicu sesuai threshold dan notifikasi terkirim
