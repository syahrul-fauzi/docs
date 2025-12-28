# Prism Auth Proxy — RBAC/ABAC Validator

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Implementasi proxy otorisasi.

## Konsep

- Proxy NodeJS di depan Prism untuk memeriksa Authorization JWT payload (`roles`, `attrs`).
- Aturan dinamis dari `auth-rules.json`.

## Konfigurasi

- Env: `PRISM_HOST`, `PRISM_PORT`, `PROXY_PORT`.
- Jalankan: `node scripts/prism-auth-proxy.js` setelah Prism aktif.
- Aturan: `auth-rules.json` mendukung:
  - Kombinasi role (AND/OR): `rolesAll`, `rolesAny`
  - Multi-atribut dengan operator perbandingan: `eq`, `ne`, `gt`, `lt`
  - Kondisi bersarang: `and`, `or`

## Pengujian

- Gunakan `PRISM_URL=http://localhost:4011` pada contract tests.
- Lihat `packages/api-client/src/__tests__/permission-dynamic.test.ts`.
- Lihat `packages/api-client/src/__tests__/permission-complex.test.ts` untuk kombinasi AND/OR dan comparison.
