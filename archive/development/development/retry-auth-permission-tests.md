# Suite Pengujian Retry/Backoff & Auth/Permission

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Dokumentasi suite pengujian.

## Retry/Backoff

- Simulasikan 5xx dan network errors; verifikasi delay eksponensial dan batas max attempts.
- Pastikan perilaku setelah max retry: error dilaporkan dengan jelas.

## Autentikasi JWT

- Token valid, expired, invalid signature/format, dan tanpa claim.
- Skenario tanpa token (unauthenticated) → expect error.

## Permission

- Token dengan permission cukup vs tidak cukup.
- Verifikasi error 403/permission denied dan kombinasi kompleks.

## Proxy API_BASE

- Gunakan proxy di CI (Toxiproxy/Prism) untuk mengendalikan error/latency.

## Assertions

- Harus specific terhadap kontrak API dan perilaku klien (retry/backoff, headers, error mapping).
