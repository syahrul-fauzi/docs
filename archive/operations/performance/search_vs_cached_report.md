---
title: E2E Performance — Knowledge Search vs Cached
version: 1.0.0
created_at: 2025-12-10
last_modified: 2025-12-10
status: Draft
tags: [performance, e2e]
---

# Ringkasan

- Membandingkan kinerja `/api/knowledge/search` vs `/api/knowledge/search-cached` pada beban realistis dan skenario spike.

# Metodologi

- k6 dengan skenario constant-arrival-rate dan ramping-arrival-rate.
- Variabel: RATE, DURATION, QUERY, TTL, BASE_URL.
- Artefak ringkasan: `artifacts/perf/knowledge_search_vs_cached.summary.json`.

# Visualisasi

- Grafik disimpan di `docs/performance/assets/` dengan format nama `search-vs-cached-{metric}-{timestamp}.png`.
- Metric yang diplot: response time (avg/p95), throughput, error rate.

# Rekomendasi

- Tuning TTL berdasarkan profil query dan frekuensi akses.
- Pertimbangkan warm-up cache pada rute populer.
- Monitor p95/p99 dan error rate untuk deteksi regresi.

# Screenshot

- Lampirkan dashboard k6/Artillery bila tersedia.
