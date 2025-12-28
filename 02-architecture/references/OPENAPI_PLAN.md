---
id: architecture.references.openapi_plan
version: 1.0.0
author: API Team
status: active
scope: global
tags: [reference, plan, openapi, swagger]
---

# OpenAPI Implementation Plan

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Draft rencana implementasi.

## Generator & Paket

- Generator Types: `openapi-typescript` → `packages/api-types`
- Generator Clients: `orval` (axios/fetch) → `packages/api-client`
- Mock Server: Prism untuk contract tests

## CI/CD

- Lint Spec: `spectral` (rules: info.version semver, operationId unik, schema required lengkap)
- Diff Spec: `openapi-diff` (fail on breaking change: removed path, schema incompatible)
- Contract Tests: jalankan terhadap Prism mock; skenario `/runs`, `/tools/*`, `/solo/builder/advance`
- Version Locking: client `1.0.0+spec.<sha>`; API header `x-api-version`

## Tasks

- Generate initial types & clients dari `apps/api/docs/openapi.yaml`
- Publikasi workspace packages dan transpile di Next (frontends)
- Konsumsi `packages/api-types` di `apps/app` & `apps/web`
