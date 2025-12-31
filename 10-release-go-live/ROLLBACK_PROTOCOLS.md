---
title: "SBA-Agentic Rollback Protocols"
created_at: 2025-12-28
author: SOLOBuilder
status: active
---

# SBA-Agentic Rollback Protocols

Protokol ini mendefinisikan langkah-langkah untuk mengembalikan sistem ke keadaan stabil sebelumnya jika terjadi kegagalan pasca-deployment.

---

## 1. Kriteria Pemicu Rollback (Trigger)

Rollback harus dilakukan SEGERA jika salah satu kondisi berikut terpenuhi:

- **Error Rate (5xx)** meningkat > 5% dalam 5 menit pertama.
- **Latency p95** meningkat > 200% dari baseline.
- **Agent Reasoning Failure**: Laporan kegagalan logika sistemik dari `Review Agent`.
- **Data Corruption**: Terdeteksi kerusakan pada skema database atau state Redis.

---

## 2. Prosedur Rollback Teknis

### 2.1 Aplikasi (Service Rollback)

1. **Revert Container**: Deploy ulang image container versi stabil sebelumnya (N-1) melalui pipeline CI/CD.
2. **Traffic Shift**: Ubah bobot traffic di API Gateway kembali ke versi lama secara instan (100% Old).

### 2.2 Database (Schema Rollback)

1. **Caution**: Hindari rollback schema jika sudah ada data baru masuk (kecuali sangat kritikal).
2. **Down Migration**: Jalankan script `npm run db:migrate:down`.
3. **Data Recovery**: Jika terjadi kerusakan data, gunakan prosedur di `DISASTER_RECOVERY_PLAN.md`.

---

## 3. Komunikasi & Post-Mortem

- **Status Update**: Beritahu stakeholder melalui channel insiden.
- **Post-Mortem**: Wajib dilakukan dalam 24 jam setelah rollback untuk mengidentifikasi root cause dan mencegah pengulangan.

---
Ditetapkan oleh SOLOBuilder untuk keamanan rilis produksi.
