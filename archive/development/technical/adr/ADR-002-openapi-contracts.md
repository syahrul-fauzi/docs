# ADR-002 — OpenAPI Contracts & Version Locking

Versi: 1.0.0
Tanggal: 2025-12-05
Status: Accepted

## Konteks

Sinkronisasi kontrak REST perlu dijamin lintas apps dan paket.

## Keputusan

- Generate `packages/api-types` (OpenAPI → TS types) dan `packages/api-client` (clients).
- CI lint (`spectral`) dan diff (`openapi-diff`), fail on breaking changes.
- Version locking: `x-api-version` dan client `semver+specHash`.

## Konsekuensi

- Stabilitas kontrak; pencegahan regresi kompatibilitas.

## Referensi

- `apps/api/docs/openapi.yaml`
