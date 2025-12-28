# Changelog – SBA-Agentic v1.1.0 (2025-12-08)

## Fitur Baru

- Subpath exports `@sba/entities/*` + DTO/events
- Guard CI impor entities
- Adapter contoh API/Web + README
- Storage mock in‑memory untuk E2E

## Peningkatan

- Strict type fixes pada VO/DTO
- Alias TS ke `dist` untuk entities dan UI
- AWS S3 stubs dan presigner untuk tests
- Worker services stubs terpusat (Queues/Logging/Registry)
- Orchestrator fixtures + validasi otomatis

## Perbaikan Bug

- Perbaikan akses `req.params` di API
- Hoisting mock worker diatasi dengan modul stub
- Resolver path storage provider tests dinormalisasi

## CI/CD

- Changesets config + workflow release YAML
- Coverage gates aktif (statements 90%, branches 85%, functions 95%, lines 90%)
