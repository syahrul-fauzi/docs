---
title: Cache Expansion Plan — DI + CacheAdapter
version: 1.0.0
created_at: 2025-12-10
last_modified: 2025-12-10
status: Draft
tags: [cache, di]
---

# Endpoint Terkena Dampak

- `/api/knowledge/search` — TTL default 5s (param `ttl`), invalidasi spesifik via key.
- `/api/knowledge/search-cached` — TTL 5s, for demo path.
- `/api/analytics/metrics` — TTL 30s.
- `/api/analytics/heatmap` — TTL 10s.
- `/api/analytics/charts` — TTL 60s.

# Konfigurasi Cache

- Adapter: Redis (prod, fallback InMemory).
- Token DI: `TOKENS.cache`.
- TTL dapat dikonfigurasi per endpoint (params/env/config).
- Header: `X-Cache` (`hit|miss`).

# Alur Kerja Baru

- Handler menghasilkan body murni (tanpa NextResponse), wrapper `cacheJsonResponse` mengatur header dan caching.
- Invalidasi: prefix function tersedia (placeholder); Redis dapat memakai pattern scan/delete.
- Metrik: counters Prometheus `cache_hit_total` dan `cache_miss_total` dengan label `endpoint`, `method`, `tenant`.
