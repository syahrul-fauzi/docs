# Instruksi Operasional – SBA-Agentic v1.1.0

Tanggal: 2025-12-08

## Deployment

1. Pastikan Node + pnpm terpasang (lihat packageManager).
2. `pnpm install --frozen-lockfile`
3. `pnpm run type-check` dan `pnpm run test`
4. Release internal:
   - `pnpm run changeset` → buat changeset
   - `pnpm run version:packages` → bump versi
   - Pipeline di main menjalankan `pnpm run release:packages`

## Rollback

1. Revert PR/commit ke tag versi stabil sebelumnya (Changesets).
2. `pnpm run type-check` dan `pnpm run test`
3. Deploy tag versi yang direvert via pipeline release.

## Monitoring

- Endpoint: `GET /api/health`
- Metrik: antrean worker (waiting/active/completed/failed), latensi eksekusi tool.
- Coverage artifacts & test reports dipantau di CI.

## Troubleshooting

- Impor entities gagal → gunakan subpath `@sba/entities/*` dan alias TS ke `packages/entities/dist/*`.
- Next headers error → gunakan d.ts lokal dan alias mapping di TS config.
- E2E storage gagal → gunakan endpoint mock `api/storage/{init,complete}` di setup test.
- Worker/Redis gagal → pastikan stub `ioredis` & queue stubs aktif via alias; nonaktifkan koneksi infra saat NODE_ENV=test.

## Lampiran

- Alias ioredis: apps/api/vitest.config.ts:49
- Alias AWS S3: apps/api/vitest.config.ts:104–112
- Perbaikan API params: apps/api/src/app.ts:129–131
- Impor AuthLayout: apps/web/src/app/**tests**/authlayout.a11y.spec.tsx:5
