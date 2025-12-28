# Release Management

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Draft release.

## SemVer & Changelog

- `docs/CHANGELOG.md` mencatat fitur, perbaikan, dan security
- Tag rilis mengacu pipeline CI

## Version Locking

- API client `1.0.0+spec.<sha>`; server memvalidasi `x-api-version`

## Proses Rilis

- PR review → build/test/type-check → release notes → deploy canary → full roll-out
