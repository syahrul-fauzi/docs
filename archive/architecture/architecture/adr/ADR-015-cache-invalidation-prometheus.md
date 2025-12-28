---
title: ADR-015 — Redis Cache Invalidation & Prometheus Instrumentation
status: Proposed
date: 2025-12-10
---

Context

- Caching pada endpoint GET intensif-baca membutuhkan invalidasi yang handal saat data berubah (POST/PUT/DELETE).
- Observabilitas cache diperlukan (hit/miss per endpoint/method/tenant).

Decision

- Implementasi invalidasi berbasis prefix di Redis menggunakan SCAN+DEL (best-effort) yang dipanggil pada endpoint mutasi relevan.
- Instrumentasi Prometheus dengan counters `cache_hit_total` dan `cache_miss_total` berlabel `endpoint`, `method`, `tenant`.

Consequences

- Cache lebih konsisten pasca mutasi data; overhead SCAN dikelola.
- Metrik cache tersedia untuk analisis performa dan regresi.

Alternatives

- Key registry eksplisit (menyimpan semua keys terkait) — kompleksitas lebih tinggi.
- Pub/Sub invalidation — butuh orkestrasi tambahan.
