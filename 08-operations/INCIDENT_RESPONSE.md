---
title: SBA-Agentic Incident Response & Rollback
created_at: 2025-12-28
author: Documentation Architect
status: active
priority: high
tags: [incident, rollback, troubleshooting, recovery]
---

# SBA-Agentic Incident Response & Rollback

Prosedur penanganan insiden, pemecahan masalah (troubleshooting), dan rencana pemulihan (recovery) untuk sistem SBA-Agentic.

## 1. Rencana Rollback (Rollback Plan)

Lakukan rollback jika terjadi kegagalan deployment atau regresi kritikal yang terdeteksi oleh monitoring.

### Skenario Pemicu
- Kegagalan build/deploy di pipeline CI/CD.
- Lonjakan error rate > 5% secara tiba-tiba pasca-deploy.
- Kegagalan fungsi kritikal (Auth, Chat, Payment).

### Langkah-langkah Rollback
1. **Revert Build**: Kembali ke artefak build terakhir yang diketahui stabil (last known-good).
   - Perintah: `pnpm run staging:rollback`.
2. **Restore Env**: Kembalikan variabel lingkungan ke versi sebelumnya jika ada perubahan config.
3. **Clear Cache**: Bersihkan cache CDN dan Redis untuk memastikan tidak ada state lama yang tersisa.
4. **Monitoring**: Pantau error rate dan kesehatan runtime agen selama 30 menit pasca-rollback.

## 2. Prosedur Troubleshooting

Jika terjadi masalah operasional, ikuti langkah berikut:

- **Cek Health Check**: Akses `/api/health` untuk memastikan layanan inti (DB, Redis) terhubung.
- **Analisis Log**: Gunakan ELK stack atau log aggregator untuk mencari error unik/trace-id.
- **Monitor Latency**: Cek dashboard Grafana untuk mendeteksi bottleneck di DB atau API.
- **Audit Trail**: Periksa log audit untuk melihat perubahan konfigurasi atau aksi user yang mencurigakan.

## 3. Verifikasi Pasca-Insiden

Setelah tindakan perbaikan atau rollback dilakukan, verifikasi sistem:
- Jalankan "Smoke Test" E2E pada rute kritikal: `/dashboard`, `/settings`, `/observability`.
- Pastikan endpoint metrik (`/metrics`, `/metrics/workers`) kembali tersedia.
- Konfirmasi status `ok` pada semua indikator di System Health Widget.

## 4. Pelaporan Insiden (Post-Mortem)

Setiap insiden besar wajib didokumentasikan:
- Deskripsi masalah dan durasi downtime.
- Akar penyebab (Root Cause Analysis).
- Tindakan perbaikan yang diambil.
- Rencana mitigasi agar masalah tidak terulang.
