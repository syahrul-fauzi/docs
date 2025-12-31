---
title: "Benchmark and Best Practices"
created_at: 2025-12-28
author: Architecture Team
status: active
---

# Benchmark and Best Practices

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Draft referensi awal.
  Penanggung Jawab: SBA Docs Team — contact: <docs@sba.local>

## Benchmarking Fitur Serupa

- Agentic streaming: target T90 event latency < 2s; reconnect < 10s
- CRUD Supabase: p50 < 300ms; realtime p95 < 2s
- Queue enqueue: < 50ms; worker throughput sesuai SLA langkah

## Studi Kasus Industri

- SaaS fitur baru menggunakan analisis CATWOE untuk dampak sistem (owners, constraints, worldview) — selaraskan per tenant
- Fintech mengidentifikasi fitur tambahan berdasarkan analitik penggunaan — gunakan telemetry untuk menemukan opportunity (REF 1)

## Best Practices Asisten Bisnis Cerdas

- Requirement Analysis SDLC: identifikasi masalah, pengguna, kebutuhan fungsional & non-fungsional; susun SKPL/FRD; kaji ulang bersama stakeholder (REF 3)
- Non-Fungsional: keamanan kredensial, kinerja, keandalan, skalabilitas, ketersediaan, observability; prioritisasi berdasarkan dampak (REF 5)
- Data Governance: RLS ketat, audit trail, redaksi data sensitif
- Integrasi: idempotensi operasi, rate-limit, kunci rotasi, kompensasi kegagalan
- Arsitektur: pemisahan concerns UI/API/Data; typed contracts (OpenAPI), shared packages untuk konsistensi

## Rekomendasi Implementasi

- Standarisasi event schema dan client SSE/WS dalam paket bersama
- Generate typed HTTP client dari OpenAPI untuk konsistensi kontrak
- Instrumentasi end-to-end: metrics + traces dengan identitas `tenantId/sessionId/requestId`
- Feature flags untuk jalur komunikasi (SSE vs WS) dan integrasi optional
