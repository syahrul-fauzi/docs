---
title: SBA-Agentic API Documentation
created_at: 2025-12-28
author: Documentation Architect
status: active
priority: critical
tags: [api, documentation, endpoints, integration]
---

# Dokumentasi API SBA-Agentic

## Gambaran Umum

Dokumen ini menyediakan panduan komprehensif untuk endpoint API SBA-Agentic, termasuk format request/response, autentikasi, dan contoh penggunaan.

## Base URL

```
Produksi: https://api.sba-agentic.com
Staging: https://staging-api.sba-agentic.com
Development: http://localhost:3002
```

## Autentikasi

### Autentikasi Bearer Token (Supabase)

Sertakan token JWT Anda dalam header Authorization:

```http
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

### Autentikasi API Key

Untuk integrasi sistem-ke-sistem:

```http
X-API-Key: YOUR_API_KEY
```

---

## Endpoint Utama

### 1. Kesehatan & Metrik

#### GET /api/health

Memeriksa status kesehatan layanan.

- **Izin**: `admin`, `user`
- **Response**: `{ "status": "ok", "ts": "2025-12-28T00:00:00.000Z" }`

#### GET /api/metrics/baseline

Mengambil snapshot metrik dasar (baseline) saat ini.

#### POST /api/metrics/baseline

Menyimpan snapshot metrik dasar baru.

---

### 2. Manajemen Percakapan (Conversations)

#### GET /api/conversations

Mengambil daftar percakapan dengan dukungan paginasi dan filter.

- **Query Params**: `page`, `limit`, `status`, `search`.

#### POST /api/conversations

Membuat percakapan baru.

#### GET /api/conversations/{id}

Mengambil detail percakapan spesifik.

---

### 3. Pesan & Interaksi Agen

#### POST /api/chat/send-message

Mengirim pesan ke agen dan menerima respons real-time.

- **Body**: `{ "agent_id": "...", "message": "...", "thread_id": "..." }`

#### POST /api/chat/upload

Menangani unggahan data chat (mendukung JSON dan multipart/form-data).

---

### 4. Integrasi AI & Tools

#### POST /api/ai/chat

Endpoint tingkat tinggi untuk interaksi AI dengan dukungan pemanggilan tools.

---

## Kode Kesalahan (Error Codes)

| Kode                  | Deskripsi                          | Status HTTP |
| :-------------------- | :--------------------------------- | :---------- |
| `INVALID_TOKEN`       | Token tidak valid atau kadaluwarsa | 401         |
| `RATE_LIMIT_EXCEEDED` | Terlalu banyak permintaan          | 429         |
| `RESOURCE_NOT_FOUND`  | Sumber daya tidak ditemukan        | 404         |
| `VALIDATION_ERROR`    | Validasi input gagal               | 400         |
| `INTERNAL_ERROR`      | Kesalahan internal server          | 500         |

---

## Contoh Penggunaan (cURL)

### Membuat Percakapan Baru

```bash
curl -X POST https://api.sba-agentic.com/api/conversations \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "title": "Diskusi Strategi Bisnis" }'
```

---

_Terakhir diperbarui: 2025-12-28_
