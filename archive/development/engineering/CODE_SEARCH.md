# Code Search & Indexing (Internal)

Dokumen ini menjelaskan cara melakukan pencarian kode internal di monorepo SBA-Agentic, termasuk mekanisme fallback ketika sistem indexing IDE/agent belum siap.

## Target

- Pencarian cepat untuk symbol/teks di `apps/`, `packages/`, `tools/`, `docs/`
- Tetap bisa dipakai saat indexing engine tidak tersedia
- Output stabil dengan format `path:line:content`

## Tool Internal

Gunakan script internal:

- Build index: `pnpm -s code:index`
- Search: `pnpm -s code:search "<query>" [--regex] [--i] [--glob "<glob>"] [--max <n>]`

Perilaku:

1. Prioritas pakai `rg` (ripgrep) bila tersedia.
2. Jika `rg` tidak tersedia/bermasalah, fallback ke pencarian streaming berbasis index `.cache/code-search/index.json`.

Index bersifat lokal (tidak di-commit), tersimpan di `.cache/`.

## Fallback Manual (Tanpa Index)

Jika tool internal belum tersedia pada environment tertentu, gunakan:

- Cari string literal cepat: `rg -n -F "<string>" apps packages tools docs`
- Cari regex: `rg -n "<regex>" apps packages tools docs`
- Batasi scope: `rg -n -F "<string>" apps/api apps/app`
- Cari file tertentu: `rg -n -F "<string>" --glob "**/*.ts" apps/api`

## Troubleshooting

- Hasil tidak lengkap:
  - Jalankan `pnpm -s code:index` untuk rebuild index.
  - Pastikan file besar/artefak build tidak masuk index (default sudah di-skip).
- Performa lambat:
  - Gunakan `--glob` untuk memperkecil scope.
  - Gunakan query spesifik (mis. nama class/function).

## Timeline Indexing Permanen

Tahap bertahap supaya aman untuk stabilitas:

- Minggu 1: Tool internal + baseline docs (selesai).
- Minggu 2: Integrasi ke pipeline CI untuk memastikan tooling tetap tersedia dan konsisten.
- Minggu 3–4: Evaluasi indexing permanen:
  - Opsi A: service internal (OpenSearch/Meilisearch) + job reindex incremental
  - Opsi B: integrasi TypeScript language service untuk symbol-level indexing
