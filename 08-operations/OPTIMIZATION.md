---
title: "Optimization & Best Practices Guide"
created_at: 2025-12-28
author: SBA-Agent
status: draft
---

# Optimization & Best Practices Guide

## 1. Resource Management

Untuk memastikan stabilitas di environment production, kami menerapkan limitasi resource pada level container Docker.

### Konfigurasi (docker-compose.prod.yml)

- **CPU Limits:** `1.0` vCPU (Mencegah satu service memonopoli CPU host)
- **Memory Limits:** `1GB` RAM (Mencegah OOM Kill pada host)
- **Reservations:** Menjamin ketersediaan resource minimum (`0.2` CPU, `256MB` RAM)

**Rekomendasi:**

- Pantau penggunaan resource via Grafana.
- Jika usage rata-rata > 70% dari limit, pertimbangkan vertical scaling (tambah limit) atau horizontal scaling (tambah replica).

## 2. API Optimization

- **Compression:** Gzip compression diaktifkan pada NestJS API untuk mengurangi payload size hingga 70%.
- **Rate Limiting:** Mencegah DDoS dan abuse dengan limit request per IP/Tenant.
- **Connection Pooling:** Prisma & Redis dikonfigurasi untuk menggunakan pool connection yang efisien.

## 3. Monitoring & Alerting

Sistem monitoring telah dikonfigurasi dengan Prometheus & Grafana.

### Alert Rules (`monitoring/prometheus/alert.rules.yml`)

1. **HighErrorRate**: Trigger jika HTTP 5xx > 5% selama 2 menit.
2. **HighCPUUsage**: Trigger jika CPU usage > 80% selama 5 menit.
3. **HighMemoryUsage**: Trigger jika Memory usage > 90% selama 5 menit.
4. **InstanceDown**: Trigger jika service down > 1 menit.

**Action Plan saat Alert Triggered:**

- Cek logs: `docker logs sba-agentic-api-daemon-1 --tail 100`
- Cek resource: `docker stats`
- Restart service jika hang: `docker-compose restart [service_name]`

## 4. Rollback Plan

Jika terjadi kegagalan deployment atau anomali performa berat:

### Langkah 1: Identifikasi Masalah

- Cek Alert di Grafana/Prometheus.
- Validasi error logs.

### Langkah 2: Rollback Cepat (Docker)

Jika menggunakan image tag spesifik (misal `v1.0.1` ke `v1.0.2` bermasalah):

```bash
# Edit docker-compose.prod.yml kembali ke tag v1.0.1
vim docker-compose.prod.yml
# Redeploy
docker-compose -f docker-compose.prod.yml up -d
```

### Langkah 3: Rollback Code (Git)

```bash
# Revert commit terakhir
git revert HEAD
# Push perubahan revert
git push origin main
# Pipeline CI/CD akan otomatis deploy versi revert
```

### Langkah 4: Database Rollback (Jika perlu)

_Hati-hati: Data baru mungkin hilang._

```bash
# Down migration (contoh Prisma)
pnpm prisma migrate resolve --rolled-back "migration_name"
```

## 5. Load Testing Benchmark

Hasil benchmark (via `advanced_load_test.py`):

- **Target:** 50 Concurrent Users
- **Throughput:** > 100 RPS diharapkan
- **Latency:** < 500ms (P95)
- **Success Rate:** 100%

_Jalankan tes ini setiap kali ada perubahan mayor pada infrastruktur atau core logic._
