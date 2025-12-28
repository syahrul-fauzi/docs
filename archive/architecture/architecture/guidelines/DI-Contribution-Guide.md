---
title: DI Contribution Guide
version: 1.0.0
created_at: 2025-12-10
last_modified: 2025-12-10
status: Draft
tags: [guideline, di]
---

# Pola Registrasi

- Definisikan interface di `adapters/<area>/types.ts`.
- Implementasi adapter di `adapters/<area>/<impl>.ts`.
- Daftarkan token di `di/tokens.ts` (mis. `TOKENS.cache`).
- Registrasi per environment di `di/environments.ts` (dev/test/prod).

# Konvensi Penamaan

- Interface: `<Name>Adapter`.
- Implementasi: `<Backend><Name>` (mis. `RedisCache`, `InMemoryCache`).
- Token: `TOKENS.<lowerCamelCase>`.

# Scope/Lifetime

- Default singleton via container registry.
- Gunakan factory untuk resource eksternal (client koneksi). Perhatikan lifecycle (connect/close) bila perlu.

# Contoh Umum

- Cache: Redis vs In‑Memory.
- Queue: SQS vs In‑Memory.
- Storage: S3 vs Local.

# Petunjuk Navigasi Kode

- Entry DI: `apps/orchestrator/src/di/*`.
- Konsumsi DI: konstruktor komponen menerima container atau resolve token pada bootstrap.
