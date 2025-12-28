# Setup Lingkungan — Dev → Prod

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Draft setup end-to-end.

## Prasyarat

- Node.js, pnpm, Docker (opsional), Supabase project, Upstash Redis (opsional)
- Env:

```
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

## Perintah

- Dev: `pnpm --filter @sba/app run dev`
- Test: `pnpm --filter @sba/app run test:run`
- Type-check: `pnpm --filter @sba/app run type-check`

## Observability

- Prometheus-style metrics: UI membaca `sba_latency_p95_seconds`/`p99`
- Tag tenant: header `x-tenant-id` via middleware

## Production

- Build: `turbo run build`
- Deploy: frontend (Vercel/edge), backend (NestJS/k8s), Supabase (managed)
- Canary: aktifkan di CD; gating `x-api-version`

## CMS & Alias Setup

- Paket: `@sba/cms` aktif secara default pada Rube.
- Alias konsisten di dev/prod:
  - Root paths: `@sba/cms` → `packages/cms/src/index.ts` (`tsconfig.json`)
  - Dev server Rube: definisi eksplisit di `packages/rube/vite.config.ts`
  - Vitest: subpath alias untuk `@sba/cms/*` di `packages/rube/vitest.config.ts`
- Produksi (Node): `@sba/cms` diekspor sebagai CommonJS (`dist/index.js`) sehingga kompatibel dengan server Rube (`type: commonjs`).

### Opsi Produksi

- Node loader `tsconfig-paths/register` (opsional):
  - Gunakan saat menjalankan `ts-node` di dev untuk membaca `compilerOptions.paths`.
  - Contoh: `node --require ts-node/register --require tsconfig-paths/register src/server/index.ts`.
- Vite SSR (opsional):
  - Tambahkan `resolve.alias` untuk `@sba/cms` dan aktifkan plugin validasi alias.
  - Lihat `packages/rube/vite.config.ts` untuk contoh.

### Validasi Alias

- Dev: plugin `alias-check` memverifikasi bahwa path alias `@sba/cms` valid.
- Test: jalankan `pnpm -C packages/rube run test -- --coverage` dan pastikan connectors `cms.*` terdaftar.
- Prod: server Rube memuat connectors CMS secara default; jika gagal, periksa output build `packages/cms/dist` dan dependency workspace.

### Variabel Lingkungan

- `RUBE_ENABLE_CMS` (opsional):
  - Saat disetel ke `0`, nonaktifkan pendaftaran CMS (gunakan hanya untuk troubleshooting).
  - Default integrasi CMS: aktif tanpa flag.

### Penanganan Error

- Alias tidak ditemukan: pastikan `tsconfig.json` paths memuat `@sba/cms` dan file `packages/rube/vite.config.ts` aktif.
- Resolusi modul produksi: pastikan `packages/cms` telah di-build (`pnpm -C packages/cms run build`) sehingga `dist/` tersedia.
