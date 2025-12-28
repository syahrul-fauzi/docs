---
title: "Storage Upload API"
created_at: 2025-12-28
author: SBA-Agent
status: draft
---

# Storage Upload API

## Endpoints

- `POST /api/storage/init`
  - Body: `{ filename, size, contentType, provider, bucket, access, partSize? }`
  - Response: `{ uploadId, parts: [{ partNumber, url }], partSize }`

- `GET /api/storage/part`
  - Query: `uploadId, partNumber, provider, bucket, access, contentType`
  - Response: `{ url }`

- `POST /api/storage/complete`
  - Body: `{ uploadId, parts: [{ partNumber, etag? }], filename?, provider?, bucket? }`
  - Response: `{ ok: true, storageUrl?: string }`

- `POST /api/storage/abort`
  - Body: `{ uploadId }`
  - Response: `{ ok: true }`

## Catatan Keamanan

- Gunakan `access: 'signed'` untuk akses terbatas; durasi URL tanda tangan dibatasi.
- Validasi `contentType`, ukuran file (`maxFileSize`), dan izin tenant pada controller.

## Contoh Alur

1. Klien memanggil `init` untuk mendapatkan daftar `parts`.
2. Klien mengunggah setiap part via `PUT` ke `parts[*].url`; ambil header `ETag` bila tersedia.
3. Klien memanggil `complete` dengan daftar `{ partNumber, etag }` untuk finalisasi.
4. Server mengembalikan `storageUrl` yang dapat disimpan sebagai `attachment.url`.
