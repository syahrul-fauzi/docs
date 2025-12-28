# ADR-004 Details — Retry & Idempotensi

Versi: 1.0.0
Tanggal: 2025-12-05
Status: Draft

## Retry Policy

- Backoff: `delay = base * 2^attempt` (base 1000ms, max attempts 5)
- Retries untuk error jaringan/transient; tidak untuk VALIDATION_ERROR

## Idempotensi

- Header `Idempotency-Key` pada operasi side-effect (task/render/enqueue)
- Redis `SETNX key:hash` untuk lindungi duplikasi; TTL sesuai SLA

## Logging/Metrics

- Log idempotent hit/miss; expose counters

## Pengujian

- Simulasi pengulangan request; verifikasi satu efek saja
