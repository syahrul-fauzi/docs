# OPERATIONS RUNBOOK — Hari-H Go-Live & Pemantauan

## Tujuan

Menjaga stabilitas saat canary dan full rollout dengan prosedur operasional, eskalasi, dan rollback yang jelas.

## Tim & Kontak

- Owner Teknis: Tech Lead
- On-call: Ops/SRE
- QA: Lead QA
- Kanal: `#sba-ops` (Slack), Email Ops, PagerDuty

## Jadwal Pemantauan

- Sampling metrik: setiap 5 menit
- Ringkasan: setiap 15 menit
- Observasi minimal: 4 jam untuk canary 5%

## Metrik & Ambang

- Latensi p95: target ≤ 500ms
- Error rate: target ≤ 0.5%
- Throughput: catat baseline vs canary
- Resource: CPU/Mem/IO; catat deviasi signifikan

## Prosedur Pemantauan

- Periksa dashboard Prometheus/OTel: p95, error, throughput, resources
- Validasi endpoint `GET /api/metrics`
- Lakukan functional checks ringan setiap 15 menit di halaman utama dan rute API kritis
- Rekam observasi di `docs/deployment/canary-WS-Edge-YYYY-MM-DD.md`

## Eskalasi

- Jika ambang dilampaui ≥ 3 sampling berturut-turut atau spike > 2× baseline:
  - Notifikasi on-call (Slack/Pager/Email)
  - Analisis cepat (logs terstruktur, trace, recent deploy diff)
  - Putuskan mitigasi: throttling, penonaktifan fitur, atau rollback parsial

## Rollback

- Trigger: ambang berulang atau dampak bisnis/prod kritis
- Langkah:
  - Turunkan persentase canary ke 0%
  - Kembalikan versi sebelumnya (artifact/stable build)
  - Verifikasi health checks dan metrik kembali ke baseline
  - Catat incident dan lakukan postmortem (`docs/ops/postmortem-template.md`)

## Dokumentasi

- Catat metrik harian di `docs/deployment/canary-metrics.schema.json`
- Catat anomali dengan `docs/deployment/anomaly-log.schema.json`
- Perbarui laporan observasi `docs/deployment/canary-observation-report.md`

## Tinjauan Pasca-Observasi

- Rekomendasi: naikkan canary (10% → 25% → 50% → 100%) atau rollback
- Sign-off lintas fungsi sebelum meningkatkan persentase
- Rencanakan rilis berikutnya berdasarkan temuan observasi
