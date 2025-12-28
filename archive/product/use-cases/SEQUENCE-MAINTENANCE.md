# Pemeliharaan Diagram Sequence

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Panduan sinkronisasi diagram dengan kode.

## Mekanisme Pembaruan

- Semi-otomatis:
  - Tambahkan komentar penanda di kode yang menunjuk ke berkas diagram (`// Diagram: docs/use-cases/...`).
  - Gunakan pencarian lintas repo untuk mendeteksi perubahan endpoint/event (mis. `runs.controller.ts`, `events/route.ts`).
  - Update berkas `.mmd` terkait saat terjadi perubahan signature atau alur.
- CI (opsional):
  - Job yang memvalidasi keberadaan referensi diagram untuk endpoint utama.
  - Laporan perubahan untuk tim dokumentasi.

## Validasi Rutin

- Saat menambahkan/mengubah endpoint:
  - Pastikan alur happy path, alt (continue/cancel), dan opt (error) sesuai implementasi.
  - Sertakan referensi file dan fungsi/metode.
- Review berkala:
  - Minimal setiap rilis minor; cek konsistensi diagram.

## Penamaan & Struktur

- Satu berkas `.mmd` per endpoint.
- Gunakan nama konsisten: `sequence-api-<resource>-<action>.mmd`.
- Fragmen terorganisir: `alt`, `opt`, `loop` untuk cabang dan streaming.

## Referensi

- `apps/api/src/api/runs.controller.ts` (start/continue/cancel/list)
- `apps/app/src/app/api/runs/[runId]/events/route.ts` (SSE)
