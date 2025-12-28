# Permission Coverage Prefix — Konfigurasi

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Panduan konfigurasi prefix modul.

## Environment Variable

- `PERMISSION_COVERAGE_PREFIX`: satu atau beberapa prefix path (comma-separated) untuk modul yang ditargetkan.
- Default: `packages/api-client` bila tidak di-set.
- Format valid: huruf/angka/`_`/`.`/`/`/`,`/`-` (regex `^[\w./,-]+$`).

## Contoh

- Satu modul:

```
PERMISSION_COVERAGE_PREFIX=packages/api-client
```

- Multiple modul:

```
PERMISSION_COVERAGE_PREFIX=packages/api-client,packages/realtime
```

## CI Integration

- Tambahkan ke step enforcement:

```
env:
  PERMISSION_COVERAGE_MIN: 90
  COVERAGE_SUMMARY: coverage/coverage-summary.json
  PERMISSION_COVERAGE_PREFIX: packages/api-client,packages/realtime
```

## Error Handling

- Bila prefix invalid, skrip akan fail dengan pesan jelas.
