---
title: ADR-014 — DI Adapters: Redis & In-Memory Cache
status: Proposed
date: 2025-12-10
---

Context

- Membutuhkan cache adapter yang dapat diganti (Redis produksi, in‑memory untuk dev/test) melalui DI tanpa mengubah call site.

Decision

- Definisikan `CacheAdapter` interface (`get/set/del`).
- Implementasi:
  - `InMemoryCache` untuk dev/test.
  - `RedisCache` untuk prod; otomatis memilih `ioredis` atau `node-redis` jika tersedia.
- Registrasi DI per environment:
  - Dev/Test: `InMemoryCache`.
  - Prod: `RedisCache` bila klien tersedia, fallback ke `InMemoryCache`.

Consequences

- Swapping cache tanpa menyentuh kode domain/application.
- Ketergantungan runtime diperiksa aman; fallback menjaga ketersediaan.

Best Practices

- Gunakan tokens eksplisit di DI (`TOKENS.cache`).
- Hindari instansiasi langsung adapter di use case; minta via DI.
- Kelola TTL via konfigurasi, bukan hard‑code.
- Logging peristiwa fallback untuk visibilitas.
