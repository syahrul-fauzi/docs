# Prism Handlers — Permission (403) & Throttle (429)

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Draft konfigurasi Prism.

## Permission (403)

- Tambahkan rules untuk memeriksa header `Authorization` dan claims minimal (role/perms) → kembalikan 403 bila tidak terpenuhi.
- Gunakan x-extensions atau mock callback untuk memvalidasi.

## Throttle (429)

- Tambahkan handler yang mengembalikan 429 dan header `Retry-After` (seconds atau date) untuk endpoint simulasi.
- Contoh endpoint: `/simulate-429-seconds`, `/simulate-429`.

## Implementasi

- Prism CLI mendukung custom plugin; atau gunakan definisi `responses` khusus di OpenAPI dengan `default`/`4xx` dan examples yang menyertakan headers.
- Sesuaikan baseline `apps/api/docs/openapi-baseline.yaml` untuk menyertakan skenario ini bila diinginkan.
