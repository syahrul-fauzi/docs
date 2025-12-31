---
title: SBA-Agentic Monitoring & Observability
created_at: 2025-12-28
author: Documentation Architect
status: active
priority: high
tags: [monitoring, observability, prometheus, grafana, metrics]
---

# SBA-Agentic Monitoring & Observability

Panduan setup, metrik, dan visualisasi untuk memantau kesehatan dan performa sistem SBA-Agentic secara real-time.

## 1. Arsitektur Monitoring

Sistem menggunakan stack **Prometheus & Grafana** untuk pengumpulan dan visualisasi metrik:

- **Web Metrics**: Diekspos via `/api/health/metrics` pada `apps/web`.
- **API Metrics**: Diekspos via port `9464` (`/metrics`) pada `apps/api`.
- **Worker Metrics**: Diekspos via `/metrics/workers` untuk memantau antrean BullMQ.
- **Scrape Interval**: Default 10 detik untuk granularitas tinggi.

## 2. Metrik Kunci (Key Metrics)

| Komponen | Metrik | Deskripsi |
|----------|--------|-----------|
| **Web** | `web_health_request_duration` | RPS, p95/p99 latency, dan avg response time. |
| **Worker** | `sba_worker_processing_duration` | Durasi pemrosesan tugas per antrean (p95/p99). |
| **Database** | `prisma_client_queries_total` | Jumlah query, durasi rata-rata, dan error rate DB. |
| **Agent** | `agent_reasoning_confidence` | Skor keyakinan agen pada setiap langkah keputusan. |

## 3. Setup Lokal (Docker Compose)

Jalankan stack monitoring di lingkungan pengembangan:

1. Pastikan aplikasi berjalan di `localhost:3000`.
2. Jalankan docker compose:

   ```bash
   docker compose -f ops/monitoring/docker-compose.yml up -d
   ```

3. Akses Dashboard:
   - **Prometheus**: `http://localhost:9090`
   - **Grafana**: `http://localhost:3003` (user/pass: `admin/admin`)

## 4. Dashboard Grafana

Dashboard utama mencakup:

- **System Health**: Status UP/DOWN layanan inti.
- **Request Performance**: Grafik RPS dan Latency (p95/p99).
- **Queue Status**: Jumlah pesan di antrean (Active, Waiting, Failed).
- **Error Analytics**: Breakdown error HTTP 4xx dan 5xx.

## 5. Validasi Metrik

Gunakan `curl` untuk memverifikasi eksposur metrik:

- Web: `curl http://localhost:3000/api/health/metrics`
- API: `curl http://localhost:9464/metrics`
- Worker: `curl -H "Authorization: Bearer <token>" http://localhost:<port>/metrics/workers`
