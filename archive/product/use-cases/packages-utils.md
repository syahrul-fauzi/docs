# Paket: @sba/utils (Helper & Utilities)

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Dokumen awal use case dan alur.

## Peran & Tanggung Jawab

- Menyediakan fungsi utilitas umum (formatting, parsing, date/time, network helpers, assert) yang dipakai lintas frontend/backend.

## Fitur Utama

- Helper string/number/date.
- Penggabungan kelas (tailwind-merge/clsx wrapper), debounce/throttle.
- Error helpers (normalisasi dan mapping).

## Integrasi

- Digunakan oleh `apps/app` dan `apps/web` dalam komponen, hooks, dan services; `apps/api` untuk sanitasi/validasi ringan bila diperlukan.

## Persyaratan Teknis & Dependensi

- TypeScript, kompatibel ESM/CJS.

## Tujuan Implementasi

- Mengurangi duplikasi fungsi util; coverage unit tinggi (>90%).

## Batasan & Lingkup

- Tidak memuat I/O langsung atau logic domain berat.

## Error Handling

- Fungsi util defensif; tidak melempar kecuali perlu; mengembalikan nilai fallback.

## Logging & Monitoring

- Tidak melakukan logging; konsumen bertanggung jawab.

## Kontribusi ke SBA

- Meningkatkan kecepatan pengembangan dan konsistensi perilaku.

## Interaksi dengan Modul Lain

- Dipanggil oleh UI (`@sba/ui`), data layer (repos), dan API helpers.

## Skalabilitas & Maintainability

- Modular per subpaket; semver versi; dokumentasi TSDoc.

## Kepatuhan Kualitas & Keamanan

- Linting, unit tests; tidak menyentuh secret.

## Skenario Utama

- Format timestamp untuk UI, normalisasi error untuk display.

## Acceptance Criteria

- Fungsi pure, deterministic; dokumentasi dan tipe jelas.

## Test Plan

- Unit: setiap fungsi util; property-based testing untuk parser.

## Diagram Flowchart

```mermaid
flowchart TD
  Apps --> Utils[@sba/utils]
  Utils --> Apps
```

## Referensi Teknis

- Digunakan melalui import pada `apps/app` dan `apps/web`.
