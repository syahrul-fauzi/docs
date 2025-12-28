# Dokumentasi Kasus Uji Tambahan — Edge & Builder

Versi: 1.0.0
Riwayat Perubahan:

- 1.0.0 (2025-12-05): Dokumentasi kasus uji.

## Endpoint /tools/\*

- Knowledge: invalid `topK` (0), valid query → expect error atau penanganan standar.
- Render: payload minimal valid → expect `url` dan `commitId`.
- Task: title wajib; assignee opsional.

## Endpoint /solo/builder/advance

- Invalid `progress` (>100) → expect error.
- Valid `progress` dan `currentStep` → expect state baru.

## Autentikasi/Otorisasi

- Tambahkan nanti sesuai guard tenant untuk simulasi `FORBIDDEN`.

## Rate Limiting

- Simulasi pelanggaran pada suite perf (k6/Toxiproxy) — dokumentasi terpisah.
