# Code Review Process

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Draft proses review.

## Checklist

- Correctness & tests hijau (unit/integration/e2e)
- Security (CSP, RBAC, RLS, secrets)
- Performance & observability (metrics/traces)
- Docs & OpenAPI sinkron
- No cross-app imports; gunakan `@sba/*`

## Proses

- 2 LGTM minimal untuk perubahan kritis; 1 untuk minor
- Require link ke `file_path:line_number` saat referensi kode
