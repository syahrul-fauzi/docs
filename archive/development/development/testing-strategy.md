# Testing Strategy — Unit, Integration, Contract

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Draft strategi testing.

## Unit Tests

- Target coverage: lines/functions/statements ≥ 80%, branches ≥ 70%.
- Modul: `@sba/api-client`, `@sba/realtime` adapters, parsers SSE.

## Integration Tests

- Happy path & edge cases untuk `/runs`, `/tools/*`, `/solo/builder/advance`.
- Test containers atau mocks untuk Redis/Supabase bila relevan.

## Contract Tests

- Prism mock server untuk validasi client ↔ spec.
- Fail pipeline pada mismatch.

## Automation Scripts

- `pnpm test:ci` menjalankan unit/integration/contract suite.

## Acceptance Criteria

- Semua suite hijau; coverage memenuhi threshold.

## Rollback Plan

- Pin versi paket klien; revert perubahan yang menyebabkan kegagalan.

## Metrik Keberhasilan

- Trend coverage meningkat; waktu eksekusi terkendali; jumlah regresi menurun.
