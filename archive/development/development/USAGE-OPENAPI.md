# OpenAPI Usage — Swagger UI & Postman

Versi: 1.0.0
Tanggal: 2025-12-08

## Endpoint Spesifikasi

- JSON: `GET /api/openapi.json`
- Handler: `apps/app/src/app/api/openapi.json/route.ts`
- Builder: `apps/app/src/shared/lib/openapi.ts`

## Swagger UI

- Jalankan aplikasi dev lalu buka Swagger UI lokal (bila tersedia) atau gunakan eksternal UI dengan URL spesifikasi:
  - Spec URL: `${NEXT_PUBLIC_APP_URL}/api/openapi.json`
- Alternatif: pakai docker `swaggerapi/swagger-ui` dan mount URL spesifikasi via env `API_URL`.

## Postman

- Import dari URL: `Import > Link > ${NEXT_PUBLIC_APP_URL}/api/openapi.json`.
- Buat Environment:
  - `baseUrl` = `${NEXT_PUBLIC_APP_URL}`
  - `token` = Bearer JWT valid
  - `tenantId` = ID tenant untuk header `x-tenant-id`
- Tambahkan header default pada Collection:
  - `Authorization: Bearer {{token}}`
  - `x-tenant-id: {{tenantId}}`

## Kualitas & Sinkronisasi

- Rujukan CI tooling: `docs/development/ci-tooling-setup.md` untuk Spectral, openapi-diff, Prism.
- Pastikan setiap perubahan API diimplementasikan bersamaan pada builder `getOpenAPI()`.
- Gunakan `openapi-diff` terhadap baseline sebelum merge untuk mendeteksi breaking changes.

## Catatan

- Spesifikasi mencakup fitur `runs`, `agent` (tools), `analytics`, dan `knowledge` dengan komponen schemas, security schemes, dan status codes konsisten.
- Tambahkan path baru ke `getOpenAPI()` saat fitur bertambah dan sertakan responses 4xx/5xx dengan `ErrorResponse`.
