---
title: SBA-Agentic Type-Check Strategy
created_at: 2025-12-28
author: Documentation Architect
status: active
priority: medium
tags: [typescript, type-check, ci, quality]
---

# SBA-Agentic Type-Check Strategy

Strategi dan panduan pemeriksaan tipe (Type-Check) untuk menjaga integritas kode TypeScript di seluruh monorepo.

## 1. Tujuan & Filosofi

- Menjadikan Type-Check sebagai gate utama sebelum build, test, atau deploy.
- Meminimalkan penggunaan `any` dan `// @ts-ignore`.
- Mendorong pengetatan tipe secara bertahap tanpa mengganggu kecepatan pengembangan.

## 2. Perintah Utama

| Lingkup | Perintah | Deskripsi |
|---------|----------|-----------|
| **Global Workspace** | `pnpm run type-check` | Menjalankan type-check di semua paket via Turbo. |
| **Global Tests** | `pnpm run type-check:test:global` | Cek tipe untuk suite pengujian lintas paket. |
| **Per Paket** | `pnpm -C <path> run type-check` | Cek tipe spesifik pada satu paket. |
| **Reporting** | `pnpm run type-check:report` | Menghasilkan `artifacts/typecheck-summary.json`. |

## 3. Praktik Terbaik

- **No Emit**: Gunakan `tsc --noEmit` untuk pemeriksaan murni.
- **Strict Mode**: Pertahankan `strict: true` di `tsconfig.json` dasar.
- **Explicit Annotations**: Hindari `noImplicitAny`. Aktifkan secara bertahap per folder.
- **Expect Error**: Gunakan `// @ts-expect-error` daripada `// @ts-ignore` jika ada error yang diketahui, disertai komentar alasan.

## 4. Integrasi CI (GitHub Actions)

Job `typecheck-global` harus berjalan paling awal dan menjadi prasyarat bagi job lainnya:

1. Setup environment (Node, pnpm, deps).
2. Jalankan `pnpm run type-check` dan `pnpm run type-check:test:global`.
3. Jika gagal, hentikan pipeline dan berikan feedback pada PR.

## 5. Dashboard & Monitoring

Metrik type-check dipantau via `typecheck-summary.json`:

- **Total Errors**: Harus selalu 0 pada branch utama.
- **Durasi**: Dipantau untuk mendeteksi regresi performa kompilasi.
- **Progres Pengetatan**: Persentase file yang telah memenuhi standar `strict` terbaru.

## 6. Debugging & Resolusi

- Jika terjadi konflik tipe lintas paket, periksa alias `paths` di `tsconfig.json` root.
- Pastikan versi TypeScript konsisten di seluruh workspace (menggunakan versi yang di-pin di root).
- Gunakan `pnpm run type-check` secara lokal sebelum melakukan push untuk menghindari kegagalan CI.
