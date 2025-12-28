# Linting: 0 Warnings Strategy (Monorepo)

Tujuan akhir: `0 warnings` di seluruh monorepo tanpa mengorbankan stabilitas rilis.

Karena saat ini masih ada warnings historis, strategi dibuat bertahap dengan baseline gate agar tidak muncul warning baru.

## Prinsip

1. Tidak ada warning baru masuk ke main (gated di CI).
2. Warnings lama dibersihkan bertahap (burn-down) dengan target mingguan.
3. Setelah baseline turun ke 0, aktifkan `--max-warnings 0` sebagai standar.

## Perintah Utama

- Lint biasa (developer): `pnpm -s lint`
- Lint strict (target akhir): `pnpm -s lint:strict`
- Buat baseline warnings (sekali / saat update besar): `pnpm -s lint:baseline:prepare`
- Cek baseline (CI): `pnpm -s lint:baseline:check`
- Update baseline (hanya bila disepakati): `pnpm -s lint:baseline:update`
- Lihat prioritas perbaikan (top rules/files): `pnpm -s lint:breakdown`

## Mekanisme Baseline Gate

Baseline disimpan di `tools/ci/baselines/eslint-warnings.json` dan berisi daftar warnings yang sudah ada.

CI menjalankan `pnpm -s ci:lint` yang akan:

- Menjalankan ESLint dan menghasilkan `ci-artifacts/eslint-report.json`
- Menghitung warning saat ini
- Gagal bila ada warning baru dibanding baseline

Dengan cara ini, proyek bisa bergerak menuju `0 warnings` tanpa memblokir rilis hanya karena backlog warnings lama.

## Strategi Burn-down (Bertahap)

Rekomendasi eksekusi:

- Mingguan: pilih 1–3 kategori rule terbesar (mis. `no-unused-vars`, `consistent-type-imports`) dan perbaiki per paket.
- Setelah sejumlah warnings dibersihkan, jalankan `pnpm -s lint:baseline:update` untuk menurunkan baseline.
- Ulangi sampai baseline = 0, lalu ganti gate CI ke `pnpm -s lint:strict`.

## Perubahan Konfigurasi & Dokumentasi

- ESLint config: `eslint.config.js`
- Baseline gate script: `tools/ci/eslint-baseline.mjs`
- CI workflow: `.github/workflows/lint-typecheck.yml`
