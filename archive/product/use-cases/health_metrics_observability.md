---
title: Use Case — Health & Metrics Observability
version: 1.0.0
created_at: 2025-12-10
last_modified: 2025-12-10
status: Draft
tags: [observability, health, metrics]
---

# Deskripsi

- Sistem menyediakan endpoint `GET /api/health` dan `GET /api/health/metrics` untuk readiness/liveness dan scraping metrik Prometheus.

# Aktor

- Monitoring (Prometheus/Grafana)
- Web App (Next.js)

# Prasyarat

- Histogram durasi health tersedia; content type teks v0.0.4 untuk Prometheus.

# Alur Normal

1. Monitoring memanggil `GET /api/health` untuk status.
2. Monitoring memanggil `GET /api/health/metrics` untuk histogram.
3. Dashboard Grafana menampilkan RPS, p95/p99.

# Edge Cases

- Missing tenant header (production) → error 400.
- Invalid timestamp atau JWT → 401.
- prom-client tidak tersedia → fallback text metrics tetap aktif.

# Postcondition

- Ketersediaan status dan metrik tervalidasi.

# Acceptance Criteria

- Health tersedia dengan p95 latensi ≤300ms.
- Metrics valid dan dapat divisualisasikan.

# Diagram

- Rujuk dashboard Grafana `monitoring/grafana/dashboards/sba-api-observability.json`.
